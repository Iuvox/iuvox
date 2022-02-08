<template>
    <div id="cmspage" class="md:px-96 py-24">
        <h1>{{ page.title }}</h1>

        <div v-html="page.content"></div>
    </div>
</template>

<script>
import { api } from "../plugins/api"
import { useMain } from "../store/main"

export default {
    setup() {
        const main = useMain()
        return {
            main
        }
    },
    async serverPrefetch() {
        const main = useMain(this.$pinia)
        const res = await main.setCmsPage(this.$route.params.slug)
        return res
    },
    computed: {
        page() {
            return this.main.CmsPage[this.$route.params.slug]
        }
    }
}
</script>

<style lang="postcss" >
#cmspage h1,
#cmspage h2,
#cmspage h3,
#cmspage h4,
#cmspage h5,
#cmspage h6 {
    @apply font-semibold font-serif text-dark-blue mt-3;
}
#cmspage h1 {
    @apply text-5xl;
}

#cmspage h2 {
    @apply text-2xl;
}
</style>