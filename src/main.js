import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import {FontAwesomeIcon} from './plugins/fontawesome'

createApp(App)
.use(router)
.component('fa-icon', FontAwesomeIcon)
.mount('#app')
