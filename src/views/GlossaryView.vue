<template>
    <div>
        <div class="bg-dark-blue px-3 pt-10 pb-32 md:px-28 md:pt-24 md:pb-40">
            <h2 class="text-2xl text-secondary font-semibold">Wat betekent het woord:</h2>
            <h1 class="text-4xl text-white font-semibold capitalize">{{ param }}</h1>
        </div>
        <section class="text-xl md:px-28 md:py-20 bg-slate-50">
            <div v-html="glossary.explanation"></div>
        </section>
        <section class="bg-white py-24 shadow-2xl flex justify-center">
            <div class="md:w-1/2">
                <h2 class="text-3xl font-bold text-dark-blue">Meer uit jouw bedrijf halen met Iuvox?</h2>
                <p>Heb je nog meer informatie nodig over {{ param }}? Joep en de rest van Iuvox zijn er voor jou en je bedrijf. Wij gaan vrijblijvend het gesprek in en gaan niet kijken naar het systeem dat het meeste kost. We kijken naar welk systeem het beste bij jouw past.</p>
                <p class="mt-2">
                    Je kan hem altijd bellen op
                    <BaseLink :protected="true" href="+31649203503">06 49 203 503</BaseLink>of vul het contactformulier in
                </p>
                <BaseButton class="mt-4">Neem contact op</BaseButton>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useHead } from '@vueuse/head';
import { computed, onMounted, onServerPrefetch, ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseLink from '../components/BaseLink.vue';
import BaseButton from '../components/BaseButton.vue';
import { api } from '../plugins/api';
import { useMain } from '../store/main';

const route = useRoute()
const param = route.params.word

const glossary = ref('')
const main = useMain()

useHead({
    title: computed(() => `Wat betekent ${param}`)
})

onServerPrefetch( async () => {
    const data = await main.setDefinition(param)
    glossary.value = main.getDefinition

    return data
})

onMounted(() => {
    main.setDefinition(param)
    glossary.value = main.getDefinition

})


</script>

<style lang="postcss">
section ul {
    @apply marker:text-dark-blue list-disc pl-5;
}
section h2 {
    @apply text-dark-blue text-2xl font-semibold mt-4;
}
</style>