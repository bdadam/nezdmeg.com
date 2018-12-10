<template>
    <div class="site-header">
        <div class="page-container">
            <nuxt-link to="/" class="brand-link">
                <img class="logo" alt="A NezdMeg.com weboldal logója" src="~/assets/logo.png">
                <span
                    style="height: 1px; width: 1px; position: absolute; overflow: hidden; top: -10px;"
                >Legfrissebb cikkek</span>
            </nuxt-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.site-header {
    // padding: 12px 0 10px;
    // padding: 12px 0;
    background-color: #fff;
    border-bottom: 3px solid #f1f;
    border-bottom: 3px solid #d113d1;
    // background-color: #f1f1f1;
}

.logo {
    height: 48px;
}

.brand-link {
    display: inline-block;
    padding: 0 20px;
    padding: 12px 20px;
    font-size: 0;
}
</style>