<template>
    <component
        :is="type"
        class="text-dark-blue underline font-semibold"
        v-bind="$attrs"
        @click.self="showHref($event)"
    >
        <slot></slot>
    </component>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'button'
        },
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
        showHref(e) {
            if(this.protected) {
                window.location = this.href           
            }
        }
    },
    computed: {
        type() {
            return this.tag
        },
        theHref() {
            if (this.protected) {
                return false
            } else {
                return this.href
            }
        }
    }

}
</script>