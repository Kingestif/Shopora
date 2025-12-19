import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { ENV } from "../lib/schemas/env.js";
import { jwtDecode } from "../lib/schemas/user.js";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token = ""
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            token= req.headers.authorization.split(" ")[1] ?? ""
        }

        if(!token) throw new Error("Unauthorized")

        const decoded = jwt.verify(token, ENV.JWT_SECRET)
        const user = jwtDecode.parse(decoded)

        req.user = user

        next()
    }catch(error){
        return res.status(401).json({
            status: "error",
            message: (error as Error)?.message   
        })
    }
}