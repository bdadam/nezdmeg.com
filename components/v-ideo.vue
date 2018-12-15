<template>
    <div class="video-player">
        <!-- <img :src="image" v-if="!showIframe"> -->
        <no-ssr>
            <iframe
                :src="src"
                title="Beágyazott video"
                allowfullscreen
                referrerpolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                data-load="showIframe = true"
                data-v-show="showIframe"
            ></iframe>
        </no-ssr>
    </div>
</template>
<script>
export default {
    props: ['video', 'src', 'image'],
    data() {
        return { showIframe: false };
    },
};
</script>
<style lang="scss" scopoed>
.video-player {
    position: relative;
    height: 0;
    padding-top: 56.25%;
    background-color: #000;

    iframe,
    img {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
