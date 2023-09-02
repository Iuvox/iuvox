<template>
    <component :is="tag" :class="classreset" @click="showHref()" class="group ease duration-500" v-bind="$attrs">
        <slot></slot>
    </component>
</template>

<script setup>
import { computed } from 'vue';

const showHref = () => { if(props.protectedHref !== null) window.location = props.protectedHref } 

const props = defineProps({
    tag: {
        type: String,
        default: 'button'
    },
    reset: {
        type: Boolean,
        default: false
    },
    protectedHref: {
        type: String,
        default: null
    },
    inverse: {
        type: Boolean,
        default: false
    },
    icon: {
        type: Boolean,
        default: true,
    }
})
const classreset = computed(() => {
    return {
        'grow-0 items-start bg-dark-blue text-white rounded pl-5 pr-5 py-1 drop-shadow-lg': !props.reset && !props.inverse,
        'grow-0 items-start bg-white text-dark-blue rounded pl-5 pr-5 py-1 drop-shadow-lg': props.inverse
    }
})

</script>