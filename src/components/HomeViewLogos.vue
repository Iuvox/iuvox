<template>
    <div
        class="px-10 py-3 flex flex-nowrap overflow-x-scroll snap-x snap-mandatory gap-10 bg-slate-100 h-24 scrollbar-none"
    >
        <div v-for="partner in partners" class="flex min-w-max snap-center">
            <img
                :src="partner.logo"
                class="h-auto w-full object-contain block grayscale ease-linear duration-200 hover:grayscale-0"
            />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        partners: {
            type: Array,
            default: []
        }
    },
    mounted() {
        
    }
}
</script>