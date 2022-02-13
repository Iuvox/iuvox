<template>
<div class="flex justify-center items-center pt-10 pb-32">
    <div class="text-center md:w-1/2">
        <h1 class="text-6xl font-serif font-bold mb-3">404 :(</h1>
        <p class="text-3xl">Helaas de pagina {{fromroute}} bestaat niet. Er is meteen een melding naar ons team gestuurd om te kijken wat er mis is gegaan</p>
        <p class="text-3xl mt-8">Als we je ergens mee kunnen helpen dan horen we het graag.</p>
        <div class="flex gap-3 mt-3 justify-center">
            <BaseButton tag="router-link" to="/contact-iuvox">Naar contact</BaseButton>
            <BaseButton protectedHref="tel:+31649203503">Bel ons direct</BaseButton>

        </div>
    </div>    
</div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';


const route = useRoute()
route.meta.description = 'Ohnee, deze pagina is niet gevonden! Zie je deze pagina in Google? Laat het ons snel weten!'


const fromroute = computed(() => {
    if('from' in route.query) {
        return route.query.from 
    } else {
        return 'waar jij naartoe wilde gaan'
    }
})

</script>