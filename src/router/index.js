import Home from '/src/views/HomeView.vue'
import { api } from '../plugins/api'

const routes = [{
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
        component: () =>
            import ('/src/views/ContactView.vue')
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
        component: () =>
            import ('/src/views/404Page.vue')
    },
    {
        path: '/:slug',
        name: 'Page',
        component: () =>
            import ('/src/views/CmsPage.vue'),
    }
]

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
//     
// })

import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory
} from 'vue-router'

export function createRouter() {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition && !import.meta.env.SSR) {
                return savedPosition
            } else {
                return { top: 0 }
            }
        }
    })
}