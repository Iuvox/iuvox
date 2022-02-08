<template>
    <header
        ref="header"
        class="px-5 flex items-center sticky top-0 z-40 ease-linear duration-300"
        :class="headerClass"
    >
        <div class="flex flex-1 items-center">
            <router-link to="/">
                <h1 class="text-4xl">
                    <span class="font-serif">IUVOX</span>
                </h1>
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
            
            
                <MenuIcon key="menuicon" class="absolute w-10" v-show="collapsed" />
                <CloseIcon key="closeicon" class="absolute w-10 text-dark-blue" v-show="!collapsed" />
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
            >
                <ul @click="toggleMenu" class="pt-2 flex justify-end flex-col md:flex-row gap-6">
                    <li
                        v-for="item in links"
                        class="px-4 ease duration-300 hover:bg-slate-700 hover:rounded-md"
                    >
                        <router-link
                            :to="item.routerLink"
                            class="text-lg font-serif font-normal"
                        >{{ item.name }}</router-link>
                    </li>
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
import { SCREEN_SIZES } from "../plugins/utils";
import BaseOverlay from "./BaseOverlay.vue"
import BaseButton from "./BaseButton.vue";
import MenuIcon from '../plugins/icons/MenuIcon.vue'
import CloseIcon from '../plugins/icons/CloseIcon.vue'

export default {
    data() {
        return {
            msg: "test",
            scrolling: false,
            iscollapsed: true,
            ismobile: false,
            headerheight: 82,
            classes: {
                active: "bg-white text-dark-blue py-3 drop-shadow-lg",
                inactive: "bg-dark-blue text-white py-5"
            },
            links: [
                {
                    name: "Home",
                    routerLink: {
                        name: "Home"
                    }
                },
                {
                    name: "Over ons",
                    routerLink: {
                        name: "Waarom Iuvox?"
                    }
                }
            ]
        };
    },
    mounted() {
        if (window.innerWidth < SCREEN_SIZES.md) {
            this.ismobile = true
        }
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmout() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            setTimeout(() => {
                this.scrolling = (window.scrollY > 0);
            }, 200);
        },
        toggleMenu() {
            this.iscollapsed = !this.iscollapsed;
        }
    },
    computed: {
        headerClass() {
            return {
                [this.classes.active]: this.scrolling,
                [this.classes.inactive]: !this.scrolling,
            };
        },
        collapsed() {
            if (this.ismobile) {
                return this.iscollapsed
            } else {
                return null
            }
        }
    },
    components: { BaseOverlay, BaseButton, MenuIcon, CloseIcon }
}
</script>