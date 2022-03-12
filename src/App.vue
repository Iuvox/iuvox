<script setup>
import TheHeader from "./components/TheHeader.vue"
import TheFooter from "./components/TheFooter.vue";
import { useHead } from "@vueuse/head";
import { computed, onMounted, onServerPrefetch } from "vue";
import { useRoute } from "vue-router";
import { gtmInit } from './plugins/gtm'
import { useMain } from "./store/main";

const route = useRoute()
const main = useMain()

onServerPrefetch(() => main.setDefaults())
onMounted(() => main.setDefaults())

useHead({
    title: computed(() => ('title' in route.meta) ? `${route.meta.title} | Iuvox` : `${route.name} | Iuvox`),
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
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                'url': 'https://iuvox.nl',
            })
        }
    ]
})

onMounted(() => {
    gtmInit()
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
h1,
h2,
h3,
h4,
h5,
h6 {
    @apply font-serif;
}
.visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
svg.lucide {
    display: inline;
}
</style>