import type { FakeApiClient } from "~/extends/marc/plugins/fakeApiClient";

declare module '#app' {
    interface NuxtApp {
        $fakeApiClient: FakeApiClient
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $fakeApiClient: FakeApiClient
    }
}

export { }