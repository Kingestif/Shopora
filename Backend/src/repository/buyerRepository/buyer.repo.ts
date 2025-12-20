import { prisma } from "../../../lib/prisma.js";

export const getProducts = async () => {
    const products = await prisma.product.findMany()
    return products
};

export const getProduct = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id }
    })

    return product
};

export const searchProducts = async (query: string) => {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } }
            ]
        }
    })

    return products
};