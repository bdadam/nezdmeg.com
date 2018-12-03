<template>
    <div class="page-container">
        <div class="article-container">
            <article class="main-content">
                <h1 class="article-title">{{ title }}</h1>
                <p>{{ formattedDate }}</p>
                <share-buttons class="share-buttons" :title="title" :url="canonical"/>
                <div v-text="teaser" class="article-teaser"></div>
                <ast-renderer class="article-body" :ast="ast"/>

                <meta-tags
                    :title="title"
                    :canonical="canonical"
                    :description="description || teaser"
                />
            </article>
            <aside class="sidebar">
                <ul>
                    <li v-for="recommendation in recommendations" :key="recommendation.title">
                        <nuxt-link
                            :to="recommendation.url"
                            :title="recommendation.title"
                            class="article-recommendation"
                        >
                            <p
                                class="article-recommendation__image"
                                :style="{ backgroundImage: `url(${recommendation.image})`}"
                            />
                            <p class="article-recommendation__title">{{ recommendation.title }}</p>
                        </nuxt-link>
                    </li>
                </ul>
            </aside>
        </div>
    </div>
</template>
<script>
import TwitterCard from '~/components/twitter-card';
import MetaTags from '~/components/meta-tags';
import AstRenderer from '~/components/ast-renderer';
import ShareButtons from '~/components/share-buttons';

export default {
    layout: 'page',
    data() {
        return {
            title: '',
            description: '',
            teaser: '',
            content: '',
            formattedDate: '',
            ast: {},
            recommendations: [],
        };
    },
    async asyncData({ route, payload }) {
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
    computed: {
        canonical() {
            return `https://nezdmeg.com${this.canonicalRelative}`;
        },
    },
    components: {
        TwitterCard,
        MetaTags,
        AstRenderer,
        ShareButtons,
    },
};
</script>
<style lang="scss">
.article-title {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.25;
    margin: 24px 0 12px;
}

.article-teaser {
    font-size: 1.125rem;
    margin: 12px 0;
}

.share-buttons {
    padding: 20px 0;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    margin-top: 16px;
    margin-bottom: 16px;
}

.article-body {
    font-size: 1.125rem;

    p,
    .video-player {
        margin-bottom: 12px;
    }
}

.article-container {
    display: flex;
    flex-direction: row;
}

.main-content {
    flex: 4;
}

.sidebar {
    flex: 1;
    padding: 24px 40px;
}

.article-recommendation {
    display: block;
    color: #333;
    text-decoration: none;
    margin-bottom: 16px;
    // background-color: #f1f1f1;
    border-radius: 3px;
    overflow: hidden;

    &:hover,
    &:active {
        text-decoration: underline;
    }
}

.article-recommendation__image {
    padding-top: 56.25%;
    background-position: center;
    background-size: cover;
}

.article-recommendation__title {
    font-weight: bold;
    padding: 8px 0;
}
</style>
