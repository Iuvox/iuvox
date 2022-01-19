<template>
    <footer
        class="bg-gray-50 h-96 py-10 px-52 md:px-30 grid grid-cols-3 shadow-slate-600 shadow-2xl z-10"
    >
        <TheFooterCol title="Koffie drinken?">
            <p>
                Wij nodigen je graag uit voor een kopje koffie of thee! Wij zijn te bereiken op
                <BaseLink href="tel:+31649203503">06 49 203 503</BaseLink> of via de mail op
                <BaseLink href="mailto:joep@mercesmarketing.nl">info@mercesmarketing.nl</BaseLink>. Tot snel!
            </p>
        </TheFooterCol>
        <TheFooterCol title="Ontdek">
            <ul>
                <li v-for="i in 3">
                    <router-link to="about-us">Aboutus</router-link>
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
                    <BaseLink router-link to="algemene-voorwaarden">Algemene Voorwaarden</BaseLink>
                </li>

                <li>
                    <BaseLink router-link to="disclaimer">Disclaimer</BaseLink>
                </li>
                <li>
                    <BaseLink router-link to="privacy-policy">Privacy Policy</BaseLink>
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