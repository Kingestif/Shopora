import type { loginType, userType } from "../lib/schemas/user.js";
import * as authRepository from '../respository/authRepository/auth.repo.js'
import { comparePassword } from "../utils/compare.js";
import { generateToken } from "../utils/jwt.js";
import { hash } from "../utils/password.js";

export const signupService = async (user:userType) => {
    const hashedPassword = await hash(user.password)
    const id = await authRepository.createUser(user, hashedPassword)

    return id
}

export const loginService = async(input:loginType) => {
    const user = await authRepository.findUserByEmail(input.email)
    if(!user) throw new Error('Invalid Credentials')

    const valid = await comparePassword(input.password, user.password)

    if(!valid) throw new Error('Invalid Credentials')

    const token = await generateToken(user.id, user.role)

    return token
}