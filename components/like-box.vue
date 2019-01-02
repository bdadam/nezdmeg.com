<template>
    <div>
        <no-ssr>
            <p class="headline-3">Kövess minket a Facebookon is</p>
            <iframe
                ref="fbif"
                style="border: 0; overflow:hidden; width: 100%; height: 300px;"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
        </no-ssr>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    updated() {
        if (!this.$refs.fbif.src) {
            const width = this.$refs.fbif.clientWidth;
            this.$refs.fbif.src = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnezdmegcom%2F&tabs=messages&width=${width}&height=300&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=2241648436114870`;
        }
    },
};
</script>
