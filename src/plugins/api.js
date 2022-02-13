import axios from "axios"
import { useMain } from "../store/main"
import { API_URL } from "./utils"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: 'Bearer heheiamabot'
    }
})
// api.interceptors.request.use(config => {
//     const main = useMain()
//     main.setLoading(true)

//     return config
// })
// api.interceptors.response.use((response) => {
//     const main = useMain()
//     main.setLoading(false)
//     return response;
// }, (error) => {
//     const main = useMain()
//     main.setLoading(false)
//     return error
// });

export { api }