<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
         <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
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