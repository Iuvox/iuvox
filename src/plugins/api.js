import axios from "axios"
import { useMain } from "../store/main"
import { API_URL, API_KEY } from "./utils"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
})
api.interceptors.request.use(config => {
    if(config.url.includes('/items/pages')) {
        return config
    }

    if('nofilter' in config && config.nofilter === true) {
        return config
    }
    
    const statusFilter = {
        pagedetails: {
            status: {
                _in: ['published']
            }
        }
    }

    if (!('params' in config)) {
        config.params = {
            filter: statusFilter
        }
        return config
    }

    if ('params' in config && 'filter' in config.params) {
        config.params.filter = {
            _and: [{
                    ...config.params.filter
                },
                statusFilter
            ]
        }
    }
    return config
})

api.interceptors.response.use(
    response => {
        return Promise.resolve(response)
    }, 
    error => {
        return Promise.reject(error)

    }
)

export { api }