<template>
    <div class="flex flex-wrap w-2/3">
        <label :for="labelFormatted" class="basis-full">
            {{label}}
            <span v-if="required" class="text-slate-800">*</span>
        </label>
        <input
            :type="inputType"
            class="peer basis-full border border-slate-200 mt-1 rounded-sm px-2 py-1 ease-linear duration-75 outline-none focus:shadow-sm" 
            :class="submitClasses('input')"
            :name="labelFormatted"
            :id="labelFormatted"
            :placeholder="placeholder"
            :required="required"
        />
        <small class="hidden" :class="submitClasses('small')">Controleer alsjeblieft dit veld. Kan een fout in zitten</small>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        required: Boolean,   
        placeholder:String,
        submitted: Boolean,
        type: String,
    },
    mounted() {
        console.log(this.slotProps)
    },
    methods: {
        submitClasses(which) {
            const classes = {
                input: 'invalid:border-red-500 invalid:shadow-md invalid:shadow-red-100',
                small: 'peer-invalid:inline'
            }
            return {
                [classes[which]]: this.submitted
            }
        },
    },
    computed: {
        labelFormatted() {
            return this.label.replace(' ','_').toLowerCase()
        },
        inputType() {
            return this.type || 'text'
        }
    }
}
</script>