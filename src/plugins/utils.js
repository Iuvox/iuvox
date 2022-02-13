const API_URL = 'https://admin.iuvox.nl'

const SCREEN_SIZES = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536 
}

const WHEREAMI = import.meta.env.SSR ? 'Server' : 'Client'

export { API_URL, SCREEN_SIZES, WHEREAMI }