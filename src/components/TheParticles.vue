<template>
    <!-- <ParticlesComponent
        ref="particles_component"
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="props.options"
    /> -->
    <div id="tsparticles">

    </div>
</template>

<script setup>
import { onMounted, ref,watch } from "vue";
import { useElementVisibility } from '@vueuse/core'
import { tsParticles } from "tsparticles";


onMounted(async () => {
    console.log(' hii')

    await tsParticles.load({
        id: "tsparticles",
        options: props.options  ,
    });
})

const particles= ref(false)

// const particles_component = ref(null)
// const particlesVisible = useElementVisibility(particles_component)
// watch(particlesVisible, (newValue, oldValue) => {
//     if(particles.value !== false) {
//         if(newValue) {
//             console.log('Particles start')
//             particles.value.start() 
//         } else {
//             console.log('Particles stop')
//             particles.value.stop()
//         }
//     }
// });

const particlesLoaded = async (container) => {
    console.log("Particles container loaded", container);
    particles.value = container
}
const particlesInit = async (engine) => {
    await loadSlim(engine);
}

const props = defineProps({
    options: {}
})

</script>
