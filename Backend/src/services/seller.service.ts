import type { product, update } from "../lib/schemas/seller.js";
import type { User } from "../lib/schemas/user.js";
import { uploadToCloudinary } from "../utils/upload.js";
import * as sellerRepository from "../repository/sellerRepository/seller.repo.js"

export const postProductService = async (input: product, buffer: any, user: User) => {
    const result = await uploadToCloudinary(buffer)

    const id = await sellerRepository.createProduct(input, user.id, result)

    return id
}

export const getProductsService = async (id: string) => {
    const products = await sellerRepository.fetchProducts(id)

    return products
};

export const updateProductService = async (input: update) => {
    const product = await sellerRepository.updateProductById(input)

    return product
};

export const deleteProductService = async (id: string) => {
    await sellerRepository.deleteProduct(id)
};