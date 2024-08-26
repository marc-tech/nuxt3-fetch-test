<template>
    <h1>v1</h1>
    <div style="white-space: pre-line;">
        {{ products }}
    </div>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp();

const {
    data: products,
    refresh: refreshProducts,
} = await useAsyncData(() => $api.products.getProducts());
console.log(products.value);
</script>