import type { FetchOptions } from 'ofetch';
import { useFetchFactory } from "../useFetchFactory";

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

export default () => {
    const fetch = useFetchFactory();
    const API_RUL = '/products';

    return {
        getProducts: (query?: FetchOptions['query']) => fetch(API_RUL, { query }),
    }
};
