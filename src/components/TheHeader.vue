<template>
    <header ref="header" class="px-5 flex sticky top-0 z-40 ease-linear duration-300" :class="headerClass">
        <div class="flex flex-1 items-center">
            <router-link to="/">
                <h1 class="text-4xl">
                    <span class="font-serif">IUVOX</span>
                </h1>
            </router-link>
        </div>
        <button @click="toggleMenu" class="z-50 relative flex justify-center items-center w-10 md:hidden">
            <TransitionGroup
                enter-active-class="ease duration-500"
                leave-active-class="duration-500"
                enter-from-class="-rotate-180 opacity-0"
                leave-to-class="rotate-180 opacity-0"
            >
                <fa-icon v-if="collapsed" class="absolute w-10" icon="bars" size="lg" />
                <fa-icon v-if="!collapsed" class="absolute w-10" icon="times" size="lg" />
            </TransitionGroup>
        </button>
        <transition 
            name="slide-fade"
            enter-active-class="ease duration-200"
            leave-active-class=" duration-200"
            enter-from-class="translate-x-10 opacity-0"
            leave-to-class="translate-x-10 opacity-0"
        >
            <nav v-show="!collapsed" class="fixed right-0 top-0 bottom-0 z-30 h-screen w-8/12 p-5 bg-slate-200 text-dark-blue md:relative md:p-0 md:text-inherit md:inset-auto md:h-auto md:w-auto md:bg-transparent md:flex-1 md:justify-center" >
                <ul @click="toggleMenu" class="pt-2 flex flex-col md:flex-row gap-6">
                    <li class>
                        <router-link to="/" class>Home</router-link>
                    </li>
                    <li>
                        <router-link to="/waarom-iuvox" class>Over ons</router-link>
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

export default {
    data() {
        return {
            msg: "test",
            scrolling: false,
            iscollapsed: true,
            headerheight: 82,
            classes: {
                active: "bg-white text-dark-blue py-3 drop-shadow-lg",
                inactive: "bg-dark-blue text-white py-5"
            }
        };
    },
    mounted() {
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
            this.headerheight = this.$refs.header.clientHeight - 0.5;
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
            if(window.innerWidth < SCREEN_SIZES.md) {
                return this.iscollapsed
            } else {
                return null
            }
        }
    },
    components: { BaseOverlay }
}
</script>