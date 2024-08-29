import AbstractRepository, { type RepositoryOptions } from "./AbstractRepository";

export interface ApiProduct {
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

// C'est un exemple ... ça pourrait être bien plus complexe ou un tout autre objet !
export type Product = Pick<ApiProduct, 'id' | 'title' | 'image'>;

export default class ProductsRepository extends AbstractRepository<ApiProduct/*, Product*/> {
    private productsApiPath = '/products';

    // Permet de convertir le format depuis l'api en données pratiques pour la vue
    formatFromApi(apiProduct: ApiProduct): Product {
        return {
            id: apiProduct.id,
            title: apiProduct.title,
            image: apiProduct.image,
        }
    }

    // Permet de recréer la donnée (en partie en tout cas) utile pour POST/PUT/PATCH/...
    formatToApi(product: Product): Partial<ApiProduct> {
        return product;
    }

    async getProducts(query: RepositoryOptions['query']): Promise<Product[]> {
        const res = await this.call<ApiProduct[]>(this.productsApiPath, { query });
        return res.map(this.formatFromApi);
    }

    // // c'est un POC, en vrai on ne dupliquerait pas, mais on saurait ici s'il faut appeler l'api de manière sécurisée ou non ... 
    // async getProductsSecurely(query: RepositoryOptions['query']): Promise<Product[]> {
    // // const res = await this.callSecure(this.productsApiPath, { query });
    //     const res = await this.call<ApiProduct[]>(this.productsApiPath, { query }, true);
    //     return res.map(this.formatFromApi);
    // }
}

