<script setup>
import TheHeader from "./components/TheHeader.vue"
import TheFooter from "./components/TheFooter.vue";
import { useHead } from "@vueuse/head";
import { computed } from "vue";
import { useRoute } from "vue-router";


const route = useRoute()

useHead({
    title: computed(() => ('title' in route.meta) ? `${route.meta.title} | Iuvox`: `${route.name} | Iuvox` ),
    htmlAttrs: [
        { lang: "nl-NL" }
    ],
    meta: [
        {
            name: 'description',
            content: computed(() => route.meta.description)
        },
        {
            property: 'og:description',
            content: computed(() => route.meta.description)
        },
        {
            property: 'og:image',
            content: '/favicon.png'
        },
        {
            itemprop: 'test',
            content: 'test'
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent'
        }
    ]
})


</script>

<template >
    <TheHeader />
    <router-view />
    <TheFooter />
</template>

<style>
::-webkit-scrollbar {
    width: 10px;
    background-color: white;
}
::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 10px;
}
h1,h2,h3,h4,h5,h6 {
    @apply font-serif
}
</style>