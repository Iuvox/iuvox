import { defineStore } from 'pinia'
import { api } from '../plugins/api'

export const useMain = defineStore('main', {
    state: () => {
        return {
            cases: [],
            aboutus: {},
            loading: false,
        }
    },
    getters: {
        getCases(state) {
            return state.cases
        }
    },
    actions: {
        setCases() {
            api.get('/items/cases', {
                params: {
                    fields: 'logo,status,pagedetails.slug,pagedetails.title'
                }
            }).then((res) => {
                this.cases = res.data.data
            })
        },
        setLoading(bool = Boolean) {
            this.loading = bool
        }
    },
})