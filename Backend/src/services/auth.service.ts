import type { userType } from "../lib/schemas/user.js";
import * as authRepository from '../respository/authRepository/auth.repo.js'
import { hash } from "../utils/password.js";

export const signupService = async (user:userType) => {
    const hashedPassword = await hash(user.password)
    const id = await authRepository.createUser(user, hashedPassword)
    
    return id
}