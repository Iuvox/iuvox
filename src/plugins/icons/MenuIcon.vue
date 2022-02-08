<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
</template>

<script setup>


const props = defineProps({
    width: {
        type: Number,
        default: 52,
    },
    stroke: {
        type: String,
        default: '#000000'
    },
    strokeWidth: {
        type: String,
        default: '2.5'
    }
})

</script>