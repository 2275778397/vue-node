<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">首页</a>
                <slot></slot>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style scoped>
a,
a:hover {
    text-decoration: none;
}
</style>
