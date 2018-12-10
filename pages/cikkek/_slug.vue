<template>
    <div class="page-container">
        <article class="main-content">
            <h1 class="article-title">{{ title }}</h1>
            <p>{{ formattedDate }}</p>
            <share-buttons class="share-buttons" :title="title" :url="canonical"/>
            <div v-text="teaser" class="article-teaser"></div>
            <ast-renderer class="article-body" :ast="ast"/>

            <p v-if="tags && tags.length > 0">
                <svg class="icon-tags">
                    <path
                        d="M7 7c0-1.109-0.891-2-2-2s-2 0.891-2 2 0.891 2 2 2 2-0.891 2-2zM23.672 16c0 0.531-0.219 1.047-0.578 1.406l-7.672 7.688c-0.375 0.359-0.891 0.578-1.422 0.578s-1.047-0.219-1.406-0.578l-11.172-11.188c-0.797-0.781-1.422-2.297-1.422-3.406v-6.5c0-1.094 0.906-2 2-2h6.5c1.109 0 2.625 0.625 3.422 1.422l11.172 11.156c0.359 0.375 0.578 0.891 0.578 1.422zM29.672 16c0 0.531-0.219 1.047-0.578 1.406l-7.672 7.688c-0.375 0.359-0.891 0.578-1.422 0.578-0.812 0-1.219-0.375-1.75-0.922l7.344-7.344c0.359-0.359 0.578-0.875 0.578-1.406s-0.219-1.047-0.578-1.422l-11.172-11.156c-0.797-0.797-2.312-1.422-3.422-1.422h3.5c1.109 0 2.625 0.625 3.422 1.422l11.172 11.156c0.359 0.375 0.578 0.891 0.578 1.422z"
                    ></path>
                </svg>
                Cimkék: {{tags.join(', ')}}
            </p>
            <share-buttons class="share-buttons" :title="title" :url="canonical"/>
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
                            :style="{ backgroundImage: `url(${recommendation.images.video.url})`}"
                        />
                        <p class="article-recommendation__title">{{ recommendation.title }}</p>
                    </nuxt-link>
                </li>
            </ul>
        </aside>

        <script type="application/ld+json" v-html="JSON.stringify(jsonld)"></script>
    </div>
</template>
<script>
import generateMetaTags from '~/services/generateMetaTags';
import { pageview } from '~/services/tracking';

import AstRenderer from '~/components/ast-renderer';
import ShareButtons from '~/components/share-buttons';

export default {
    layout: 'page',
    data() {
        return {
            title: '',
            description: '',
            url: '',
            teaser: '',
            content: '',
            formattedDate: '',
            ast: {},
            recommendations: [],
            images: {},
            tags: [],
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
            return `https://nezdmeg.com${this.url}`;
        },
        jsonld() {
            return {
                '@context': 'http://schema.org',
                '@type': 'NewsArticle',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': this.canonical,
                },
                headline: this.title,
                image: [`https://nezdmeg.com/${this.images.video.url}`],
                // datePublished: '2015-02-05T08:00:00+08:00',
                // dateModified: '2015-02-05T09:20:00+08:00',
                // author: {
                //     '@type': 'Person',
                //     name: 'John Doe',
                // },
                // publisher: {
                //     '@type': 'Organization',
                //     name: 'Google',
                //     logo: {
                //         '@type': 'ImageObject',
                //         url: 'https://google.com/logo.jpg',
                //     },
                // },
                description: this.description || this.teaser,
            };
        },
    },
    mounted() {
        pageview();
    },
    head() {
        return generateMetaTags({
            title: this.title,
            description: this.description || this.teaser,
            canonical: this.canonical,
            image: this.images.video,
        });
    },
    components: {
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
    // margin: 24px 0 12px;
    // margin: 0 0 12px;
    margin-bottom: 16px;
}

.article-teaser {
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
    p,
    .video-player {
        margin-bottom: 12px;
    }
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

.icon-tags {
    width: 30px;
    height: 28px;
    fill: #333;
    display: inline-block;
    vertical-align: middle;
}
</style>
