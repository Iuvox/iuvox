<template>
    <div class="relative bg-dark-blue">
        <div class=" pb-40 pt-14 px-5 md:px-48 ">
            <h1 class="text-4xl text-white">Welkom bij <span class="font-serif">Iuvox</span></h1>
            <h4 class="text-2xl text-white">Full service Development bureau </h4>
        </div>
    </div>
    <div class="bg-orange bg-opacity-70 px-5 md:px-48 pt-5 flex flex-wrap items-start h-96">
        <div class="basis-full md:basis-1/3 ">
            <p class="text-black text-4xl mb-3">Je kent ons nog niet, maar nu wel. Ontmoet <span class="font-serif">Iuvox</span>. Een Full Service Development Agency</p>
            <BaseButton router-link to="/aboutus">Ontmoet ons</BaseButton>

        </div>
    </div>
    <div class="bg-zinc-50 grid md:grid-cols-3 md:p-10 h-96 px-5 md:px-48">
        <div v-for="i in 3" class="basis-full md:basis-1/3 my-3 bg-white drop-shadow-md rounded-lg p-10 mx-10">
            <p class="text-slate-700 text-sm">Development</p>
            <h2 class="text-lg text-center">Webdevelopment</h2>
        </div>
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
export default {
    methods: {},
    components: { BaseButton }
}
</script>
 