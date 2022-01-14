<template>
    <img 
    :src="src" 
    class="absolute inset-0 object-cover object-center w-full h-full pointer-events-none -z-10"
    alt />
</template>

<script>
export default {
    props: {
        src: String
    }
}
</script>