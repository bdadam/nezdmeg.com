<template>
    <div>
        <h1>{{title}}</h1>
        <p>{{formattedDate}}</p>
        <div v-text="teaser"></div>
        <div v-html="content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return { title: 'title', teaser: 'teaser', content: 'content', formattedDate: '0000-00-00' };
    },
    async asyncData({ route, payload }) {
        console.log(route);
        if (payload) {
            return payload;
        }

        if (process.server) {
            return eval(`JSON.parse(require("fs").readFileSync("static/data${route.path}.json", "utf-8"))`);
        }

        if (process.client) {
            return fetch(`/data${route.path}.json`).then(x => x.json());
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