<template>
    <div>
        <h1>Hello</h1>
        <nuxt-link
            :to="`/cikkek/hihetetlen-megmenekueles-a-forro-katrany-szoritasabol-20150109yo`"
        >Link</nuxt-link>
    </div>
</template>
<script>
export default {
    async asyncData({ route }) {
        console.log(route);
    },
};
</script>