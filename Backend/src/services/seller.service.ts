import type { product } from "../lib/schemas/seller.js";
import type { User } from "../lib/schemas/user.js";
import { uploadToCloudinary } from "../utils/upload.js";
import * as sellerRepository from "../repository/sellerRepository/seller.repo.js"

export const postProductService = async (input: product, buffer: any, user: User) => {
    const result = await uploadToCloudinary(buffer)

    const id = await sellerRepository.createProduct(input, user.id, result)

    return id
}