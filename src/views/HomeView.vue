<template>
    <div class="relative h-min-40 py-5 md:py-56 bg-dark-blue px-4 md:px-52">
        <h1 class="text-5xl font-bold text-secondary">
            Welkom bij
            <span class="font-serif">Iuvox</span>
        </h1>
        <h2
            class="text-4xl text-white"
        >All-in-one, Full-Service Development bureau dat jouw bedrijf nodig heeft</h2>
        <span class="relative inline-flex mt-5">
            <BaseButton
                type="router-link"
                :to="'/'"
                class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-dark-blue bg-white transition ease-in-out duration-150 delay-150 ring-1 ring-slate-900/10"
            >Leer ons kennen</BaseButton>
            <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"
                ></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
        </span>
    </div>
    <section class="bg-slate-100">
        <p class="text-center">
            <small>Ps. Hier zijn we heel trots op</small>
        </p>
        <TransitionGroup
            name="list"
            tag="div"
            ref="scrollElement"
            class="px-10 py-3 flex flex-nowrap md:justify-center overflow-x-scroll snap-x snap-mandatory gap-10 h-24 scrollbar-none"
        >
            <router-link
                v-for="case_ in main.getCases"
                class="flex min-w-max snap-center"
                :to="{ name: 'Case', params: { case: case_.pagedetails.slug } }"
                :key="case_"
            >
                <img
                    :src="imageUrl(case_.logo)"
                    :alt="case_.pagedetails.name"
                    class="h-auto w-full object-contain block grayscale ease-linear duration-200 hover:grayscale-0"
                />
            </router-link>
        </TransitionGroup>
    </section>
    <div
        class="grid md:grid-cols-2 bg-secondary bg-opacity-70 px-5 md:pb-16 items-center md:px-48"
    >
        <div>
            <p class="text-black text-4xl mb-3">
                Je kent ons nog niet, maar nu wel. Ontmoet
                <span class="font-serif">Iuvox</span>. Wij hebben ervaring met ontzettend veel platforms
            </p>
            <BaseButton router-link to="about-us">Ontmoet ons</BaseButton>
        </div>
        <div class="flex justify-center h-60">
            <TransitionReplaceImage :images="images" :height="15" :duration="4000" />
        </div>
    </div>
    <div class="bg-zinc-50 grid md:grid-cols-3 gap-5 md:p-10 h-min-96 px-5 md:px-72">
        <HomeViewCta />
    </div>
    <div class="py-10 px-5 md:px-48 grid md:grid-cols-2">
        <div class="basis-full md:basis-1/3 md:px-32 font-serif m-auto">
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
                        <template v-slot:icon="icon">
                            <fa-icon icon="phone" class="group-hover:animate-ringing" />
                        </template>
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
import TransitionReplaceImage from "../components/TransitionReplaceImage.vue";
import HomeViewCta from "../components/HomeViewCta.vue";
import { API_URL } from "../plugins/utils";
import { useMain } from "../store/main";



export default {
    setup() {
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
    mounted() {
        this.case_s = this.main.getCases
    },
    methods: {
        imageUrl(asset) {
            return `${API_URL}/assets/${asset}`
        },
        handleSubmit(e) {
            console.log(e)
        }
    },
    components: { BaseButton, BaseInput, BaseForm, TransitionReplaceImage, HomeViewCta }
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