import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { ENV } from "../lib/schemas/env.js";
import { jwtDecode } from "../lib/schemas/user.js";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = ""

        if (req.cookies && req.cookies.authToken) {
            token = req.cookies.authToken
        }
        else if (   // Fallback to Authorization header
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            token = req.headers.authorization.split(" ")[1] ?? ""
        }

        if (!token) throw new Error("Unauthorized")

        const decoded = jwt.verify(token, ENV.JWT_SECRET)
        const user = jwtDecode.parse(decoded)

        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: (error as Error)?.message
        })
    }
}

export const isSeller = async (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role

    if (role !== 'SELLER') {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized"
        })
    }

    next()
}

export const isBuyer = async (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role

    if (role !== 'BUYER') {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized"
        })
    }

    next()
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role

    if (role !== 'ADMIN') {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized"
        })
    }

    next()
}