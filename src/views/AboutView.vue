<template>
    <section class="bg-dark-blue px-2 h-96 pt-10 relative md:px-32">
        <h1 class="text-3xl font-bold text-secondary font-serif" >Waarom kies je voor Iuvox?</h1>
        <div class="absolute w-full flex justify-center bottom-4 left-0 right-0">
            <fa-icon icon="arrow-circle-down" class="animate-bounce text-white" size="2x" />
        </div>
    </section> 
    <AboutViewSection 
        v-for="section in sections" 
        :small="section.small"
        :title="section.title"
    >
        <p v-html="section.body"></p>
    </AboutViewSection>
    <section class="flex flex-wrap items-start justify-center h-52 py-10 bg-dark-blue text-white">
        <h2 class="text-3xl font-semibold font-serif text-center w-full">(Virtueel) Kopje koffie drinken?</h2>
        <BaseButton
            tag="router-link"
            :to="{name: 'Home'}"
            :inverse="true"
        >Neem contact op</BaseButton>
    </section>
    
</template>

<script setup>
import { ref } from "vue";
import AboutViewSection from "../components/AboutViewSection.vue";
import { api } from "../plugins/api";
import BaseButton from "../components/BaseButton.vue";


const items = ref([
    'Vue',
    'NodeJS',
    'Wordpress',
    'TailwindCSS',
    'PHP',
])

const sections = ref({})

api.get('/items/about', {params: {'fields[]': 'sections' }}).then(
    (res) => {
        sections.value = res.data.data.sections
    }
)
</script>

<style>
section ul {
    @apply marker:text-dark-blue list-disc pl-5
}
</style>