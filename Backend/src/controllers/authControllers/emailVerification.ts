import type { Request, Response } from "express";
import { emailVerify } from "../../lib/schemas/user.js";
import { ZodError } from "zod";
import { emailVerificationService } from "../../services/auth.service.js";

export const emailVerification = async (req: Request, res: Response) => {
    try {
        const input = emailVerify.parse(req.query)

        const id = await emailVerificationService(input.token)

        return res.status(200).json({
            status: "success",
            message: id
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}