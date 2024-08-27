import { ofetch } from 'ofetch';
import type { FetchOptions } from 'ofetch';

export class FakeApiClient {
    constructor(private baseURL: string) { }

    fetch(url: string, options?: FetchOptions): Promise<any> {
        return ofetch(url, {
            baseURL: this.baseURL,
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
            ...options
        });
    }

    // ==========================
    // HTTP Methods Utils 
    // ==========================
    get(url: string, options?: FetchOptions): Promise<any> {
        return this.fetch(url, { method: 'GET', ...options });
    }
    post(url: string, options?: FetchOptions): Promise<any> {
        return this.fetch(url, { method: 'POST', ...options });
    }
    put(url: string, options?: FetchOptions): Promise<any> {
        return this.fetch(url, { method: 'PUT', ...options });
    }
    remove(url: string, options?: FetchOptions): Promise<any> {
        return this.fetch(url, { method: 'DELETE', ...options });
    }

    // ========================
    // Products
    // ========================
    getProducts(query?: FetchOptions['query']) {
        return this.get('/products', { query });
    }
    updateProduct(id: number, payload: any) {
        return this.put(`/products/${id}`, { body: payload });
    }
    deleteProduct(id: number) {
        return this.remove(`/products/${id}`);
    }
    // ========================
    // Carts
    // ========================
    getCarts(query?: FetchOptions['query']) {
        return this.get('/carts', { query });
    }
    updateCart(id: number, payload: any) {
        return this.put(`/carts/${id}`, { body: payload });
    }
    deleteCart(id: number) {
        return this.remove(`/carts/${id}`);
    }
    // ========================
    // User
    // ========================
    addUser(payload: any) {
        return this.post('/users', { body: payload });
    }
    updateUser(id: number, payload: any) {
        return this.put(`/users/${id}`, { body: payload });
    }
    deleteUser(id: number) {
        return this.remove(`/users/${id}`);
    }
}

export default defineNuxtPlugin(() => {
    const baseURL = "https://fakestoreapi.com/";

    return {
        provide: {
            fakeApiClient: new FakeApiClient(baseURL),
        },
    }
});
