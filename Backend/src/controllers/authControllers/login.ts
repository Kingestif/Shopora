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

        const isProd = ENV.NODE_ENV === "production"

        // Set token in HTTP-only cookie
        res.setHeader(
            "Set-Cookie",
            serialize("authToken", response.token, {
                httpOnly: true,
                secure: isProd,
                sameSite: "lax",
                maxAge: Number(ENV.COOKIE_DURATION),
                path: "/",
            })
        );

        return res.status(200).json({
            status: "success",
            role: response.role
        })

    } catch (error:any) {
        console.error(error);

        const status = (error).statusCode || 500;
        const message = error.message || "Internal server error";

        return res.status(status).json({
            status: "error",
            message,
        });
    }
}