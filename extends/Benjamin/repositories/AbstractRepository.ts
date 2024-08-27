import type { $Fetch, FetchOptions } from 'ofetch';
import { $fetch } from 'ofetch';

export type RepositoryOptions = FetchOptions<'json'>;

export default abstract class AbstractRepository {
    private $fetch: $Fetch;

    constructor(fetchOptions?: RepositoryOptions) {
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

    // Je le refais à chaque fois car les cookies et autres peuvent évoluer indépendament du cycle de vie de cet objet (ex: avant/après connexion)
    private getSecureOptions(): RepositoryOptions {
        // 🚨 des composables en dehors de nuxt ???
        const headers: Record<string, string> = import.meta.server ? { ...useRequestHeaders(['cookie']) } : {};

        const xsrfToken = useCookie('XSRF-TOKEN');
        if (xsrfToken?.value) headers['X-XSRF-TOKEN'] = xsrfToken.value;

        return {
            credentials: 'include',
            headers,
            // onRequestError... // pas sûr que ça soit l'endroit où faire ça ... je vois ça plutôt dans les try/catch et les routerMiddlewares ...
        }
    }

    // @Todo: j'hésite ... soit call + callSecure, soit call avec une option `secure?: boolean`.
    // async call(url: string, options?: RepositoryOptions, secure?: boolean): Promise<any> {
    //     return this.$fetch(url, { 
    //         method: 'GET', 
    //         ...(secure ? this.getSecureOptions() : null), 
    //         ...options,
    //     });
    // }

    async call(url: string, options?: RepositoryOptions): Promise<any> {
        return this.$fetch(url, { method: 'GET', ...options, });
    }

    async callSecure(url: string, options?: RepositoryOptions): Promise<any> {
        return this.$fetch(url, {
            method:'GET',
            ...this.getSecureOptions(),
            ...options,
        })
    }
}