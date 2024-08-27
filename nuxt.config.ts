// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    extends: [
        './extends/v1',
        './extends/Benjamin',
        './extends/no-repo',
        './extends/marc',
    ]
})
