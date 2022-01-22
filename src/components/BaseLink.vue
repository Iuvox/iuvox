<template>
    <component
        :is="type"
        :href="theHref"
        class="text-dark-blue underline font-semibold"
        v-bind="$attrs"
        @click.self="showHref()"
    >
        <slot></slot>
    </component>
</template>

<script>
export default {
    props: {
        href: {
            type: String,
            default: null
        },
        routerLink: {
            type: Boolean,
            default: false
        },
        protected: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        showHref() {
            window.location = this.href
        }
    },
    computed: {
        type() {
            var type = this.routerLink ? 'router-link' : 'button'
            if(this.href !== null && this.protected === false) {
                return 'a'
            } else {
                return type
            }
        },
        theHref() {
            if (this.protected) {
                return '#'
            } else {
                return this.href
            }
        }
    }

}
</script>