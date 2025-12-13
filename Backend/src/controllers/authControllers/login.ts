import type { Request, Response } from "express";
import { loginValidation } from "../../lib/schemas/user.js";
import { ZodError } from "zod";
import { loginService } from "../../services/auth.service.js";

export const login = async (req: Request, res: Response) => {
    try {
        const input = loginValidation.parse(req.body)
        const token = await loginService(input)

        return res.status(200).json({
            status:"success",
            message: token
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