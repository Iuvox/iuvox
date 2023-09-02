<template>
    <div
        ref="particles_component"
        >
        <ParticlesComponent
            v-if="isMounted"
            id="tsparticles"
            :particlesInit="particlesInit"
            :particlesLoaded="particlesLoaded"
            :options="props.options"
            class="h-full"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref,watch } from "vue";
import { useElementVisibility } from '@vueuse/core'
import * as __particles from 'vue3-particles'
import { loadSlim } from "tsparticles-slim";

const { ParticlesComponent } = __particles

const particles= ref(false)

const particles_component = ref(null)
const particlesVisible = useElementVisibility(particles_component)

watch(particlesVisible, (newValue, oldValue) => {
    if(particles.value !== false) {
        if(newValue) {
            particles.value.play() 
        } else {
            particles.value.pause()
        }
    }
});

const particlesLoaded = async (container) => {
    particles.value = container
}
const particlesInit = async (engine) => {
    await loadSlim(engine);
}

// Unfortunately need to do this because of hydration errors in production
const isMounted = ref(false)
onMounted(() => (isMounted.value = true))

const props = defineProps({
    options: {}
})

</script>
