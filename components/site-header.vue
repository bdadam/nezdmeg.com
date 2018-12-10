<template>
    <div class="site-header">
        <div class="page-container">
            <nuxt-link to="/" class="brand-link">
                <img alt="A NezdMeg.com weboldal logója" src="~/assets/logo.png">
                <span
                    style="height: 1px; width: 1px; position: absolute; overflow: hidden; top: -10px;"
                >Legfrissebb cikkek</span>
            </nuxt-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.site-header {
    padding: 12px 0 10px;
    // border-bottom: 1px solid #cdcdcd;
    background-color: #fff;
    // background-color: #f1f1f1;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    // z-index: 1;
    // position: relative;
}

.brand-link {
    padding: 0 20px;
}
</style>