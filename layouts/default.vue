<template>
    <div>
        <Header />
        <div class="main">
            <div class="container">
                <div class="row justify-content-center">
                    <Nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "~/components/Header"

    export default {
        components: {
            Header
    }
}
</script>

<style>
    .cursor {
        cursor: pointer;
    }
</style>