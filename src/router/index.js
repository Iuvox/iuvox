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
        {
            path: '/cases/:case',
            name: 'Case',
            component: () => import('/src/views/CmsPage.vue')
        },
        {
            path: '/waarom-iuvox',
            name: 'Waarom Iuvox?',
            component: () => import('/src/views/AboutView.vue')
        },
        {
            path: '/algemene-voorwaarden',
            name: 'Algemene Voorwaarden',
        },
        {
            path: '/disclaimer',
            name: 'Disclaimer',
        },
        {
            path: '/privacy-policy',
            name: 'Privacy Policy',
        },
        {
            path: '/:cmspageid',
            name: 'Page',
            component: () => import('/src/views/CmsPage.vue')
        },
    ]
})

router.beforeEach( (to) => {
    document.title = 'Iuvox | ' + to.name || 'Iuvox'
})

export default router