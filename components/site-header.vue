<template>
    <div class="site-header">
        <div class="page-container">
            <nuxt-link to="/" class="brand-link">
                <img src="~/assets/logo.png">
            </nuxt-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.site-header {
    padding: 12px 0 10px;
    border-bottom: 1px solid #cdcdcd;
    background-color: #fff;

    // text-align: center;
}

.brand-link {
    padding: 0 20px;
}
</style>