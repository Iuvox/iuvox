<template>
    <li v-for="item in items" class="px-4 ease duration-300" >
        <div class="text-lg font-serif font-normal">
            <router-link
                v-if="'routerLink' in item"
                @click="closePopovers()"
                :to="item.routerLink"
            >{{ item.name }}</router-link>
            <button v-else @click="togglePopover(item)">{{ item.name }}</button>
        </div>

        <transition
            enter-from-class="-translate-y-3 opacity-0"
            leave-to-class="-translate-y-3 opacity-0"
        >
            <div
                v-if="item.popoverOpen"
                ref="popover"
                class="fixed inset-0 mt-0 flex justify-center items-center h-screen md:h-auto md:absolute md:inset-auto md:right-0 bg-slate-200 shadow-md rounded-md px-3 py-2 ease transition duration-300 md:mt-3 text-black md:-translate-x-8 z-50"
            >
                <div class="md:flex">
                    <button @click="togglePopover(item)" class="md:hidden">Terug</button>
                    <div v-for="section in item.popover" class="w-72">
                        <h3 class="font-bold">{{ section.category }}</h3>
                        <router-link
                            v-for="pop in section.items"
                            :to="{ name: 'Service', params: { slug: pop.pagedetails.slug } }"
                            class="grid grid-cols-5 items-center min-w-full md:p-3 ease duration-150 rounded-md hover:bg-slate-100"
                            @click="togglePopover(item)"
                        >
                            <div class="col-span-1">
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
                            <div class="col-span-4">
                                <h3>{{ pop.shorttitel }}</h3>
                                <span>{{ pop.shortdescription }}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </transition>
    </li>
</template>

<script setup>import { watch } from 'vue';


const props = defineProps({
    items: {
        type: Object,
        required: true
    },
    closeAll: {
        type: Boolean,
        default: false
    }
})

const closePopovers = () => {
    Object.keys(props.items).forEach(el => {
        const val = props.items[el]
        if ('popover' in val) {
            val.popoverOpen = false
        }
    })
}

watch(() => props.closeAll, () => {
    closePopovers()
})

const togglePopover = (menuItem) => menuItem.popoverOpen = !menuItem.popoverOpen

</script>
