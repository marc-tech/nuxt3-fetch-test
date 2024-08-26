import ProductRepository from '@/repository/products';

export default defineNuxtPlugin(() => ({
    provide: {
        api: {
            products: new ProductRepository(),
        },
    },
}));
