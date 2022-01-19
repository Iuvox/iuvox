<template>
    <component
        :is="type"
        class="text-dark-blue underline font-semibold"
        v-bind="$attrs"
    >
        <slot></slot>
    </component>
</template>

<script>
export default {
    props: {
        routerLink: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        type() {
            return this.routerLink ? 'router-link' : 'button'
        }
    }

}
</script>