import { prisma } from "../../../lib/prisma.js";
import { usersDTO } from "../../DTO/user.dto.js";

export const getUsers = async () => {
    const users = await prisma.user.findMany()
    return usersDTO(users)
};