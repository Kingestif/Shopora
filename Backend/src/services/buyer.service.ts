import * as buyerRepository from '../repository/buyerRepository/buyer.repo.js'

export const getProductsService = async () => {
    const products = await buyerRepository.getProducts()

    return products
};