import App from './App.vue'
import { createSSRApp, watch } from 'vue'
import { createRouter, routerBeforeEach } from './router'
import './index.css'

import { createPinia } from 'pinia';
import { api } from './plugins/api';
import { createHead } from '@vueuse/head'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
    const app = createSSRApp(App)
    const router = createRouter()
    const pinia = createPinia()
    const head = createHead()

    router.beforeEach(routerBeforeEach)
    
    app.use(router)
        .use(pinia)
        .use(head)



    return { app, router, pinia, head }
}