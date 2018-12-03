<template>
    <div>
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
            rel="external"
            target="_blank"
        >Twitter</a>-->
        <!-- <a href="https://twitter.com/intent/follow?screen_name=asdf" target="_blank">Follow</a> -->
        <a
            class="tw"
            :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Nézd meg!')}`"
            rel="external"
            target="_blank"
        >Twitter</a>
        <a
            class="em"
            :href="`mailto:?&amp;subject=${encodeURIComponent(`Nézd meg! ${title}`)}&amp;body=${encodeURIComponent(`${title}\n\n${url}`)}`"
        >E-mail</a>
    </div>
</template>
<style lang="scss" scoped>
a {
    color: #fff;
    padding: 8px 16px;
    border-radius: 3px;
    text-decoration: none;
    margin: 0 6px;
    font-weight: bold;
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
</style>
<script>
export default {
    props: ['url', 'title'],
};
</script>
