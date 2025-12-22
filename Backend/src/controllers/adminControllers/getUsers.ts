import type { Request, Response } from "express";
import { ZodError } from "zod";
import { getUsersService } from "../../services/admin.service.js";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService()

        return res.status(200).json({
            status: "success",
            data: users
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};