import type { Request, Response } from "express";
import { loginValidation } from "../../lib/schemas/user.js";
import { ZodError } from "zod";
import { loginService } from "../../services/auth.service.js";
import { serialize } from "cookie";
import { ENV } from "../../lib/schemas/env.js";

export const login = async (req: Request, res: Response) => {
    try {
        const input = loginValidation.parse(req.body)
        const response = await loginService(input)

        // Set token in HTTP-only cookie
        res.setHeader(
            "Set-Cookie",
            serialize("authToken", response.token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: Number(ENV.COOKIE_DURATION), 
                path: "/",
            })
        );

        return res.status(200).json({
            status: "success",
            role: response.role
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}