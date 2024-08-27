import type { RepositoryOptions } from "../repositories/AbstractRepository"
import ProductsRepository from "../repositories/ProductsRepository"

export function useRepository(options?: RepositoryOptions) {
    return {
        products() { return new ProductsRepository(options)},
        // .... 
        // tous les repositories, mais instanciés seulement à la demande
    }
}