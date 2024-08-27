import type { FetchOptions } from 'ofetch';
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
    },
}

export default function useRepositoryProduct() {
    const { $fakeApiClient } = useNuxtApp();

    return {
        async getProducts(query?: FetchOptions['query']): Promise<Product[]> {
            return await $fakeApiClient.getProducts(query)
        }
    }
}