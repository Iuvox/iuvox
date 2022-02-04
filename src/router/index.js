import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/HomeView.vue'
import {api} from '../plugins/api'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/cases/:case',
            name: 'Case',
            component: () =>
                import ('/src/views/CmsPage.vue')
        },
        {
            path: '/waarom-iuvox',
            name: 'Waarom Iuvox?',
            component: () =>
                import ('/src/views/AboutView.vue')
        },
        {
            path: '/contact-iuvox',
            name: 'Contact',
            component: () => import('/src/views/ContactView.vue')
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
            path: '/404',
            name: '404',
            component: () => import ('/src/views/404Page.vue')
        },
        {
            path: '/:slug',
            name: 'Page',
            component: () =>
                import ('/src/views/CmsPage.vue'),
            beforeEnter(to, from, next) {
                api.get(`/items/pages?filter[slug][_eq]=${to.params.slug}`).then(res => {
                    if(res.data.data.length > 0) {
                        next(data => data.page = res.data.data[0])
                    } else {
                        next('/404')
                    }
                })
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to) => {
    document.title = 'Iuvox | ' + to.name || 'Iuvox'
})

export default router