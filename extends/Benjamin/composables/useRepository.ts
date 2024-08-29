import type { RepositoryOptions } from "../repositories/AbstractRepository"
import ProductsRepository from "../repositories/ProductsRepository"

export function useRepository(options?: RepositoryOptions) {

    // pour être sûrs de garder ce quie est fait pour nuxt dans le contexte de nuxt!
    const repositoryUtils = {
        getHeaders() {
            return import.meta.server ? { ...useRequestHeaders(['cookie']) } : {};
        },
        getXsrfCookie() {
            return useCookie('XSRF-TOKEN').value;
        }
    }


    return {
        products() { return new ProductsRepository(repositoryUtils, options)},
        // .... 
        // tous les repositories, mais instanciés seulement à la demande
    }
}