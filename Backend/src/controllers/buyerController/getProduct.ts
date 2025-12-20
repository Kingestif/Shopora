import type { Request, Response } from "express";
import { idSchema } from "../../lib/schemas/user.js";
import { ZodError } from "zod";
import { getProductService } from "../../services/buyer.service.js";

export const getProduct = async (req: Request, res: Response) => {
    const input = idSchema.parse(req.params)

    const product = await getProductService(input.id)

    try {
        return res.status(200).json({
            status: "success",
            data: product
        });
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
};