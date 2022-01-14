<template>
    <component
        :is="type"
        class="grow-0 items-start bg-dark-blue text-white rounded pl-5 pr-5 py-1 group drop-shadow-lg"
        v-bind="$attrs"
    >
        <slot></slot>
        <fa-icon icon="chevron-right" class="ml-1 group-hover:ml-2 ease-linear duration-200" />
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