import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { FontAwesomeIcon } from './plugins/fontawesome'
import pinia from './store'
import PrimeVue from 'primevue/config'

createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue)
    .component('fa-icon', FontAwesomeIcon)
    .mount('#app')
