import { prisma } from "../../../lib/prisma.js";
import type { product, update, UploadResult } from "../../lib/schemas/seller.js";

export const createProduct = async (input: product, sellerId: string, result: UploadResult) => {
    const data = {
        ...input,
        price: Number(input.price),
        sellerId,
        imageUrl: result.url,
        publicId: result.public_id
    }
    const product = await prisma.product.create({
        data
    })
    return product.id
}

export const fetchProducts = async (id: string) => {
    const products = await prisma.product.findMany({
        where: {
            sellerId: id
        }
    })
    return products
};

export const updateProductById = async (input: update) => {
    const { id, ...rest } = input;

    const data = Object.fromEntries(        //remove undefined fields
        Object.entries(rest).filter(([_, v]) => v !== undefined)
    );

    const product = await prisma.product.update({
        where: { id },
        data
    });

    return product
};