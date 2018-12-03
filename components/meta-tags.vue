<template></template>

<script>
// Test on: https://cards-dev.twitter.com/validator
export default {
    props: ['title', 'canonical', 'text', 'description'],
    head() {
        return {
            title: `${this.title} | NezdMeg.com`,
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                { property: 'og:title', content: this.title },
                { property: 'og:description', content: this.description },
                { property: 'og:url', content: this.canonical },
                { property: 'og:site_name', content: 'Nézd meg!' },
                { property: 'og:locale', content: 'hu_HU' },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: '@ TODO' },
            ],
        };
    },
};
</script>
