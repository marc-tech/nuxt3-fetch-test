import type { $Fetch, FetchOptions } from 'ofetch';
import { $fetch } from 'ofetch';

export type RepositoryOptions = FetchOptions<'json'>;

export type RepositoryUtils = {
    getHeaders: () => Record<string, string>,
    getXsrfCookie: () => string | null | undefined
}

export default abstract class AbstractRepository<ApiItem/*, Item*/> {
    private static readonly BASE_URL = "https://fakestoreapi.com/";
    private $fetch: $Fetch;
    private utils: RepositoryUtils;

    constructor(repositoryUtils: RepositoryUtils, fetchOptions?: RepositoryOptions) {
        this.utils = repositoryUtils;

        this.$fetch = $fetch.create({
            baseURL: AbstractRepository.BASE_URL,
            headers: {
                Accept: 'application/json',
                ...fetchOptions?.headers,
            },
            ...fetchOptions,
        });
    };

    // Je le refais à chaque fois car les cookies et autres peuvent évoluer indépendament du cycle de vie de cet objet (ex: avant/après connexion)
    private setSecureOptions(options?: RepositoryOptions): RepositoryOptions {
        // 🚨 des composables en dehors de nuxt ???
        const headers = this.utils.getHeaders();

        const xsrfToken = this.utils.getXsrfCookie();
        if (xsrfToken) headers['X-XSRF-TOKEN'] = xsrfToken;

        return {
            ...options,
            headers: {
                ...options?.headers,
                ...headers,
            },
            credentials: 'include',
            // onRequestError... // pas sûr que ça soit l'endroit où faire ça ... je vois ça plutôt dans les try/catch et les routerMiddlewares ...
        }
    }

    // @Todo: j'hésite ... soit call + callSecure, soit call avec une option `secure?: boolean`.
    async call<FetchResponse = ApiItem>(url: string, options?: RepositoryOptions, secure: boolean = false): Promise<FetchResponse> {
        
        if (secure) options = this.setSecureOptions(options);

        return this.$fetch(url, {
            method: 'GET',
            ...options,
        });
    }

    // async call<T = ApiItem>(url: string, options?: RepositoryOptions): Promise<T> {
    //     return this.$fetch(url, { method: 'GET', ...options, });
    // }

    // async callSecure<T = ApiItem>(url: string, options?: RepositoryOptions): Promise<T> {
    //     return this.$fetch(url, {
    //         method:'GET',
    //         ...this.getSecureOptions(),
    //         ...options,
    //     })
    // }

    // ne pas les rendre obligatoires ... ça n'a pas de sens !
    // abstract formatFromApi(item: ApiItem): Item;
    // abstract formatToApi(item: Item): Partial<ApiItem>;
}