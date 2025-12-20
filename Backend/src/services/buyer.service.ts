import * as buyerRepository from '../repository/buyerRepository/buyer.repo.js'

export const getProductsService = async () => {
    const products = await buyerRepository.getProducts()

    return products
};

export const getProductService = async (id:string) => {
    const product = await buyerRepository.getProduct(id)
    
    return product
};