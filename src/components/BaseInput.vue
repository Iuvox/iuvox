<template>
    <div class="flex flex-wrap">
        <label :for="labelFormatted" class="basis-full">
            {{ label }}
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
        <small
            class="hidden"
            :class="submitClasses('small')"
        >Controleer alsjeblieft dit veld. Kan een fout in zitten</small>
    </div>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
    label: String,
    required: Boolean,
    placeholder: String,
    submitted: Boolean,
    type: String
})

const submitClasses = (which) => {
    const classes = {
        input: "invalid:border-red-500 invalid:shadow-sm invalid:shadow-red-100",
        small: "peer-invalid:inline peer-invalid:text-red-500"
    };
    return {
        [classes[which]]: props.submitted
    };
}

const labelFormatted = computed(() => {
    return props.label.replace(" ", "_").toLowerCase();
})

const inputType = computed(() => {
    return props.type || "text";

})

</script>
