import type { Request, Response } from "express";
import { idSchema } from "../../lib/schemas/user.js";
import { ZodError } from "zod";
import { getProductService } from "../../services/buyer.service.js";

export const getProduct = async (req: Request, res: Response) => {
    
    try {
        const input = idSchema.parse(req.params)
    
        const product = await getProductService(input.id)
        
        return res.status(200).json({
            status: "success",
            data: product
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};