<template>
    <ParticlesComponent
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="props.options"
    />
</template>

<script setup>
import { loadSlim } from "tsparticles-slim";
import { ParticlesComponent } from "vue3-particles";


const particlesLoaded = async (container) => {
    console.log("Particles container loaded", container);
}
const particlesInit = async (engine) => {
    await loadSlim(engine);
}

const props = defineProps({
    options: {}
})

</script>
