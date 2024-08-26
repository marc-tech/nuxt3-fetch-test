<template>
    <h1>no-repo</h1>

    <ul>
        <li>
            <nuxt-link to="?sort=asc">
                Sort ASC
            </nuxt-link>
        </li>

        <li>
            <nuxt-link to="?sort=desc">
                Sort DESC
            </nuxt-link>
        </li>
    </ul>

    <figure 
        v-for="product in products"
        :key="product.id">
        <legend>{{ product.title }}</legend>

        <img :src="product.image">
    </figure>


    <!-- <div style="white-space: pre-line;">
        {{ products }}
    </div> -->
</template>

<script lang="ts" setup>
const sort = computed(() => useRoute().query.sort);
const productsApi = useProductsApi();

const { data: products } = await useAsyncData(() => {
    console.log('😅', process.server); // ssr: dans le terminal // navigation: dans la console du navigateur 
    return productsApi.getProducts({ sort: sort.value });
}, { watch: [sort] });

console.log('🤕', products.value?.length , process.server); // ssr: dans le terminal et dans la console du navigateur // navigation: dans la console du navigateur
</script>

<style scoped>
    figure {
        display: block;
        margin-block: 3rem;
        padding: 2rem;
        border: .5rem dashed darkcyan;
        font-family: sans-serif;
    }

    figure img {
        display: block;
        max-width: min(240px, 100%);
        margin-inline: auto;
    }

    figure legend {
        text-align: center;
        margin-block-end: 3rem;
    }
</style>