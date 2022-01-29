import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { FontAwesomeIcon } from './plugins/fontawesome'
import pinia from './store'

createApp(App)
    .use(router)
    .use(pinia)
    .component('fa-icon', FontAwesomeIcon)
    .mount('#app')
