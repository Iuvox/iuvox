<template>
   <div>
        <div class="bg-dark-blue px-3 pt-10 pb-32 md:px-28 md:pt-24 md:pb-40">
        <h2 class="text-2xl text-secondary font-semibold">Wat betekent het woord:</h2>
        <h1 class="text-4xl text-white font-semibold">Frontend</h1>
    </div>
    <div class="text-xl md:px-28 md:py-20">
        <h2 class="text-dark-blue text-2xl font-semibold">Wat is het?</h2>
        <p>Frontend is de voorkant van de website. Het is datgene waar jij en ik zien als we een website bezoeken. Het wordt ook wel de user interface, gebruikersinterface of voorkant van de website genoemd.</p>
        
        <h2 class="text-dark-blue text-2xl font-semibold mt-4">Wie hebben er allemaal met Frontend te maken?</h2>
        <p>Eigenlijk iedereen. De klant, de designer, de programmeur. Iedereen moet het gebruiksvriendelijk en makkelijk vinden. Ook zit hier het stukje SEO ingebakken. De klant wil een mooie website om aan zijn/haar klanten te laten zien. De designer zorgt ervoor dat het allemaal mooi bij elkaar hoort te staan. Vervolgens heb je de pogrammeur die ervoor zorgt dat het allemaal op elkaar aansluit.</p>
        
        <h2 class="text-dark-blue text-2xl font-semibold mt-4">Welke talen worden gebruikt voor de Frontend?</h2>
        <ul>
            <li>Javascript</li>
            <li>PHP</li>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
        <h2 class="text-dark-blue text-2xl font-semibold mt-4">Welke frameworks kunnen gebruikt worden voor de frontend?</h2>
        <ul>
            <li>Vue</li>
            <li>React</li>
            <li>Svelte</li>
        </ul>
    </div>
   </div>
</template>

<script setup>
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

useHead({
    title: computed(() => `Wat betekent ${route.params.word}`)
})



</script>