<template>
    <div class="relative h-min-40 py-5 md:py-36 2xl:py-56 px-4 lg:px-52">
       <TheParticles class="absolute inset-0 bg-dark-blue -z-10 pointer-events-none" :options="lines" />
        <div class="z-40">
            <h1 class="text-5xl font-bold text-secondary">
                Welkom bij
                <span class="font-serif">Iuvox</span>
            </h1>
            <h2
                class="text-4xl text-white"
            >All-in-one, Full-Service Development bureau dat jouw bedrijf nodig heeft</h2>
            <span class="relative inline-flex mt-5">
                <BaseButton
                    tag="router-link"
                    to="/waarom-iuvox"
                    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm"
                    :inverse="true"
                >Leer ons kennen</BaseButton>
                <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"
                    ></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
            </span>
        </div>
    </div>
    <section class="bg-slate-100">
        <p class="text-center">
            <small>Ps. Hier zijn we heel trots op</small>
        </p>
        <Transition
            ref="scrollElement"
            enter-active-class="ease duration-500"
            leave-active-class="duration-500"
            enter-from-class=" opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                class="px-10 py-3 flex flex-grow-0 flex-nowrap md:justify-center overflow-x-scroll snap-x snap-mandatory gap-10 h-24 scrollbar-none ease duration-1000"
                v-if="main.getCases.length > 0"
            >
                <div v-for="case_ in main.getCases" class="flex-shrink-0">
                   <router-link :aria-label="'Ga naar' +case_.pagedetails.title " :to="{ name: 'Case', params: { case: case_.pagedetails.slug } }">
                        <img
                            :src="imageUrl(case_.logo)"
                            :alt="case_.pagedetails.title"
                            class="h-full w-auto object-contain block grayscale ease-linear duration-200 hover:grayscale-0"
                        />
                        
                   </router-link>
                </div>
            </div>
        </Transition>
    </section>
    <div class="grid md:grid-cols-2 bg-secondary bg-opacity-70 px-5 md:pb-16 items-center lg:px-48">
        <div>
            <p class="text-black text-4xl mb-3">
                Je kent ons nog niet, maar nu wel. Ontmoet
                <span class="font-serif">Iuvox</span>. Wij hebben ervaring met ontzettend veel platforms
            </p>
            <BaseButton tag="router-link" to="/waarom-iuvox">Ontmoet ons</BaseButton>
        </div>
        <div class="flex justify-center items-center h-60">
            <TransitionReplaceImage :images="images" :height="15" :duration="4000" />
        </div>
    </div>
    <div class="bg-zinc-50 grid gap-5 h-min-96 px-5 md:grid-cols-3 md:p-10 lg:px-32 2xl:px-72">
        <HomeViewCta />
    </div>
    <div class="py-10 px-5 sm:px-10 lg:px-24 2xl:px-48 grid md:grid-cols-2">
        <div class="basis-full md:basis-1/3 lg:px-32 font-serif m-auto">
            <p
                class="text-4xl text-dark-blue"
            >Geïntereseerd geraakt? Neem contact met ons op. We komen snel bij je terug!</p>
        </div>
        <div class="basis-full md:basis-2/3">
            <BaseForm @submitted="handleSubmit($event)">
                <template v-slot:input="input">
                    <BaseInput
                        :submitted="input.submitted"
                        label="Je Naam"
                        placeholder="Iuvox"
                        class="mt-3"
                        :required="true"
                    />
                    <BaseInput
                        :submitted="input.submitted"
                        label="Je Bedrijf"
                        placeholder="Iuvox"
                        class="mt-3"
                        :required="true"
                    />
                    <BaseInput
                        :submitted="input.submitted"
                        label="Je E-mail"
                        placeholder="info@iuvox.nl"
                        class="mt-3"
                        :required="true"
                        type="email"
                    />
                </template>
                <template v-slot:submit="btn">
                    <BaseButton class="mt-3" type="submit">Verstuur</BaseButton>
                    <BaseButton tag="a" href="tel:+31649203503" class="ml-2 group">
                        Meteen Bellen
                        <template v-slot:icon="icon"></template>
                    </BaseButton>
                </template>
            </BaseForm>
        </div>
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseForm from "../components/BaseForm.vue";
import TheParticles from "../components/TheParticles.vue"
import TransitionReplaceImage from "../components/TransitionReplaceImage.vue";
import HomeViewCta from "../components/HomeViewCta.vue";
import { API_URL } from "../plugins/utils";
import { useMain } from "../store/main";
import { lines } from "../plugins/particles/";
import { useRoute } from "vue-router";
import { api } from "../plugins/api";


export default {
    setup() {
        const route = useRoute()
        route.meta.description = 'Iuvox Development. Wij bouwen alles van websites to API koppelingen. Wij helpen jouw bedrijf naar het volgende level tillen.'
        const main = useMain()
        return { main }
    },
    data() {
        return {
            images: [
                {
                    name: 'TailwindCSS',
                    imglink: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
                    link: '#tailwind'
                },
                {
                    name: 'Vue3',
                    imglink: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
                    link: '#vue3'
                },
                {
                    name: 'NodeJS',
                    imglink: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
                },
                {
                    name: 'Wordpress',
                    imglink: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg',
                    link: '#wordpress'
                }
            ],
            whichimage: 0,
            interval: null,
        }
    },
    async serverPrefetch() {
        const res = await this.main.setHomeView()
        return res
    },
    mounted() {
        if (!this.main.getCases) {
            this.main.setHomeView()
        }
        this.startSlider(4000)
    },
    beforeDestroy() {
        this.killSlider()
    },
    computed: {
        lines: () => (lines)
    },
    methods: {
        imageUrl(asset) {
            return `${API_URL}/assets/${asset}`
        },
        handleSubmit(e) {
            if (e.valid) {
                const el = e.event.target.elements
                api.post('/items/contact_requests', {
                    naam: el.je_naam.value,
                    email: el['je_e-mail'].value,
                    bedrijf: el.je_bedrijf.value
                })
            }
            console.log(e)
        },
        startSlider(ms = 2000) {
            const slider = this.$refs.scrollElement
            const length = this.main.getCases.length

            let i = 1
            this.interval = setInterval(() => {
                var scrollx = 50
                if (i === length) {
                    scrollx = - (2000 * length)
                    i = 1
                }
                try {
                    slider.scrollBy({
                        left: scrollx,
                        top: 0,
                        behavior: 'smooth'
                    })
                } catch (error) {
                    this.killSlider()
                }

                i++
            }, ms);
        },
        killSlider() {
            if (this.interval) {
                clearInterval(this.interval)
            }
        }
    },
    components: { BaseButton, BaseInput, BaseForm, TransitionReplaceImage, HomeViewCta , TheParticles}
}
</script>
<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}
</style>