<template>
    <section v-for="case_ in getCases" class="flex py-10 w-3/4 m-auto gap-10">
        <div class="w-1/4">
            <div class="w-[400px] h-[200px]">
                <img
                    class="w-full h-full object-contain"
                    :src="`https://admin.iuvox.nl/assets/${case_.logo}?width=400&height=200&fit=inside&format=webp`"
                />
            </div>
        </div>
        <div class="w-3/4">
            <h3 class="text-secondary font-semibold">{{ case_.pagedetails.title }}</h3>
            <h2 class="font-bold text-xl mt-2">{{ case_.pagedetails.description }}</h2>
            <ul class="my-4">
                <li v-for="accomplishment in case_.accomplishments">
                    <Check />
                    {{ accomplishment.accomplishment }}
                </li>
            </ul>
            <BaseButton
                tag="router-link"
                :to="{ name: 'Case', params: { case: case_.pagedetails.slug } }"
            >Ga naar Case ></BaseButton>
        </div>
    </section>
</template>

<script>
import { api } from "../plugins/api"
import { useMain } from "../store/main"
import { Check } from "lucide-vue-next"
import BaseButton from "../components/BaseButton.vue"

export default {
    setup() {
        const main = useMain()
        return {
            main
        }
    },
    async serverPrefetch() {
        return await this.setCases()
    },
    mounted() {
        this.setCases()
    },
    methods: {
        setCases() {
            return this.main.setCase()
        }
    },
    computed: {
        getCases() {
            return this.main.getAllCases
        }
    },
    components: {
        Check,
        BaseButton
    }
}
</script>