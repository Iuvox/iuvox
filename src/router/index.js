import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/HomeView.vue'

const cmspage = () => import('/src/views/CmsPage.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/about-us',
            name: 'About us',
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
            component: cmspage
        },
    ]
})

router.beforeEach( (to) => {
    document.title = 'Iuvox | ' + to.name || 'Iuvox'
})

export default router