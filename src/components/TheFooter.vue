<template>
    <footer
        class="bg-gray-50 h-min-96 py-10 gap-3 shadow-slate-600 shadow-2xl z-10 md:px-30 grid md:grid-cols-3 md:px-32 2xl:px-52"
    >
        <TheFooterCol title="Koffie drinken?">
            <p>
                Joep praat graag met je wat wij kunnen betekenen voor jou! Hij is de eigenaar van Iuvox. Hij is te bereiken op
                <BaseLink protected href="tel:+31649203503">06 49 203 503</BaseLink> of via de mail op
                <BaseLink protected href="mailto:joep@iuvox.nl">joep@iuvox.nl</BaseLink>. Tot snel!
            </p>
        </TheFooterCol>
        <TheFooterCol title="Ontdek">
            <ul>
                <li>
                    <router-link to="/home">Home</router-link>
                </li>
                <li>
                    <router-link to="/contact-iuvox">Contact</router-link>
                </li>
                <li>
                    <router-link to="/waarom-iuvox">Waarom Iuvox?</router-link>
                </li>
            </ul>
        </TheFooterCol>
        <TheFooterCol title="Koffie drinken?">
            <p>
                <strong>KVK:</strong>78090911
            </p>
            <p>
                <strong>BTWNR:</strong>NL003285037B49
            </p>
            <ul>
                <li>
                    <BaseLink tag="router-link" to="/algemene-voorwaarden">Algemene Voorwaarden</BaseLink>
                </li>

                <li>
                    <BaseLink router-link to="/disclaimer">Disclaimer</BaseLink>
                </li>
                <li>
                    <BaseLink router-link to="/privacy-policy">Privacy Policy</BaseLink>
                </li>
            </ul>
        </TheFooterCol>
    </footer>
</template>

<script>
import TheFooterCol from "./TheFooterCol.vue";
import BaseLink from "./BaseLink.vue";
export default {
    components: { TheFooterCol, BaseLink }
}
</script>

<style>
footer li {
    margin: 6px 0px
}
</style>