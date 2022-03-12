<template>
    <div class="px-4 py-10 md:px-40 md:py-10 bg-slate-50" v-if="exists">
        <div class="flex flex-wrap md:flex-nowrap gap-5 md:gap-20 justify-center">
            <div
                class="bg-white md:w-4/5 px-9 py-10 md:px-14 md:py-16 rounded-sm shadow-md order-2 md:order-1"
            >
                <slot name="article">
                    <h3 class="text-xl text-secondary font-bold">{{title}}</h3>
                    <div id="about" v-html="html" class="text-lg"></div>
                </slot>
            </div>
            <div class="md:w-1/5 w-full order-1 md:order-2">
                <div>
                    <slot name="addition"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';


const props = defineProps({
    title: {
        type: String,
    },
    html: {
        type: String,
    }
})

const exists = computed(() => {
    try {
        return props.html.length > 0
    } catch (err) {
        return false
    }
})

</script>