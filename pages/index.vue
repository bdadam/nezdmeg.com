<template>
    <div class="page-container">
        <div class="main-content">
            <h1 class="page-title">Legfrissebb cikkek, amelyeket érdemes megnézni</h1>
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
                            <p class="title">{{article.title}}</p>
                            <p class="teaser" v-text="article.teaser"></p>
                            <!-- <p>{{article.formattedDate}}</p> -->
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="sidebar">
            <no-ssr>
                <div class="sidebar-box">
                    <p class="headline-3">Kövess minket a Facebookon is</p>
                    <iframe
                        ref="fbif"
                        style="border: 0; overflow:hidden; width: 100%; height: 154px;"
                        scrolling="no"
                        frameborder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                </div>
            </no-ssr>
        </div>
    </div>
</template>
<script>
import generateMetaTags from '~/services/generateMetaTags';

export default {
    layout: 'page',
    data() {
        return { title: 'Home Page', articles: [], sidebarWidth: 0 };
    },

    updated() {
        if (!this.$refs.fbif.src) {
            const width = this.$refs.fbif.clientWidth;
            this.$refs.fbif.src = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnezdmegcom%2F&tabs=&width=${width}&height=154&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2241648436114870`;
        }
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

<style lang="scss" scoped>
.page-title {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.article-list__item {
    // border-radius: 3px;
    // box-shadow: 0px 1px 4px rgba(127, 127, 127, 0.5);

    // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    //     0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    // background-color: #fff;
    // background-color: #eff0f1;

    // overflow: hidden;

    // &:hover {
    //     // box-shadow: 0px 1px 4px rgba(127, 127, 127, 0.75);

    //     .image {
    //         transition-duration: 0.3s;
    //         transform: scale(1.05);
    //     }
    // }

    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}
.article-list__link {
    color: #333;
    text-decoration: none;

    margin-bottom: 20px;

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
    margin-top: 12px;
    padding-bottom: 16px;

    .title {
        font-weight: 600;
        letter-spacing: 0.015em;
        font-size: 1.125rem;
        line-height: 1.2;
        margin-bottom: 4px;
    }
}

@media (min-width: 768px) {
    .article-list__link {
        display: flex;
        flex-direction: row;
    }

    .article-list__image-container {
        // flex: 1 1 auto;
        // padding: 0;
        // height: 56.25%;
        flex: 1;
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
