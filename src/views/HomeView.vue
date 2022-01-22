<template>
    <div class="relative h-min-40 md:h-min-96  bg-dark-blue grid md:grid-cols-2">
        <div class="pb-10 md:pb-40 pt-14 px-5 md:px-48">
            <h1 class="text-4xl text-white">
                Welkom bij
                <span class="font-serif">Iuvox</span>
            </h1>
            <h4 class="text-2xl text-white">Full service Development bureau</h4>
        </div>
        <div class="flex relative items-center justify-center" >
            <TransitionReplaceImage :images="images" :height="15" :duration="4000" />
        </div>
    </div>
    <div>
        <div class="px-10 py-3 flex gap-10 justify-center bg-slate-100 h-24">
            <div v-for="partner in partners" class="flex">
                <img :src="partner.logo" class="h-full w-auto grayscale ease-linear duration-200 hover:grayscale-0">
            </div>
        </div>
    </div>
    <div class="bg-orange bg-opacity-70 px-5 pt-16 flex flex-wrap items-start  md:px-48  h-96">
        <div class="basis-full md:basis-1/3">
            <p class="text-black text-4xl mb-3">
                Je kent ons nog niet, maar nu wel. Ontmoet
                <span class="font-serif">Iuvox</span>. Een Full Service Development Agency
            </p>
            <BaseButton router-link to="about-us">Ontmoet ons</BaseButton>
        </div>
    </div>
    <div class="bg-zinc-50 grid md:grid-cols-3 gap-5 md:p-10 h-min-96 px-5 md:px-48">
        <HomeViewCta />
    </div>
    <div class="py-10 px-5 md:px-48 grid md:grid-cols-2">
        <div class="basis-full md:basis-1/3 md:px-32 font-serif m-auto">
            <p class="text-4xl text-dark-blue">Geïntereseerd geraakt? Neem contact met ons op. We komen snel bij je terug!</p>
        </div>
        <div class="basis-full md:basis-2/3">
            <BaseForm>
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

export default {
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
            partners: [
                {logo: 'https://roseflowers.nl/app/uploads/2021/09/logo_rose.png'},
                {logo: 'https://www.trouwringenvoordeel.nl/Files/10/258000/258892/Protom/1609116/Media/logo2019-transparantkleurpaars_nl.png'},
                {logo: 'https://spiritualdinnerclub.com/logo-horizon.svg'},
                {logo: 'https://www.f4work.nl/wp-content/uploads/2021/05/F4Work-logo-600.png'},
                {logo: '/src/assets/kaashuys-logo.png'},
                {logo: 'https://prooef.nl/logo.png'}
            ],
            whichimage: 0,
            interval: null,
        }
    },
    methods: {},
    components: { BaseButton, BaseInput, BaseForm, TransitionReplaceImage, HomeViewCta }
}
</script>
