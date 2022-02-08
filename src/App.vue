<script setup>
import TheHeader from "./components/TheHeader.vue"
import TheFooter from "./components/TheFooter.vue";
import { useMain } from "./store/main";
import { onMounted } from "vue";

// onMounted(() => {
//     const main = useMain()
//     return main.setCases()
// })

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
</style>