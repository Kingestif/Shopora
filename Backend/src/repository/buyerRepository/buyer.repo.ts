import { prisma } from "../../../lib/prisma.js";

export const getProducts = async () => {
    const products = await prisma.product.findMany()
    return products
};