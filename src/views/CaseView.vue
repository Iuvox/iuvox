<template>
    <div>
        <div class="bg-dark-blue px-4 py-12 md:px-40 md:pt-52 md:pb-10">
            <div class="md:w-2/3">
                <h1 class="text-white text-4xl font-bold mb-3">{{ pagedetails.title }}</h1>
                <p
                    class="text-white text-2xl"
                    v-if="pagedetails.description"
                >{{ pagedetails.description }}</p>
            </div>
            <div v-if="accomplishmentsExists" class="bg-slate-100 md:w-1/3 mt-10 rounded-md px-4 py-3 shadow-2xl">
                <h2 class="text-2xl font-bold text-dark-blue">Wat hebben wij bereikt?</h2>
                <ul>
                    <li v-for="accomplishment in getcase.accomplishments">
                        <Check />
                        {{ accomplishment.accomplishment }}
                    </li>
                </ul>
            </div>
        </div>
        <CaseViewSection
            :title="'Over ' + pagedetails.title"
            :html="getcase.over"
        >
            <template #addition>
                <h3>diensten</h3>
                <router-link
                    v-for="usedService in getcase.used_services"
                    :to="{ name: 'Serviceitem', params: { slug: usedService.services_id.pagedetails.slug } }"
                    class="text-slate-500 hover:text-dark-blue mr-2"
                >{{ usedService.services_id.shorttitel }}</router-link>
            </template>
        </CaseViewSection>
        <section class="flex justify-center px-4 py-12 md:py-20 bg-dark-blue text-white" v-if="checkQuote(0)">
            <div class="text-xl md:w-1/2 text-center">
                <span class="font-serif italic">"</span>
                {{ getcase.quotes[0].quote }}
                <span class="font-serif italic">"</span>
            </div>
        </section>
        <CaseViewSection
            title="De uitdaging"
            :html="getcase.uitdagingen"
        >
        </CaseViewSection>
        <section class="flex justify-center px-4 py-12 md:py-20 bg-dark-blue text-white" v-if="checkQuote(1)">
            <div class="text-xl md:w-1/2 text-center">
                <span class="font-serif italic">"</span>
                {{ getcase.quotes[1].quote }}
                <span class="font-serif italic">"</span>
            </div>
        </section>
        <CaseViewSection
            title="Het Resultaat"
            :html="getcase.resultaat"
        >

        </CaseViewSection>
        <section class="py-5 px-8 md:py-10 md:px-40 md:w-2/3">
            <div class="flex flex-wrap md:flex-nowrap items-center gap-5 md:gap-10">
                <div>
                    <img
                        class="rounded-full w-1/2 md:w-full m-auto"
                        :src="`https://admin.iuvox.nl/assets/${headshot.directus_files_id.id}?width=400&height=400&fit=cover`"
                        :alt="headshot.directus_files_id.title"
                    />
                </div>
                <div>
                    <h2 class="text-2xl text-dark-blue">Hoe kunnen we jou verder helpen?</h2>
                    <p>Kunnen we jouw misschien met verder helpen met een van onze services? Of ben je benieuwd naar mogelijke kansen? Neem dan snel contact op, dan gaan wij samen even vrijblijvend bellen</p>
                    <p>Klik hieronder om direct contact op te nemen met Joep</p>
                    <BaseButton tag="button" protectedHref="tel:+31649203503" class="mt-2">Bel Joep</BaseButton>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { useMain } from "../store/main"
import { Check } from "lucide-vue-next"
import BaseButton from "../components/BaseButton.vue"
import { getRandomHeadshot } from "../plugins/composables/RandomHeadshot"
import CaseViewSection from "../components/CaseViewSection.vue"

export default {
    setup() {
        const main = useMain()
        const headshot = getRandomHeadshot()
        return {
            main, headshot
        }
    },
    async serverPrefetch() {
        const res = await this.setCase()

    },
    mounted() {
        this.setCase()
    },
    methods: {
        setCase() {
            return this.main.setCase(this.$route.params.case)
        },
        checkQuote(index) {
            try {
                this.getcase.quotes[index]
                return true
            } catch (err) {
                return false
            }
        }
    },
    computed: {
        getcase() {
            return this.main.getCase(this.$route.params.case)
        },
        pagedetails() {
            return this.$route.meta
        },
        accomplishmentsExists() {
            try {
                return getcase.accomplishments.length > 0
            } catch (err) {
                return false
            }
        }
    },
    components: { Check, BaseButton, CaseViewSection }
}
</script>

<style>
#about p:not(:last-child) {
    margin-bottom: 10px;
}
</style>