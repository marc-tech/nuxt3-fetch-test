import ProductsRepository from "../repository/products"

export function useProductsApi() {
    return new ProductsRepository()
}