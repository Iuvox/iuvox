<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-20 h-screen w-screen " :style="style"></div>
</template>
<script setup>

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    style: {
        type: Object,
        default: {}
    }
})

</script>
