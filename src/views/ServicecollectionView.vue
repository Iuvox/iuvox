<template>
    <div>
        <div class="bg-dark-blue px-3 pt-10 pb-32 md:px-36 md:py-40 md:flex">
            <div>
                <h2 class="text-xl text-secondary font-semibold">Al onze services op 1 plek</h2>
                <h1
                    class="text-4xl text-white font-semibold"
                >Wat kunnen wij kunnen betekenen voor jullie</h1>
            </div>
        </div>
        <div class="md:px-36 md:py-5 md:w-2/3">
            <section v-for="section in sections" class="py-5 px-3" id="overview">
                <h2 class="font-bold text-4xl text-dark-blue">{{section.title}}</h2>
                <p class="text-xl" v-html="section.body"></p>
                <router-link to="/" class="flex items-center font-bold text-dark-blue mt-5 hover:text-secondary ease">Leer meer over {{section.title}} <ChevronIconRight class="w-6" />  </router-link>
            </section>
        </div>
    </div>
</template>

<script>
import ChevronIconRight from "../plugins/icons/ChevronIconRight.vue"
export default {
    data() {
        return {
            sections: [
                {
                    title: "Al onze diensten",
                    body: "Een opsomming van al onze diensten. Alles van Webdevelopment tot en met Data analyse en op maat oplossingen.",
                },
                {
                    title: "Webdevelopment",
                    body: "Toch nog iets anders dan alleen development. Webdevelopment gaat over, zoals de naam zegt, het web. Alles wat je als persoon kan zien, naartoe kan navigeren beschouwen we als webdevelopment. Hier kunnen we gaan kijken naar toepassingen voor jullie zoals: <ul><li>Vue Webdevelopment</li><li>Wordpress Webdevelopment</li></ul>"
                },
                {
                    title: "Development",
                    body: "Het 'lastige' stukje development. Hier gaan we vooral zitten op backend development. Denk aan de vragen <ul><li>Hoe wordt data opgehaald?</li><li>Hoe verwerken we de data</li><li>Hoe praat de voorkant met de achterkant van de website?</li></ul> Allemaal interessante vraagstukken. Hier is eigenlijk nooit een eenduidig antwoord op te zetten."
                },
                {
                    title: "Data-Analyse",
                    body: "Denk maar is bij jezelf na. Hoe vaak maak je een beslissing op basis van feiten en hoe vaak op bsis van je onderbuik gevoel. Elke ondernemer heeft dat onderbuikgevoel, anders ben je geen ondernemer ;). Hoe mooi zou het kunnen zijn als je deze beslissingen sneller, beter en accurater kan maken? Daar gaat Data-Analyse over. Hoe verwerken we de Data. Hoe kunnen we het beste sturen op data?"
                }
            ]
        };
    },
    mounted() {
        console.log(this.$route);
    },
    methods: {},
    components: { ChevronIconRight }
}
</script>
<style lang="postcss">
#overview ul {
    @apply marker:text-dark-blue list-disc pl-5 my-2;
}
</style>