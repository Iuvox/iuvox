<template>
    <section class="px-2 py-3 md:px-23 flex flex-wrap md:py-10 gap-24 md:justify-center">
        <div v-if="small || title" class="my-8 md:my-0 justify-start w-1/5">
            <small v-if="small" class="text-slate-800">{{ small }}</small>
            <div>
                <h2 v-if="title" class="text-2xl md:text-4xl font-semibold">{{ title }}</h2>
                <hr class="bg-dark-blue h-1 rounded-lg">
            </div>
        </div>
        <div class="leading-relaxed md:leading-loose md:w-1/3 text-lg">
            <slot></slot>
        </div>
        <div class="bg-dark-blue h-80 w-full"></div>
    </section>
</template>

<script setup>

const props = defineProps({
    small: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    body: {
        type: String,
        default: null
    }
})

</script>