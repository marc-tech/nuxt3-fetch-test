<template>
    <h1>Benjamin</h1>

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

    <section>
        <figure 
            v-for="product in products"
            :key="product.id">
            <legend>{{ product.title }}</legend>
    
            <img :src="product.image">
        </figure>
    </section>


    <!-- <div style="white-space: pre-line;">
        {{ products }}
    </div> -->
</template>

<script lang="ts" setup>
const sort = computed(() => useRoute().query.sort);
const productsRepo = useRepository().products();

const { data: products } = await useAsyncData(() => {
    // ssr: dans le terminal 
    // navigation: dans la console du navigateur 
    console.log('😅', import.meta.server);
    
    return productsRepo.getProducts({ sort: sort.value });
    // return productsRepo.getProductsSecurely({ sort: sort.value });
}, { watch: [sort] });

// ssr: dans le terminal et dans la console du navigateur 
// navigation: dans la console du navigateur
console.log('🤕', products.value?.length , import.meta.server); 
</script>

<style scoped>
    ul {
        display: flex;
        list-style: none;
        gap: 1rem;
    }

    ul li {
        flex: 1;
        text-align: center;
    }

    ul li a {
        display: block;
        padding: 2rem;
        background-color: aquamarine;
        color: teal;
        font-family: 'Courier New', Courier, monospace;
        font-size: 2rem;
        font-weight: bolder;
        text-decoration: none;
    }

    ul li a:hover {
        background-color: darkolivegreen;
        color: lawngreen;
    }

    section {
        --nb-col: 1;

        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(var(--nb-col), 1fr);
    }
    
    @media(min-width: 720px) { section { --nb-col: 2; } }

    @media(min-width: 1200px) { section { --nb-col: 3; } }

    figure {
        display: block;
        margin: 0;
        padding: 2rem;
        border: .15rem dashed darkcyan;
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