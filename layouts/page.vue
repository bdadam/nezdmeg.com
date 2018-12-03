<template>
    <div>
        <site-header/>
        <nuxt/>
        <site-footer/>
    </div>
</template>
<script>
import SiteHeader from '~/components/site-header';
import SiteFooter from '~/components/site-footer';
export default {
    components: {
        SiteHeader,
        SiteFooter,
    },
};
</script>
<style>

</style>