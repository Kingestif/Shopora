import { prisma } from "../../../lib/prisma.js";
import { ENV } from "../../lib/schemas/env.js";
import type { userType } from "../../lib/schemas/user.js";

export const createUser = async (user:userType, hashedPassword: string) => {
    const {password, ...rest} = user

    const newUser = {
        password: hashedPassword,
        ...rest
    }

    const createdUser = await prisma.user.create({
        data: {
            ...newUser
        },
    })
    return createdUser
}

export const findUserByEmail = async (email:string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return user
}

export const createEmailVerification = async (userId:string, token:string) => {
    const expireSeconds = Number(ENV.EMAIL_VERIFICATION_EXPIRE)
    const expires_at = new Date(Date.now() + expireSeconds * 1000) 

    const verificationRecord = await prisma.emailVerification.create({
        data: {
            userId,
            token,
            expires_at
        }
    })
    return verificationRecord
}