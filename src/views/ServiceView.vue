<template>
    <div>
        <div class="bg-dark-blue px-3 pt-10 pb-32 md:px-36 md:py-40 md:flex">
            <div>
                <h2 class="text-xl text-secondary font-semibold">{{getService.shortdescription}}</h2>
                <h1 class="text-4xl text-white font-semibold">{{getService.shorttitel}}</h1>
            </div>
            <div class="flex flex-grow justify-end">
                <router-link to="/services">
                    <p class="text-secondary font-semibold">Onze Services</p>
                    <p class="text-white">Bekijk al onze services op 1 plek</p>
                </router-link>
            </div>
        </div>
        <div class="px-3 md:px-36 md:py-24 relative">
            <div id="tsparticles" class="absolute inset-0 -z-20"></div>
            <TheParticles :options="presetCircles" />

            <div class="md:w-3/4 z-20 bg-white bg-opacity-90 p-5 rounded-md shadow-md">
                <div>
                    <h2 class="text-3xl font-semibold">{{ getService.titel }}</h2>
                    <hr class="bg-dark-blue h-1 md:w-2/3" />
                </div>

                <div
                    class="text-lg md:font-semibold py-10 ease-in-out duration-500 -translate-x-52 opacity-0"
                    :class="animate"
                    v-html="getService.inleiding"
                ></div>
            </div>
        </div>
        <div class="md:flex md:px-36 md:py-20 md:gap-20">
            <div class="md:w-1/3">
                <img src="/light-bulb.png" class="p-5 w-56 m-auto rounded-full" alt />
            </div>
            <div class="px-3 text-lg md:w-2/3 normal-ul">
                <div class="px-3 text-lg md:w-2/3 normal-ul" v-html="getService.description"></div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import BaseButton from "../components/BaseButton.vue"
import { useMain } from "../store/main";
import { presetCircles } from "../plugins/particles/";
import TheParticles from "../components/TheParticles.vue"

export default {
    setup() {
        const main = useMain()
        return {
            main
        }
    },
    data() {
        return {
            show: false,
            prices: {
                cheap: [
                    "1 uur brainstorm",
                    "6 volledig ingerichte paginas",
                    "Mobiel Ready",
                    "Contactformulier",
                    "2 uur bootcamp",
                    "Basis SEO integraties",
                    "Basis Google Analytics integratie",
                    "2 rondes aan revisie",
                    "<strong>€200 per pagina extra</strong>"
                ]
            }
        };
    },
    async serverPrefetch() {
        const main = useMain(this.$pinia)
        const route = useRoute()
        const res = await main.setServices(route.params.slug)
        return res
    },
    mounted() {
        if (!this.getService) {
            this.setServices()
        }
        setTimeout(() => {
            this.show = true
        }, 500);
    },
    methods: {
        setServices() {
            this.main.setServices(this.$route.params.slug)
        },
    },
    computed: {
        getService() {
            return this.main.getServices(this.$route.params.slug)
        },
        animate() {
            return {
                'translate-x-0 opacity-100': this.show,

            }
        },
        presetCircles() {
            return presetCircles
        }
    },
    watch: {
        $route() {
            this.setServices()
        }
    },
    components: { BaseButton, TheParticles}
}
</script>
<style lang="postcss">
.normal-ul ul {
    @apply marker:text-dark-blue list-disc pl-5;
}
</style>