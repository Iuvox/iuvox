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
                <CloseIcon
                    key="closeicon"
                    class="absolute w-10 text-dark-blue"
                    v-show="!collapsed"
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
            >
                <ul class="pt-2 flex justify-end flex-col md:flex-row gap-6">
                    <li v-for="item in links" class="px-4 ease duration-300">
                        <component
                            :is="'routerLink' in item ? 'router-link' : 'button'"
                            :to="item.routerLink"
                            class="text-lg font-serif font-normal"
                            @click="togglePopover(item)"
                        >{{ item.name }}</component>
                        <transition
                            enter-from-class="-translate-y-3 opacity-0"
                            leave-to-class="-translate-y-3 opacity-0"
                        >
                            <div
                                v-if="item.popoverOpen"
                                class="fixed inset-0 mt-0 flex justify-center items-center md:absolute md:inset-auto bg-slate-200 shadow-md rounded-md px-3 py-2 ease transition duration-300 md:mt-3 text-black md:-translate-x-8 z-50"
                            >
                                <div>
                                    <button @click="togglePopover(item)" class="md:hidden" >Terug</button>
                                    <router-link
                                        v-for="pop in item.popover"
                                        :to="pop.link"
                                        class="flex flex-wrap my-8 min-w-full md:my-2"
                                    >
                                        <div class="w-12 mr-2">
                                            <svg
                                                width="48"
                                                height="48"
                                                viewBox="0 0 48 48"
                                                fill="none"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width="48" height="48" rx="8" fill="#FFEDD5" />
                                                <path
                                                    d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
                                                    stroke="#FB923C"
                                                    stroke-width="2"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
                                                    stroke="#FDBA74"
                                                    stroke-width="2"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
                                                    stroke="#FDBA74"
                                                    stroke-width="2"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3>{{ pop.name }}</h3>
                                            <span>{{ pop.title }}</span>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </transition>
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
                },
                {
                    name: "Services",
                    popoverOpen: true,
                    popover: [
                        {
                            name: "Wordpress",
                            title: "Omdat het cool is",
                            description: "Toch zijn we hier heel goed in",
                            link: '/wordpress-webdevelopment'
                        },
                        {
                            name: "Vue3",
                            title: "Omdat het cool is",
                            description: "Toch zijn we hier heel goed in",
                            link: '/vue-development'
                        }
                    ]
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
        },
        togglePopover(item) {
            if ('popover' in item) {
                item.popoverOpen = !item.popoverOpen
            }
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