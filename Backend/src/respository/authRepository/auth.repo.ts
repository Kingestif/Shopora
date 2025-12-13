import { prisma } from "../../../lib/prisma.js";
import type { userType } from "../../lib/schemas/user.js";

export const createUser = async (user:userType, hashedPassword: string) => {
    const {password, ...rest} = user

    const newUser = {
        password: hashedPassword,
        ...rest
    }

    const id = await prisma.user.create({
        data: {
            ...newUser
        },
        select:{
            id: true
        }
    })
    return id
}