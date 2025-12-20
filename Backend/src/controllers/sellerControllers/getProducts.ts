import type { Request, Response } from "express";
import { getProductsService } from "../../services/seller.service.js";
import { ZodError } from "zod";

export const getProducts = async (req: Request, res: Response) => {
    try {
        if (!req.user) throw new Error('Unauthorized')
        const user = req.user
        const products = await getProductsService(user.id)

        return res.status(200).json({
            status: "success",
            data: products
        });
    } catch (error) {
        console.log(error)
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