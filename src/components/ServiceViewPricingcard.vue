<template>
    <div class="px-3 md:px-36 md:py-20 md:gap-10">
        <h2 class="text-3xl font-bold">Geïnteresseerd?</h2>
        <div class="md:flex mt-3">
            <div class="py-5 px-20 bg-slate-50 rounded-md shadow-md text-center">
                <h4 class="text-secondary font-semibold">Gebasseerd op een Wordpress thema</h4>
                <p class="text-4xl text-dark-blue font-bold font-serif m-10 tracking-widest">€3500</p>
                <ul class="text-slate-400">
                    <li v-for="item in prices.cheap" class="mt-2" v-html="item"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            prices
        }
    }
}
</script>