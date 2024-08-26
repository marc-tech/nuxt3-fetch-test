// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    extends: [
        './extands/v1',
        './extands/Benjamin',
        './extands/no-repo',
    ]
})
