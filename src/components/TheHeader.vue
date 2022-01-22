<template>
    <nav class="px-5 flex sticky top-0 z-10 ease-linear duration-300" :class="headerClass">
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
            classes: {
                active: 'bg-white text-dark-blue py-3 drop-shadow-lg',
                inactive: 'bg-dark-blue text-white py-5'
            }
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
    },
    computed: {
        headerClass() {
            return {
                [this.classes.active]: this.scrolling,
                [this.classes.inactive]: !this.scrolling,
            }
        }
    }
}
</script>
