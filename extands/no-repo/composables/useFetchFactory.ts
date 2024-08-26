import type { FetchOptions } from 'ofetch';

export function useFetchFactory(options?: FetchOptions<'json'>) {
    const baseURL = "https://fakestoreapi.com/";

    let headers = {
        Accept: 'application/json',
    };

    return $fetch.create({
        baseURL,
        ...options,
        headers: {
            ...headers,
            ...options?.headers
        },
    });
}
