import { ENV } from "../lib/schemas/env.js";
import type { loginType, userType } from "../lib/schemas/user.js";
import * as authRepository from '../respository/authRepository/auth.repo.js'
import { comparePassword } from "../utils/compare.js";
import { createToken } from "../utils/crypto.js";
import { sendEmail } from "../utils/email.js";
import { emailMessage } from "../utils/emailMessage.js";
import { generateToken } from "../utils/jwt.js";
import { hash } from "../utils/password.js";

export const signupService = async (user: userType) => {
    const hashedPassword = await hash(user.password)
    const newUser = await authRepository.createUser(user, hashedPassword)
    const token = await createToken()
    const message = emailMessage(newUser.name, ENV.EMAIL_VERIFICATION_URL, token)

    const data = await authRepository.createEmailVerification(newUser.id, token)

    await sendEmail(newUser.email, message);

    return newUser.id
}

export const loginService = async (input: loginType) => {
    const user = await authRepository.findUserByEmail(input.email)
    if (!user) throw new Error('Invalid Credentials')

    const valid = await comparePassword(input.password, user.password)

    if (!valid) throw new Error('Invalid Credentials')

    const token = await generateToken(user.id, user.role)

    return token
}

export const emailVerificationService = async (token: string) => {
    const verification = await authRepository.findUserByEmailVerificationToken(token)

    if (!verification) throw new Error("User not found")

    const now = new Date()

    if (verification.expires_at < now) throw new Error("Token expired")

    const result = await authRepository.verifyEmail(verification.userId)

    if (!result) throw new Error("Email was not verified")

    return result
}