<template>
    <div class="relative flex justify-center items-center" :style="heightClass">
        <div v-for="(image, key) in images" :key="key" class="absolute ease-in duration-500 " :class="animate(key)" >
            <slot name="loop" :image="image">
                <a :href="image.link">
                    <div class="bg-white grow-0 rounded-full m-auto p-4 basis-full flex shadow-md shadow-slate-400 h-40 w-40" :style="childHeightClass">
                        <img :src="image.imglink" :alt="image.name" class="w-full h-full">
                    </div>
                    <!-- <div>
                        <h4 class="text-white text-4xl text-center">{{image.name}}</h4>
                    </div> -->
                </a>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            interval: null,
            whichimage: 0,
        }
    },
    props: {
        images: Array,
        height: Number,
        duration: Number
    },
    mounted() {
        this.startSlider(this.duration)
    },
    beforeDestroy() {
        this.killSlider()
    },
    methods: {
        startSlider(ms = 2000) {
            this.interval = setInterval(() => {
                this.whichimage = (this.images.length === (this.whichimage + 1) ) ? 0 : this.whichimage + 1
            }, ms);
        },
        killSlider() {
            if(this.interval) {
                clearInterval(this.interval)
            }
        },
        animate(key) {
            const classes = {
                'opacity-0': (key !== this.whichimage),
                'opacity-1 z-10': (key === this.whichimage)
            }
    	    return classes 
        }
    },
    computed: {
        heightClass() {
            return {
                height: this.height + 'rem',
                width: this.height + 'rem'
            }
        },
        childHeightClass() {
            return {
                height: (this.height - 4) + 'rem',
                width: (this.height - 4) + 'rem'
            }
        }
    }
}

</script>