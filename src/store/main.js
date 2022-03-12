import { defineStore } from 'pinia'
import { api } from '../plugins/api'

export const useMain = defineStore('main', {
    state: () => {
        return {
            analytics: {
                accepted: true
            },
            defaults: {},
            homepage: {},
            aboutus: {},
            loading: false,
            aboutpage: {},
            cases: {},
            CmsPage: {},
            definition: {},
            ServicePage: {}
        }
    },
    getters: {
        getCases(state) {
            if ('cases' in state.homepage) {
                return state.homepage.cases
            } else {
                return false
            }
        },
        getSections(state) {
            if ('sections' in state.aboutpage) {
                return state.aboutpage.sections
            } else {
                return false
            }
        },
        getDefinition(state) {
            return state.definition
        },
        getServices(state) {
            return (slug) => {
                if (slug in state.ServicePage) {
                    return state.ServicePage[slug]
                } else {
                    return false
                }
            }

        },
        getCase(state) {
            return (slug) => {
                if (slug in state.cases) {
                    return state.cases[slug]
                } else {
                    return false
                }
            }
        },
        getAllCases(state) {
            return state.cases
        },
        getAnalyticsPermissions(state) {
            return state.analytics
        },
        getDefaults(state) {
            return state.defaults
        }
    },
    actions: {
        async setHomeView() {
            const res = await api.get('/items/cases', {
                params: {
                    fields: 'logo,status,pagedetails.*'
                }
            })
            this.homepage.cases = res.data.data
            return res
        },
        async setDefaults() {
            const res = await api.get('/items/defaults', {
                params: {
                    fields: 'telefoon_nummer,telefoon_nummer_fancy,email,headshots.directus_files_id.id,headshots.directus_files_id.title,headshots.directus_files_id.description'
                }
            }).catch(err => {
                const defaults = {
                    data: {
                        data: {
                            telefoon_nummer: '+31649203503',
                            telefoon_nummer_fancy: '+31 (0)6 49 203 503',
                            email: 'joep@iuvox.nl'
                        }
                    }
                }
                return defaults
            })
            this.defaults = res.data.data
        },
        async setAboutPage() {
            const res = await api.get('/items/about', {
                params: {
                    'fields[]': 'sections'
                }
            })
            this.aboutpage = res.data.data
            return res.data.data
        },
        async setDefinition(slug = String) {
            const filter = {
                pagedetails: {
                    slug: {
                        _eq: slug
                    }
                }
            }
            const res = (await api.get(`/items/wat_betekent?filter=${JSON.stringify(filter)}`)).data.data

            if (res.length === 1) {
                this.definition = res[0]
                return res[0]
            } else {
                return {}
            }
        },
        async setCmsPage(slug = String) {
            const res = await api.get(`/items/pages`, {
                nofilter: true,
                params: {
                    filter: {
                        _and: [{
                            slug: {
                                _eq: slug
                            }
                        }, {
                            status: {
                                _eq: 'published'
                            }
                        }]
                    }
                }
            })
            return this.CmsPage[slug] = res.data.data[0]
        },
        async setServices(slug) {
            if (slug in this.ServicePage) {
                return
            }
            const params = {
                filter: {
                    pagedetails: {
                        slug: {
                            _eq: slug
                        }
                    }
                }
            }
            const res = (await api.get(`/items/services`, { params: params })).data.data
            if (res.length === 0) {
                return false
            }
            this.ServicePage[slug] = res[0]
        },
        async setCase(slug = false) {
            if (slug in this.cases) {
                return
            }
            const params = {
                fields: 'over,logo,uitdagingen,quotes,resultaat,used_services.services_id.pagedetails.slug,used_services.services_id.shorttitel,accomplishments,pagedetails.*',
                filter: {
                    pagedetails: {
                        slug: {
                            _eq: slug
                        }
                    }
                }
            }
            if(slug === false) {
                params['filter'] = false
            }
            const res = (await api.get(`/items/cases`, { params: params })).data.data
            if (res.length === 0) {
                return false
            }
            if(slug === false) {
                res.forEach(el => {
                    this.cases[el.pagedetails.slug] = el
                });
                return;
            }
            this.cases[slug] = res[0]
        },
        setLoading(bool = Boolean) {
            this.loading = bool
        }
    },
})