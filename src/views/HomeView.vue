<template>
    <div class="relative h-96 bg-dark-blue grid grid-cols-2">
        <div class="pb-40 pt-14 px-5 md:px-48">
            <h1 class="text-4xl text-white">
                Welkom bij
                <span class="font-serif">Iuvox</span>
            </h1>
            <h4 class="text-2xl text-white">Full service Development bureau</h4>
        </div>
        <div class="flex items-center justify-center" >
            <TransitionReplaceImage :images="images">
                <template v-slot:loop="image">
                    <a :href="image.image.link">
                        <div class="bg-white grow-0 rounded-full m-auto p-4 w-40 h-40 basis-full flex shadow-md shadow-slate-400">
                            <img :src="image.image.imglink" :alt="image.image.name">
                        </div>
                        <div>
                            <h4 class="text-white text-4xl text-center">{{image.image.name}}</h4>
                        </div>
                    </a>
                </template>
            </TransitionReplaceImage>
        </div>
    </div>
    <div class="bg-orange bg-opacity-70 px-5 md:px-48 pt-5 flex flex-wrap items-start h-96">
        <div class="basis-full md:basis-1/3">
            <p class="text-black text-4xl mb-3">
                Je kent ons nog niet, maar nu wel. Ontmoet
                <span class="font-serif">Iuvox</span>. Een Full Service Development Agency
            </p>
            <BaseButton router-link to="about-us">Ontmoet ons</BaseButton>
        </div>
    </div>
    <div class="bg-zinc-50 grid md:grid-cols-3 md:p-10 h-96 px-5 md:px-48">
        <div
            v-for="i in 3"
            class="basis-full md:basis-1/3 my-3 bg-white drop-shadow-md rounded-lg p-10 mx-10"
        >
            <p class="text-slate-700 text-sm">Development</p>
            <h2 class="text-lg text-center">Webdevelopment</h2>
        </div>
    </div>
    <div class="py-10 px-5 md:px-48 grid md:grid-cols-2">
        <div class="basis-full md:basis-1/3 px-32 font-serif m-auto">
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
                        required="true"
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
            whichimage: 0,
            interval: null,
        }
    },
    mounted() {
        this.startSlider(4000)
    },
    beforeDestroy() {
        this.killSlider()
    },
    methods: {
        startSlider(ms = 2000) {
            this.interval = setInterval(() => {
                this.whichimage = (this.images.length === (this.whichimage + 1) ) ? 0 : this.whichimage + 1
            }, ms);
        },
        killSlider() {
            if(this.interval) {
                clearInterval(this.interval)
            }
        },
        animate(key) {
            const classes = {
                'opacity-0': (key !== this.whichimage),
                'opacity-1 z-10': (key === this.whichimage)
            }
    	    return classes 
        }
    },
    components: { BaseButton, BaseInput, BaseForm, TransitionReplaceImage }
}
</script>
