import AbstractRepository, { type RepositoryOptions } from "./AbstractRepository";

export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

export default class ProductsRepository extends AbstractRepository {
    private RESOURCE = '/products';

    async getProducts(query: RepositoryOptions['query']): Promise<Product[]> {
        return this.call(this.RESOURCE, { query });
    }

    // c'est un POC, en vrai on ne dupliquerait pas, mais on saurait ici s'il faut appeler l'api de manière sécurisée ou non ... 
    async getProductsSecurely(query: RepositoryOptions['query']): Promise<Product[]> {
        return this.callSecure(this.RESOURCE, { query });
    }
}

