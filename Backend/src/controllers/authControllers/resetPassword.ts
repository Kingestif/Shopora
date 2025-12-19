import type { Request, Response } from "express";
import { resetPassVerify } from "../../lib/schemas/user.js";
import { resetPasswordService } from "../../services/auth.service.js";
import { ZodError } from "zod";

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = resetPassVerify.parse(req.body)
        await resetPasswordService(email)
        return res.status(200).json({
            status:"success",
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: "error",
                message: error.issues
            })
        } else {
            return res.status(500).json({
                status: "error",
                message: (error as Error)?.message
            })
        }
    }

}