<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
         <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
</template>

<script setup>


const props = defineProps({
    width: {
        type: Number,
        default: 52,
    },
    strokeWidth: {
        type: String,
        default: '2.5'
    }
})

</script>