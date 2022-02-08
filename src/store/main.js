import { defineStore } from 'pinia'
import { api } from '../plugins/api'

export const useMain = defineStore('main', {
    state: () => {
        return {
            homepage: {},
            aboutus: {},
            loading: false,
            aboutpage: {},
            CmsPage: {}
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
        }
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
            console.log(`executed on ${import.meta.env.SSR ? 'server' : 'client'} `)
            return res.data.data
        },
        async setCmsPage(slug = String) {
            const res = await api.get(`/items/pages?filter[slug][_eq]=${slug}`)
            return this.CmsPage[slug] = res.data.data[0]
        },
        setLoading(bool = Boolean) {
            this.loading = bool
        }
    },
})