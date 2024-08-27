<template>
    <div>
        <h1>
            data length :
            {{ data?.length }}
        </h1>

        <input type="number" v-model="limit" placeholder="limit">

        <div style="white-space: pre-line;">
            {{ data }}
        </div>
    </div>
</template>

<script lang="ts" setup>
const productRepo = useRepositoryProduct()
const limit = ref(parseInt(useRoute().query.limit as string) || 3)

const { data } = await useAsyncData(() => {
    useRouter().push({ query: { limit: limit.value } })
    return productRepo.getProducts(limit.value)
}, { watch: [limit] })
</script>
