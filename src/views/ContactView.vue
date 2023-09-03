<template>
    <div class="px-3 flex justify-center items-center" :style="cusstyle">
        <div class="md:w-1/2 md:py-10">
            <h1 class="font-serif text-3xl font-semibold text-white">Ontmoet ons!</h1>
            <div class="p-5 shadow-lg bg-slate-100 rounded-sm flex justify-center">
                <BaseForm @submitted="handleSubmit($event)" class="w-3/4 relative">
                    <template v-slot:input="input">
                        <BaseInput
                            :submitted="input.submitted"
                            label="Je Naam"
                            placeholder="Joep Buhre"
                            :required="false"
                        />
                        <BaseInput
                            :submitted="input.submitted"
                            label="E-mail"
                            placeholder="joep@iuvox.nl"
                            class="mt-3"
                            :required="false"
                            type="email"
                        />
                        <BaseInput
                            :submitted="input.submitted"
                            label="Je Telefoonnummer"
                            placeholder="+31649203503"
                            :required="false"
                            type="tel"
                        />
                        <BaseInput
                            :submitted="input.submitted"
                            label="Je Bedrijf"
                            placeholder="Iuvox"
                            class="mt-3"
                        />
                    </template>
                    <template v-slot:submit="submit">
                        <BaseButton type="submit" class="mt-3">Verstuur</BaseButton>
                    </template>
                    <template v-slot:popup>
                        <transition
                            enter-from-class="opacity-0"
                            leave-to-class="opacity-0"
                            enter-active-class="transition duration-300"
                            leave-active-class="transition duration-300">
                            <div
                                v-if="send"
                                class="absolute inset-0  flex justify-center items-center" >
                                <div class="flex justify-center items-center p-12 w-full bg-dark-blue bg-opacity-80 text-white font-bold rounded-md"  >
                                    Succesvol verstuurd
                                </div>
                            </div>
                        </transition>
                    </template>
                </BaseForm>
            </div>
        </div>
    </div>
    <div class="px-3 flex justify-center pb-20">
        <div class="mt-4 md:flex gap-5 md:w-1/2 md:py-10 md:mt-0">
            <div><h4 class="font-serif text-2xl font-semibold text-dark-blue">Liever ons direct bereiken?</h4>
            <p>Telefoon: +31 (0)6 49 203 503</p>
            <p>Email: joep@iuvox.nl</p></div>
    <div>
                    <h5 class="font-serif text-2xl font-semibold text-dark-blue mt-3 md:mt-0">Onze Bedrijfsgegevens</h5>
            <p>KVK: 78090911</p>
            <p>BTWNR: NL003285037B49</p>

    </div>
</div>
    </div>
</template>

<script>
import BaseForm from "../components/BaseForm.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import { api } from "../plugins/api";



export default {
    data() {
        return {
            send: false,
            cusstyle: {
                background: 'linear-gradient(#0d1173, #0d1173 50%, white 50%)',
                minHeight: '40vh'
            },
            animateSendClass: {

            }
        }
    },
    methods: {
        handleSubmit(e) {
            if (e.valid) {
                const submitinputs = e.event.target.elements
                api.post('/items/contact_requests', {
                    naam: submitinputs.je_naam,
                    email: submitinputs['e-mail'],
                    bedrijf: submitinputs.je_bedrijf,
                    telefoonnummer: submitinputs.je_telefoonnummer
                }).then(res => {
                    this.send = true
                    console.log(res)
                })
            }

            setTimeout(() => {
                this.send = false
            }, 3000);
            console.log(e)
        }
    },
    computed: {
        animateSend() {
            return this.send ? this.animateSendClass : ''
        },
    },
    components: { BaseForm, BaseInput, BaseButton }
}
</script>