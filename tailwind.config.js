module.exports = {
    content: [],
    theme: {
        extend: {
            colors: {
                'dark-blue': '#0d1173',
                'secondary': '#B2FFA9'
            },
            animation: {
                'ringing': 'wigglephone 1.5s linear infinite'
            },
            keyframes: {
                wigglephone: {
                  '0%, 15%, 30%': {
                      transform: 'rotate(-10deg)'
                  },
                  '5%,20%': {
                      transform: 'rotate(10deg)'
                  },

                  '50%,100%': {
                      transform: 'rotate(-10deg)'
                  }
                }
            }
        },
        fontFamily: {
            'serif': ['Roboto Slab', 'serif']
        },
    },
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [],
}