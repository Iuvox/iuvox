<template>
    <form @submit.prevent="submitForm($event)" :novalidate="novalidation" :key="submitCount" ref="form">
        <slot name="popup"></slot>
        <slot name="input" :submitted="submitted"></slot>
        <slot name="submit" >
            <BaseButton type="submit" class="mt-3">Verstuur</BaseButton>
        </slot>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';


const props = defineProps({
    novalidation: {
        type: Boolean,
        default: true
    }
})

const submitted = ref(false)
const form = ref(null)
const submitCount = ref(0)
const emit = defineEmits(['submitted'])


const submitForm = (e) => {
    const valid = (props.novalidation === false) ? true : e.target.checkValidity()
    emit('submitted', {
        event: e,
        valid: valid 
    })
    submitted.value = true
    if(valid) {
        // form.value.reset()
        submitCount.value += 1
    }
}




</script>