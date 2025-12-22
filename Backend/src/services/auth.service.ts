import { ENV } from "../lib/schemas/env.js";
import type { loginType, userType } from "../lib/schemas/user.js";
import * as authRepository from '../repository/authRepository/auth.repo.js'
import { comparePassword } from "../utils/compare.js";
import { createToken } from "../utils/crypto.js";
import { cryptoHash } from "../utils/cryptoHash.js";
import { sendEmail } from "../utils/email.js";
import { emailMessage } from "../utils/emailMessage.js";
import { hash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { resetPasswordMessage } from "../utils/resetPasswordMessage.js";

export const signupService = async (user: userType) => {
    const hashedPassword = await hash(user.password)
    const newUser = await authRepository.createUser(user, hashedPassword)
    const token = createToken()
    const message = emailMessage(newUser.name, ENV.EMAIL_VERIFICATION_URL, token)
    const subject = "Confirm Your Email"

    const data = await authRepository.createEmailVerification(newUser.id, token)

    await sendEmail(newUser.email, message, subject);

    return newUser.id
}

export const loginService = async (input: loginType) => {
    const user = await authRepository.findUserByEmail(input.email)
    if (!user) throw new Error('Invalid Credentials')

    const valid = await comparePassword(input.password, user.password)

    if (!valid) throw new Error('Invalid Credentials')

    const token = generateToken(user.id, user.role)

    return {
        token,
        role:user.role
    }
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

export const resetPasswordRequestService = async (email: string) => {
    const exist = await authRepository.findUserByEmail(email)
    if (!exist) return

    const token = createToken()
    const hashedToken = await cryptoHash(token)
    const message = resetPasswordMessage(ENV.RESET_PASSWORD_URL, token)
    const subject = "Reset your password"

    await authRepository.createPasswordResetVerification(hashedToken, email)

    await sendEmail(email, message, subject)
}

export const resetPasswordService = async (token: string, password: string) => {
    const hashedToken = await cryptoHash(token)
    const exist = await authRepository.findUserByPasswordVerificationToken(hashedToken)

    if (!exist) throw new Error('Invalid or expired reset token')

    const hashedPassword = await hash(password)

    await authRepository.changePassword(exist.email, hashedPassword)
}