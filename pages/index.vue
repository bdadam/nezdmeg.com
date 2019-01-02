<template>
    <div class="page-container">
        <div class="main-content">
            <h1 class="page-title">Cikkek és videok, amelyeket érdemes megnézni</h1>
            <ul class="article-list">
                <li v-for="article in articles" :key="article.url" class="article-list__item">
                    <nuxt-link :to="article.url" :title="article.title" class="article-list__link">
                        <div class="article-list__image-container">
                            <div
                                class="article-list__image"
                                :style="{backgroundImage: `url(${article.images.videoThumbnail.url})`}"
                            ></div>
                        </div>
                        <div class="article-list__details">
                            <h2 class="title">{{article.title}}</h2>
                            <p class="teaser" v-text="article.teaser"></p>
                            <!-- <p>{{article.formattedDate}}</p> -->
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="sidebar">
            <div class="sidebar-box">
                <like-box/>
            </div>
        </div>
    </div>
</template>
<script>
import generateMetaTags from '~/services/generateMetaTags';
import { pageview } from '~/services/tracking';

import LikeBox from '~/components/like-box';

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
    mounted() {
        pageview();
    },

    head() {
        return generateMetaTags({
            title: 'Nézd meg és mutasd meg másoknak is!',
            description:
                'Érdekes, látványos, megható és lélegzetelálltó történeteket gyűjtünk össze. Olvasd el és oszd meg őket!',
            canonical: 'https://nezdmeg.com/',
            image: {
                url: require('~/static/logo_big.png'),
                width: 1045,
                height: 1045,
            },
        });
    },
    components: {
        LikeBox,
    },
};
</script>

<style lang="scss" scoped>
.page-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 20px;
    background-color: #f1f1f1;
    margin: -20px -20px 20px -20px;
    padding: 20px;
}

.article-list__item {
    border-bottom: 1px dotted #ccc;
    padding: 32px 0;

    &:first-child {
        padding-top: 0;
    }
}

.article-list__link {
    color: #333;
    text-decoration: none;

    &:hover,
    &:active {
        .title {
            text-decoration: underline;
        }
    }

    @media (min-width: 1024px) {
        display: flex;
        flex-direction: row;
    }
}

.article-list__image {
    background-size: cover;
    background-position: center;
    padding-top: 40%;

    @media (min-width: 1024px) {
        padding-top: 56.25%;
    }
}

.article-list__details {
    margin-top: 24px;

    .title {
        font-weight: 600;
        letter-spacing: 0.015em;
        font-size: 1.25rem;
        line-height: 1.2;
        margin-bottom: 8px;
    }
}

@media (min-width: 768px) {
    .article-list__link {
        display: flex;
        flex-direction: row;
    }

    .article-list__image-container {
        flex: 1;
        margin-bottom: 0;
    }

    .article-list__image {
        padding-top: 56.25%;
    }

    .article-list__details {
        flex: 3;
        margin-top: 0;
        margin-left: 24px;
    }
}
</style>
