import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
    ]
})

router.beforeEach( (to) => {
    document.title = 'Iuvox | ' + to.name || 'Iuvox'
})

export default router