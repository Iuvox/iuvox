<template>
    <div
        v-for="cta in ctas"
        class="basis-full md:basis-1/3 my-3 bg-white drop-shadow-md rounded-lg p-10 ease group duration-300 hover:bg-dark-blue hover:text-white"
    >
        <p class="text-slate-700 text-sm group-hover:text-white">{{ cta.category }}</p>
        <h2 class="text-lg mt-3">{{ cta.title }}</h2>
        <p v-html="cta.description" class="h-32"></p>
        <router-link class="underline text-dark-blue font-semibold group-hover:text-white" :to="{name: 'Home', query: {test: cta.title}}">Lees meer <fa-icon icon="chevron-right" size="xs" /> </router-link>
    </div>
</template>

<script setup>
import { ref } from "vue";

const ctas = ref([
    {
        category: "Development",
        title: "Webdevelopment",
        description: "Samen met een ervaren designer gaan wij kijken wat jij nou écht precies nodig hebt voor je bedrijf. We bespreken de mogelijkheden, de kansen en de valkuilen"
    },
    {
        category: "Development",
        title: "Software koppelingen",
        description: "Elk bedrijf heeft meerdere systemen die soms wel, soms niet goed op elkaar aansluiten. Samen met jou gaan we op zoek naar de beste oplossing voor jouw probleem."
    },
    {
        category: "Ontwikkeling",
        title: "SaaS Systemen",
        description: "Je hebt een geweldig idee gekregen en nu moet er een Saas (Software as a Service) platform gemaakt worden. Ook daar hebben we bij Iuvox ervaring mee."
    }
])
</script>
