import type { Request, Response } from "express";
import { userValidation } from "../../lib/schemas/user.js";
import { ZodError } from "zod";
import { signupService } from "../../services/auth.service.js";

export const signup = async (req:Request, res: Response) => {
    try{
        const input = userValidation.parse(req.body)
        const user = await signupService(input)

        return res.status(200).json({
            status:"success",
            message: user
        })

    }catch(error){
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: "error",
                message: error.issues
            });
        }else{
            return res.status(500).json({
                status: "error",
                message: (error as Error)?.message
            });
        }
    }
}