<template>
    <section class="bg-dark-blue px-2 h-80 pt-10">
        <h1 class="text-3xl font-bold text-secondary" >Waarom kies je voor Iuvox?</h1>
    </section> 
    <AboutViewSection 
        v-for="section in sections" 
        :small="section.small"
        :title="section.title"
    >
        <p v-html="section.body"></p>
    </AboutViewSection>
    <AboutViewSection
        small="Onze services"
        title="Wat kunnen we niet?"
    >
        <p class="leading-relaxed">
            IUVOX heeft ervaring met verschillende frameworks & platformen. Zo kunnen we jou altijd helpen, óók als je al bestaand product hebt dat verbeterd moet worden.
        </p>
        Een greep uit ons portfolio:
        <ul>
            <li v-for="item in items"><fa-icon icon="chevron-right" size="xs" /> {{item}}</li>
        </ul>
    </AboutViewSection>
    
</template>

<script setup>
import { ref } from "vue";
import AboutViewSection from "../components/AboutViewSection.vue";
import { api } from "../plugins/api";


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
        sections.value = res.data.data[0].sections
    }
)
</script>