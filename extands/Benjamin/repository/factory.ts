import type { $Fetch, FetchOptions } from 'ofetch';
import { $fetch } from 'ofetch';

class FetchFactory {

    private $fetch: $Fetch;

    constructor(fetchOptions?: FetchOptions<'json'>) {
        const baseURL = "https://fakestoreapi.com/";

        this.$fetch = $fetch.create({
            baseURL,
            headers: {
                Accept: 'application/json',
                ...fetchOptions?.headers,
            },
            ...fetchOptions,
        });
    };


    async call(url: string, options?: FetchOptions): Promise<any> {
        return this.$fetch(url, { method: 'GET', ...options });
    }
}

export default FetchFactory;