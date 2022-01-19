<template>
    <nav class="px-5 flex sticky top-0 z-10 ease-linear duration-300" :class="(scrolling) ? 'bg-white text-dark-blue py-3 drop-shadow-lg' : 'bg-dark-blue text-white py-5 '">
        <div class="flex-1">
            <router-link to="/">
                <h1 class="text-4xl"><span class="font-serif">Iuvox</span></h1>
            </router-link>
        </div>
        <div class="flex-1">
            <router-link to="/" class="">There</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            msg: 'test',
            scrolling: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll )
    },
    beforeUnmout() {
        window.removeEventListener('scroll', this.handleScroll )
    },
    methods: {
        handleScroll() {
            setTimeout(() => {
                this.scrolling = (window.scrollY > 0)
            }, 200)
        }
    }
}
</script>
