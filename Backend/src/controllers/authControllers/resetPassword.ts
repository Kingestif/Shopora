import type { Request, Response } from "express";
import { resetPasswordInput } from "../../lib/schemas/user.js";
import { ZodError } from "zod";
import { resetPasswordService } from "../../services/auth.service.js";

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const input = resetPasswordInput.parse(req.body)

        await resetPasswordService(input.token, input.password)

        return res.status(200).json({
            status: "success"
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}