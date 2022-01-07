<template>
    <div class="nav-bar">
        <ul class="nav-list">
            <li v-if="$auth.loggedIn" class="nav-item cursor">
                <div class="nav-link" @click="$auth.logout()">
                    <b-icon icon="door-open"></b-icon>
                    <span class="link-text">logout</span>
                </div>
            </li>
            <li class="nav-item" v-for="link in links" :key="link.id">
                <nuxt-link :to="link.url" class="nav-link">
                    <b-icon :icon="link.icon"></b-icon>
                    <span class="link-text">{{ link.text }}</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                links: this.$auth.loggedIn & '/' === location.pathname ? [
                    { id:1, icon:"bug", text:"Harvest", url:"harvest"},
                    { id:2, icon:"pencil-square", text:"Regist URL", url:"RegistURL"},
                ] : this.$auth.loggedIn ? [
                    { id:1, icon:"journal-bookmark", text:"Description", url:"/"},
                    { id:2, icon:"pencil-square", text:"Regist URL", url:"RegistURL"},
                ] : [
                    { id:1, icon:"door-open", text:"Login", url:"login"},
                    { id:2, icon:"person-circle", text:"Regist User", url:"RegistUser"},
                    { id:3, icon:"pencil-square", text:"Regist URL", url:"RegistURL"},
                ],
            };
        },
        methods: {
            async logout() {
                try {
                    this.$axios.$post('/logout')
                    .then((res)=>{
                    })
                } catch (err) {
                    this.message = err
                }
            },
        },
    }
</script>

<style>
    :root {
        --active-color: white;
        --link-text-color: #00BB00;
        --nav-background-color: white;
        --active-background-color: #00BB00;
    }

    .nav-bar {
        margin-top: 40px;
        text-align: center;
    }

    .nav-list {
        padding: 0;
        margin: 0 auto;
        position: relative;
        background-color: var(--nav-background-color);
        display: flex;
        border: solid 0.1rem #00BB00;
        border-radius: 4px;
        list-style-type: none;
        overflow: hidden;
        justify-content: space-between;
        width: 387px;
    }

    .nav-item {
        display: flex;
    }

    .nav-link {
        padding: 1.1rem 1rem;
        display: flex;
        align-items: center;
        color: var(--link-text-color);
        text-decoration: none;
    }

    .nav-link:hover,
    .nav-link.active {
        color: var(--active-color);
        background-color: var(--active-background-color);
    }

    .b-icon {
        height: 2.4rem;
        width: 2.4rem;
        justify-content: center;
        align-items: center;
        display: flex;
        margin-right: 0.32rem;
    }

    .link-text {
        font-size: 1.76rem;
    }

</style>