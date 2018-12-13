<template>
    <div class="page-container">
        <div class="main-content">
            <h1 class="headline-1">A nezdmeg.com oldalról</h1>

            <h2 class="headline-2">Impresszum</h2>
            <p>A nezdmeg.com egy privát jellegű weboldal, melyet a készítők saját maguk és barátaik számára készítenek. A használata bárki számára engedélyezett, de csak saját felelősségre.</p>

            <h2 class="headline-2" id="contact-form">Kapcsolat</h2>
            <p>
                Szívesen fogadunk minden nemű visszajezést, kérést és kérést. Választ és válaszidőt sajnos nem áll módunkban garantálni.
                Amennyiben fel szeretnéd venni velünk a kapcsolatot, kérlek töltsd ki az alábbi mezőket.
            </p>

            <contact-form class="contact-form"/>

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
h2 {
    margin: 20px 0 10px;
}
.contact-form {
    max-width: 800px;
    margin: 20px auto;
}
</style>
