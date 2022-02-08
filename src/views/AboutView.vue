<template>
    <div class="body">
        <section class="bg-dark-blue px-2 h-96 pt-10 relative md:px-32">
            <h1 class="text-3xl font-bold text-secondary font-serif">Waarom kies je voor Iuvox?</h1>
            <div class="absolute w-full flex justify-center bottom-4 left-0 right-0">
                <!-- <fa-icon icon="arrow-circle-down" class="animate-bounce text-white" size="2x" /> -->
            </div>
        </section>
        <div>
            <AboutViewSection v-for="section in main.getSections" :small="section.small" :title="section.title">
                <div v-html="section.body"></div>
            </AboutViewSection>
        </div>
        <section
            class="flex flex-wrap items-start justify-center h-52 py-10 bg-dark-blue text-white"
        >
            <h2
                class="text-3xl font-semibold font-serif text-center w-full"
            >(Virtueel) Kopje koffie drinken?</h2>
            <BaseButton tag="router-link" :to="{ name: 'Home' }" :inverse="true">Neem contact op</BaseButton>
        </section>
    </div>
</template>

<script>
import AboutViewSection from "../components/AboutViewSection.vue";
import BaseButton from "../components/BaseButton.vue";
import { useMain } from "../store/main";


export default {
    setup() {
        const main = useMain()
        return {
            main
        }
    },
    data() {
        return {
            sections: [],
            items: [
                'Vue',
                'NodeJS',
                'Wordpress',
                'TailwindCSS',
                'PHP',
            ]
        }
    },
    async serverPrefetch() {
        const main = useMain(this.$pinia)
        const res = await main.setAboutPage()
        return res
    },
    mounted() {
        console.log(this.main.getSections)
        if(!this.main.getSections) {
            this.main.setAboutPage()
        }
    },
    methods: {
    },
    components: {AboutViewSection, BaseButton}
}

</script>

<style lang="postcss">
section ul {
    @apply marker:text-dark-blue list-disc pl-5;
}
</style>