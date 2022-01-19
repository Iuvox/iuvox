<template>
    <form @submit.prevent="submitForm($event)" novalidate>
        <slot name="input" :submitted="submitted"></slot>
        <slot name="submit" >
            <BaseButton type="submit" class="mt-3">Verstuur</BaseButton>
        </slot>
    </form>
</template>

<script>
import BaseButton from "./BaseButton.vue"
export default {
    data() {
        return {
            submitted: false
        }
    },
    methods: {
        submitForm(e) {
            console.log(e)
            console.log(e.target)
            this.submitted = true
            this.checkValidation(e)
        },
        checkValidation(e) {
            e.target.checkValidity()
        }
    },
    components: { BaseButton }
}
</script>