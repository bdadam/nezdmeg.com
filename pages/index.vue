<template>
    <div class="page-container">
        <h1>{{title}}</h1>

        <ul>
            <li v-for="article in articles" :key="article.url">
                <nuxt-link :to="article.canonicalRelative">{{article.title}}</nuxt-link>
                <p>{{article.formattedDate}}</p>
                <img :src="article.images.videoThumbnail.url">
                <div v-text="article.teaser"></div>
                <div v-html="article.content"></div>
            </li>
        </ul>
    </div>
</template>
<script>
import generateMetaTags from '~/services/generateMetaTags';

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
        return generateMetaTags({
            title: 'Nézd meg és mutasd meg másoknak is!',
            description:
                'Érdekes, látványos, megható és lélegzetelálltó történeteket gyűjtünk össze. Olvasd el és oszd meg őket!',
            canonical: 'https://nezdmeg.com/',
            image: {
                url: require('~/assets/logo.png'),
                width: 157,
                height: 60,
    },
        });
    },
};
</script>