<script setup>
import TheHeader from "./components/TheHeader.vue"
import TheFooter from "./components/TheFooter.vue";
import { useMain } from "./store/main";

const main = useMain()
main.setCases()

</script>

<template >
    <TheHeader />
    <router-view />
    <TheFooter />
</template>