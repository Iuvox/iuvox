import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from '../plugins/api'

export const useMain = defineStore('main', {
    state: () => {
        return {
            homepage: {},
            aboutus: {},
            loading: false,
            aboutpage: {},
            CmsPage: {},
            ServicePage: {}
        }
    },
    getters: {
        getCases(state) {
            if('cases' in state.homepage) {
                return state.homepage.cases
            } else {
                return false
            }
        },
        getSections(state) {
            if('sections' in state.aboutpage) {
                return state.aboutpage.sections
            } else {
                return false
            }
        },
        getServices(state) {
            return (slug) => {
                if(slug in state.ServicePage) {
                    return state.ServicePage[slug]
                } else {
                    return false
                }        
            }
            
        },
    },
    actions: {
        async setHomeView() {
            const res = await api.get('/items/cases', {
                params: {
                    fields: 'logo,status,pagedetails.slug,pagedetails.title'
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
        async setCmsPage(slug = String) {
            const res = await api.get(`/items/pages?filter[slug][_eq]=${slug}`)
            return this.CmsPage[slug] = res.data.data[0]
        },
        async setServices(slug = String) {
            if(slug in this.ServicePage) {
                return
            }
            const filter = {
                pagedetails: {
                    slug: {
                        _eq: slug
                    }
                }
            }
            const res = (await api.get(`http://localhost:8055/items/services?filter=${JSON.stringify(filter)}`)).data.data
            if(res.length === 0) {
                return false
            }
            this.ServicePage[slug] = res[0]
        },
        setLoading(bool = Boolean) {
            this.loading = bool
        }
    },
})