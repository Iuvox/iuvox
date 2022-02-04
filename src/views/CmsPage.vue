<template>
    <div id="cmspage" class="md:px-96 py-24">
        <h1>{{page.title}}</h1>
        
        <p v-html="page.content"></p>
        
    </div>
</template>

<script>
import { api } from "../plugins/api"

export default {
    data() {
        return {
            page: {}
        }
    },
    beforeRouteEnter(to, from, next) {
        api.get(`/items/pages?filter[slug][_eq]=${to.params.slug}`).then(res => {
            console.log(res)
            next(data => data.page = res.data.data[0])
        })
    }
}
</script>

<style>
#cmspage h1, #cmspage h2, #cmspage h3,#cmspage h4,#cmspage h5,#cmspage h6 {
    @apply font-semibold font-serif text-dark-blue mt-3
}
#cmspage h1 {
    @apply text-5xl
}

#cmspage h2 {
    @apply text-2xl
}
</style>