import type { Request, Response } from "express";
import { ENV } from "../../lib/schemas/env.js";

export const logout = async (req: Request, res: Response) => {
    try {
        const isProd = ENV.NODE_ENV === "production"

        res.clearCookie("authToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: isProd
        });

        return res.status(200).json({
            status: "success",
            data: null
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};