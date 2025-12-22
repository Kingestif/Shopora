import type { Request, Response } from "express";
import { idSchema } from "../../lib/schemas/user.js";
import { deleteProductService } from "../../services/seller.service.js";
import { ZodError } from "zod";

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const input = idSchema.parse(req.params)

        await deleteProductService(input.id)

        return res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};