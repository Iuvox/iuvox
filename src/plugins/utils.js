const API_URL = import.meta.env.VITE_API_URL

const API_KEY = import.meta.env.VITE_API_KEY


const SCREEN_SIZES = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536 
}

const WHEREAMI = import.meta.env.SSR ? 'Server' : 'Client'

export { API_URL,API_KEY, SCREEN_SIZES, WHEREAMI }