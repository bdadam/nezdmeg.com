<template>
    <div class="page-container">
        <div class="main-content">
            <h1 class="page-title">Legfrissebb cikkek, amelyeket érdemes megnézni</h1>
            <ul class="article-cards">
                <li v-for="article in articles" :key="article.url" class="article-card">
                    <nuxt-link :to="article.url" :title="article.title">
                        <div class="image-container">
                            <div
                                class="image"
                                :style="{backgroundImage: `url(${article.images.videoThumbnail.url})`}"
                            ></div>
                        </div>
                        <div class="text-container">
                            <p class="title">{{article.title}}</p>
                            <div class="teaser" v-text="article.teaser"></div>
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

.article-cards {
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // margin: 0 -10px;

    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    // grid-column-gap: 32px;
    // grid-row-gap: 32px;

    // width: 80%;
    // margin: 0 auto;
}

.article-card {
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

    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    // padding: 0 15%;

    a {
        color: #333;
        text-decoration: none;

        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        // &:hover {
        //     text-decoration: underline;
        // }

        &:hover,
        &:active {
            .title {
                text-decoration: underline;
            }
        }
    }

    .image-container {
        // padding-top: 56.25%;
        position: relative;
        overflow: hidden;

        flex: 1;
    }

    .text-container {
        flex: 3;
        padding-left: 20px;
    }

    .image {
        // position: absolute;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
        background-size: cover;
        background-position: center;
        padding-top: 56.25%;
    }

    .title {
        font-weight: 600;
        // padding: 12px 16px;
        letter-spacing: 0.015em;
        font-size: 1.125rem;
        // font-size: 0.875rem;
        line-height: 1.3;
        margin-bottom: 12px;
    }
}
</style>
