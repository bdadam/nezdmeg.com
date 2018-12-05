<template>
    <div class="buttons">
        Megosztás
        <a
            class="fb"
            rel="external noreferrer"
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`"
            target="_blank"
        >Facebook</a>
        <!-- <a
            class="tw"
            :href="`https://twitter.com/home?status=${encodeURIComponent(`Nézd meg! ${title} ${url}`)}`"
            rel="external noreferrer"
            target="_blank"
        >Twitter</a>-->
        <!-- <a href="https://twitter.com/intent/follow?screen_name=asdf" target="_blank">Follow</a> -->
        <a
            class="tw"
            :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Nézd meg!')}`"
            rel="external noreferrer"
            target="_blank"
        >Twitter</a>
        <a
            class="em"
            :href="`mailto:?&amp;subject=${encodeURIComponent(`Nézd meg! ${title}`)}&amp;body=${encodeURIComponent(`${title}\n\n${url}`)}`"
        >E-mail</a>
        <a
            class="wa"
            :href="`https://wa.me/?text=${encodeURIComponent(`Nézd meg! ${title} ${url}`)}`"
            rel="external noreferrer"
            target="_blank"
        >WhatsApp</a>
    </div>
</template>
<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    align-items: center;
    flex-wrap: nowrap;
}
a {
    color: #fff;
    padding: 8px 16px;
    border-radius: 3px;
    text-decoration: none;
    margin: 0 6px;
    font-weight: bold;
    white-space: nowrap;
    flex: 0 0 auto;

    &:hover {
        // filter: brightness(80%);
        // background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 70%);
        // background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 80%);
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%);
        background-repeat: no-repeat;
        background-position: center top;
    }
}
.fb {
    background-color: #3b5998;
}

.tw {
    background-color: #00aced;
}

.em {
    background-color: #00a256;
}
.wa {
    background-color: #128c7e;
}
</style>
<script>
export default {
    props: ['url', 'title'],
};
</script>
