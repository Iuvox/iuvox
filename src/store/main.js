import { defineStore } from 'pinia'
import { api } from '../plugins/api'

export const useMain = defineStore('main', {
    state: () => {
        return {
            analytics: {
                accepted: true
            },
            homepage: {},
            aboutus: {},
            loading: false,
            aboutpage: {},
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
        getAnalyticsPermissions(state) {
            return state.analytics
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
        setLoading(bool = Boolean) {
            this.loading = bool
        }
    },
})