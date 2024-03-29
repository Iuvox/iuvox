<template>
    <header
        ref="header"
        class="px-5 flex items-center sticky top-0 z-40 ease-linear duration-300"
        :class="headerClass"
    >
        <div class="flex flex-1 items-center">
            <router-link to="/" class="h-12">
                <img class="w-full h-full" v-if="scrolling" src="https://admin.iuvox.nl/assets/9831ca51-535b-4972-b7af-34dc652c0959?width=200&height=100" alt="">
                <span v-if="!scrolling" class="font-serif font-bold text-4xl">IUVOX</span>
            </router-link>
        </div>
        <BaseButton
            tag="router-link"
            to="/contact-iuvox"
            :icon="false"
            :inverse="!scrolling"
            class="md:hidden"
        >
            <span class="font-serif font-semibold">Contact</span>
        </BaseButton>
        <button
            @click="toggleMenu"
            class="z-50 relative flex justify-center items-center ml-3 w-10 md:hidden"
        >
            <TransitionGroup
                enter-active-class="ease duration-500"
                leave-active-class="duration-500"
                enter-from-class="-rotate-180 opacity-0"
                leave-to-class="rotate-180 opacity-0"
            >
                <span class="visually-hidden" key="visually-hidden md:hidden">Menu</span>
                <MenuIcon
                    key="menuicon"
                    class="absolute w-10"
                    aria-hidden="true"
                    v-show="iscollapsed"
                />
                <CloseIcon
                    aria-hidden="true"
                    key="closeicon"
                    class="absolute w-10 text-dark-blue"
                    v-show="!iscollapsed"
                />
            </TransitionGroup>
        </button>
        <transition
            name="slide-fade"
            enter-active-class="ease duration-200"
            leave-active-class=" duration-200"
            enter-from-class="translate-x-10 opacity-0"
            leave-to-class="translate-x-10 opacity-0"
        >
            <nav
                v-show="!collapsed"
                class="fixed right-0 top-0 bottom-0 z-30 h-screen w-8/12 p-5 bg-slate-100 text-dark-blue md:relative md:p-0 md:text-inherit md:inset-auto md:h-auto md:w-auto md:bg-transparent md:flex-1 md:pr-20"
                :class="mobileClass"
            >
                <ul class="pt-2 flex justify-end flex-col md:flex-row gap-6">
                    <TheHeaderMenuitems :closeAll="closeall" :items="links" />
                    <li>
                        <BaseButton
                            tag="router-link"
                            to="/contact-iuvox"
                            :icon="false"
                            :inverse="!scrolling"
                        >
                            <span class="font-serif font-semibold">Contact</span>
                        </BaseButton>
                    </li>
                </ul>
            </nav>
        </transition>
        <BaseOverlay @click="toggleMenu" :show="!collapsed && collapsed !== null" />
    </header>
</template>

<script>
import BaseOverlay from "./BaseOverlay.vue"
import BaseButton from "./BaseButton.vue";
import MenuIcon from '../plugins/icons/MenuIcon.vue'
import CloseIcon from '../plugins/icons/CloseIcon.vue'
import TheHeaderMenuitems from "./TheHeaderMenuitems.vue";
import { onClickOutside, useWindowScroll } from "@vueuse/core"
import { api } from "../plugins/api";

export default {
    setup() {

    },
    data() {
        return {
            msg: "test",
            iscollapsed: true,
            closeall: false,
            headerheight: 82,
            services: [],
            mobileClass: {
                'mobile-hidden': true
            },
            classes: {
                active: "bg-white text-dark-blue py-3 drop-shadow-lg",
                inactive: "bg-dark-blue text-white py-5"
            },
            linksColl: {
                home: {
                    name: "Home",
                    routerLink: {
                        name: "Home"
                    }
                },
                about: {
                    name: "Over ons",
                    routerLink: {
                        name: "Waarom Iuvox?"
                    }
                },
                cases: {
                    name: "Cases",
                    routerLink: {
                        name: "Cases"
                    }
                }
            }
        };
    },
    methods: {
        toggleMenu() {
            this.iscollapsed = !this.iscollapsed;
        }
    },
    mounted() {
        this.mobileClass['mobile-hidden'] = false
        api.get('/items/services?fields=*.*').then(res => {
            this.services = res.data.data
        })
        onClickOutside(this.$refs.header, (e) => this.closeall = !this.closeall)
    },
    computed: {
        headerClass() {
            return {
                [this.classes.active]: this.scrolling,
                [this.classes.inactive]: !this.scrolling,
            };
        },
        scrolling() {
            if (import.meta.env.SSR) {
                return false
            } else {
                const { x, y } = useWindowScroll()
                return y.value > 0
            }
        },
        ismobile() {
            if (import.meta.env.SSR) {
                return false
            } else {
                return !window.matchMedia('(min-width: 768px)').matches
            }
        },
        collapsed() {
            return this.iscollapsed
        },
        servicesColl() {
            const popover = {}
            this.services.map(el => {
                if (el.category in popover) {
                    popover[el.category].items.push(el)
                } else {
                    popover[el.category] = { category: el.category, items: [] }
                    popover[el.category].items.push(el)
                }
            });
            return popover
        },
        links() {
            const arr = this.linksColl
            arr['services'] = ({
                name: "Services",
                popoverOpen: false,
                popover: this.servicesColl
            })
            return arr
        }
    },
    watch: {
        $route() {
            this.iscollapsed = true
        }
    },
    components: { BaseOverlay, BaseButton, MenuIcon, CloseIcon, TheHeaderMenuitems }
}
</script>

<style>
@media screen and (max-width: 768px) {
    nav.mobile-hidden {
        display: none;
    }
}
@media screen and (min-width: 769px) {
    nav {
        display: block !important;
    }
}
</style>