import type { $Fetch, FetchOptions } from 'ofetch';
import { $fetch } from 'ofetch';

export default defineNuxtPlugin(() => {
    // ==========================
    // Base API URL
    // ==========================
    const baseURL = "https://fakestoreapi.com/";

    // ==========================
    // Base instance of $fetch
    // ==========================
    // const xsrfToken = useCookie('XSRF-TOKEN');
    const fakeApiFetcher: $Fetch = $fetch.create({
        baseURL,
        headers: {
            Accept: 'application/json',
            // ...(process.server ? useRequestHeaders(['cookie']) : {}),
            // ...(xsrfToken.value ? {'X-XSRF-TOKEN': xsrfToken.value} : {}),

        },
        // onResponseError({ response }) {
        //     if (response.status === 401) {
        //         navigateTo('/mon-compte/login');
        //     }
        // },
    });

    // ==========================
    // HTTP Methods Utils 
    // ==========================
    function get(url: string, options?: FetchOptions) {
        return fakeApiFetcher(url, { method: 'GET', ...options });
    }
    function post(url: string, options?: FetchOptions) {
        return fakeApiFetcher(url, { method: 'POST', ...options });
    }
    function put(url: string, options?: FetchOptions) {
        return fakeApiFetcher(url, { method: 'PUT', ...options });
    }
    function remove(url: string, options?: FetchOptions) {
        return fakeApiFetcher(url, { method: 'DELETE', ...options });
    }

    // ==========================
    // Provide the fakeApiClient
    // ==========================
    return {
        provide: {
            fakeApiClient: {
                // ========================
                // Products
                // ========================
                getProducts: (limit?: number) => get('/products', { query: { limit } }),
                updateProduct: (id: number, payload: any) => put(`/products/${id}`, { body: payload }),
                deleteProduct: (id: number) => remove(`/products/${id}`),
                // ========================
                // Carts
                // ========================
                getCarts: (limit: number) => get('/carts', { query: { limit } }),
                updateCart: (id: number, payload: any) => put(`/carts/${id}`, { body: payload }),
                deleteCart: (id: number) => remove(`/carts/${id}`),
                // ========================
                // User
                // ========================
                addUser: (payload: any) => post('/users', { body: payload }),
                updateUser: (id: number, payload: any) => put(`/users/${id}`, { body: payload }),
                deleteUser: (id: number) => remove(`/users/${id}`),
            },
        },
    }
});
