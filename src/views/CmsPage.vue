<template>
<h1>Test</h1>
<pre>
{{$route}}

</pre>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.params)
    }
}
</script>