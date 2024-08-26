import type { FetchOptions } from 'ofetch';
import FetchFactory from "./factory";

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

export default class ProductsRepository extends FetchFactory {
    private RESOURCE = '/products';

    async getProducts(): Promise<Product[]> {
        const res = this.call(this.RESOURCE);
        return res
    }
}

