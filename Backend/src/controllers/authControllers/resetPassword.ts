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
        console.log(error)
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