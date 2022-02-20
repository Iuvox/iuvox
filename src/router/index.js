import { api } from '../plugins/api'
import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const components = {
    home: () =>
        import ('/src/views/HomeView.vue'),
    case: () =>
        import ('/src/views/CmsPage.vue'),
    about: () =>
        import ('/src/views/AboutView.vue'),
    contact: () =>
        import ('/src/views/ContactView.vue'),
    cmspage: () =>
        import ('/src/views/CmsPage.vue'),
    servicecollection: () =>
        import ('/src/views/ServicecollectionView.vue'),
    serviceview: () =>
        import ('/src/views/ServiceView.vue'),
    glossary: () =>
        import ('/src/views/GlossaryView.vue'),


}

const routes = [{
        path: '/',
        name: 'Home',
        component: components.home
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
        path: '/services/',
        name: 'Service',
        component: components.servicecollection,
    },
    {
        path: '/services/:slug',
        name: 'Serviceitem',
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
            const res = (await api.get(`/items/pages`, {
                nofilter: true,
                params: {
                    filter: {
                        _and: [{
                                slug: {
                                    _eq: to.params.slug
                                }
                            },
                            {
                                status: {
                                    _eq: 'published'
                                }
                            }
                        ]
                    }
                }
            })).data
            const data = res.data
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
    const path = to.path.split('/')

    if (to.path !== '/' && to.name !== '404') {
        const params = {
            filter: {
                _and: [{
                        slug: {
                            _eq: path[path.length - 1]
                        }
                    },
                    {
                        status: {
                            _in: ['published']
                        }
                    }
                ]
            },
            fields: 'title, description'
        }


        const meta = (await api.get(`/items/pages`, { params: params })).data.data


        if (meta.length === 1) {
            to.meta = {
                ...to.meta,
                ...meta[0]
            }
        }
        if (meta.length === 0) {
            return {
                name: '404',
                query: {
                    from: to.path
                }
            }
        }
    }
}

export { createRouter, routerBeforeEach, components, routes }