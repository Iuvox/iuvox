import Home from '/src/views/HomeView.vue'
import { api } from '../plugins/api'
import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const components = {
    case: () =>
        import ('/src/views/CmsPage.vue'),
    about: () =>
        import ('/src/views/AboutView.vue'),
    contact: () =>
        import ('/src/views/ContactView.vue'),
    cmspage: () =>
        import ('/src/views/CmsPage.vue'),
    serviceview: () =>
        import ('/src/views/ServiceView.vue'),
    glossary: () =>
        import ('/src/views/GlossaryView.vue'),


}

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/cases/:case',
        name: 'Case',
        component: components.case
    },
    {
        path: '/waarom-iuvox',
        name: 'Waarom Iuvox?',
        component: components.about
    },
    {
        path: '/contact-iuvox',
        name: 'Contact',
        component: components.contact
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import ('/src/views/404Page.vue')
    },
    {
        path: '/services/:slug',
        name: 'Service',
        component: components.serviceview

    },
    {
        path: '/wat-betekent/:word',
        name: 'Definition',
        component: components.glossary
    },
    {
        path: '/:slug',
        name: 'Page',
        component: components.cmspage,
        beforeEnter: async(to, from) => {
            const res = (await api.get(`/items/pages?filter[slug][_eq]=${to.params.slug}`)).data
            if (res.data.length === 0) {
                return {
                    name: '404',
                    query: {
                        from: to.path
                    }
                }
            }
            const data = res.data[0]

            if (data.redirect) {
                return {
                    name: 'Page',
                    params: {
                        slug: data.redirect_to
                    }
                }
            }
            to.meta['description'] = data.description
            return true

        }
    }
]


const createRouter = () => {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition && !
                import.meta.env.SSR) {
                return savedPosition
            } else {
                return { top: 0 }
            }
        }
    })
}

const routerBeforeEach = async(to, from) => {
    if (to.name === 'Page') {
        const res = (await api.get(`/items/pages?filter[slug][_eq]=${to.params.slug}`)).data.data
        if (res.length > 0) {
            to.meta.layout = res[0].layout

        }
    }
}

export { createRouter, routerBeforeEach, components, routes }