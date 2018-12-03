<template>
    <div class="video-player">
        <iframe :src="src" class="video-player__iframe"></iframe>
    </div>
</template>
<script>
export default {
    props: ['video'],
    computed: {
        src() {
            return this.video.replace('watch?v=', 'embed/');
        },
    },
};
</script>
<style>
.video-player {
    /* display: block; */
    position: relative;
    height: 0;
    padding-top: 56.25%;
    background-color: #000;
}
.video-player__iframe {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
