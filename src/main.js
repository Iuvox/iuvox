import App from './App.vue'
import { createSSRApp, watch } from 'vue'
import { createRouter } from './router'
import './index.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { createPinia } from 'pinia';
import { WHEREAMI } from './plugins/utils';
import { api } from './plugins/api';


// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
    const app = createSSRApp(App)
    const router = createRouter()
    const pinia = createPinia()

    router.beforeEach((to, from, next) => {
        api.get(`/items/pages?filter[slug][_eq]=${to.params.slug}`).then(res => {
            if (res.data.data.length > 0) {
                const result = res.data.data[0]
                console.log(result.redirect)

                if (result.redirect === true) {
                    next(`/${result.redirect_to}`)
                } else {
                    next()
                }
            } else {
                next()
            }
        })
    })
    app.use(router)
        .use(pinia)



    return { app, router, pinia }
}