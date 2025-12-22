import type { Request, Response } from "express";
import { ZodError } from "zod";
import { searchProductsService } from "../../services/buyer.service.js";
import { searchSchema } from "../../lib/schemas/user.js";

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const input = searchSchema.parse(req.query)

        const products = await searchProductsService(input.query)

        return res.status(200).json({
            status: "success",
            data: products
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};