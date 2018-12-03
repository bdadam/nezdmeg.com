<template>
    <div class="page-container">
        <h1>{{title}}</h1>

        <ul>
            <li v-for="article in articles" :key="article.url">
                <nuxt-link :to="article.canonicalRelative">{{article.title}}</nuxt-link>
                <p>{{article.formattedDate}}</p>
                <div v-text="article.teaser"></div>
                <div v-html="article.content"></div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    layout: 'page',
    data() {
        return { title: 'Home Page', articles: [] };
    },
    async asyncData({ route, payload }) {
        if (payload) {
            return payload;
        }

        if (process.server) {
            return eval(`JSON.parse(require("fs").readFileSync("static/data/index.json", "utf-8"))`);
        }

        if (process.client) {
            return fetch(`/data/index.json`).then(x => x.json());
        }
    },
    head() {
        return {
            title: this.title,
            meta: [{ property: 'og:site_name', content: 'Nézd meg!' }, { property: 'og:locale', content: 'hu_HU' }],
        };
    },
};
</script>