const API_URL = (import.meta.env.DEV) ? 'http://localhost:8055' : import.meta.env.API_URL

const SCREEN_SIZES = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536 
}

const WHEREAMI = import.meta.env.SSR ? 'Server' : 'Client'

export { API_URL, SCREEN_SIZES, WHEREAMI }