import type { Request, Response } from "express";
import { ZodError } from "zod";
import { updateVerification } from "../../lib/schemas/seller.js";
import { updateProductService } from "../../services/seller.service.js";

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const input = updateVerification.parse(req.body)
        const product = await updateProductService(input)

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