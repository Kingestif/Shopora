import type { Request, Response } from "express";
import { fileSchema, productVerification } from "../../lib/schemas/seller.js";
import { postProductService } from "../../services/seller.service.js";
import { ZodError } from "zod";

export const postProduct = async (req: Request, res: Response) => {
    try {
        const input = productVerification.parse(req.body)
        const file = fileSchema.parse(req.file)
        const user = req.user

        if (!user) throw new Error("Unauthorized")

        const id = await postProductService(input, file.buffer, user)

        return res.status(200).json({
            status: "success",
            product: id
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}