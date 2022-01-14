<template>
    <div class="mx-5">
        <h3 class="text-xl text-dark-blue font-bold">{{ title }}</h3>
        <hr class="w-full bg-orange h-1" />
        <div class="mt-2">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>