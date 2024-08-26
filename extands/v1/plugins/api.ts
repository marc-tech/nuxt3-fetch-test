import ProductsRepository from "../repository/products";

export default defineNuxtPlugin(() => ({
    provide: {
        api: {
            products: new ProductsRepository(),
        },
    },
}));
