<template>
    <div class="page-container">
        <div class="main-content">
            <h1 class="headline-1">Impresszum</h1>
            <p>A nezdmeg.com egy privát jellegű weboldal, melyet a készítők saját maguk és barátaik számára készítenek. A használata bárki számára engedélyezett, de csak saját felelősségre.</p>

            <div class="contact-form" style="display: none;">
                <h2 class="headline-2">Kapcsolat</h2>
                <contact-form/>
            </div>

            <!-- <h2>Kapcsolat</h2>
        <p>
            Amennyiben fel szeretnéd venni velünk a kapcsolatot, az alábbi e-mail címen rendelkezésedre állunk:
            kontakt@nezdmeg.com
            </p>-->
            <!-- <h2>Cookiek használata</h2>
            <p>Az oldal cookiekat használ a működéséhez.</p>-->
        </div>
    </div>
</template>
<script>
import ContactForm from '~/components/contact-form';

import { pageview } from '~/services/tracking';

export default {
    layout: 'page',
    mounted() {
        pageview();
    },
    head: {
        title: 'Impresszum - NezdMeg.com',
        meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
    },
    components: {
        ContactForm,
    },
};
</script>

<style lang="scss" scoped>
.contact-form {
    max-width: 800px;
    margin: 20px auto;
}
</style>
