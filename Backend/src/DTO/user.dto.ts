import type { User } from "../../generated/prisma/client.js";

export const usersDTO = (users: User[]) => {
    return users.map(({ password, ...rest }) => rest);
}