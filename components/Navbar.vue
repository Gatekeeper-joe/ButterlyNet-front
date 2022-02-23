<template>
    <div class="nav-bar">
        <!-- <ul class="nav-list" :class="this.navwidth ? 'nav-width-s': 'nav-width-l'"> -->
        <ul class="nav-list">
            <li v-if="$auth.loggedIn" class="nav-item cursors">
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
                navWidth: true,

                links: this.$auth.loggedIn && '/' === this.$route.path ? [
                    { id:1, icon:"table", text:"Workspace", url:"workspace"},
                    { id:2, icon:"pencil-square", text:"Regist URL", url:"registURL"},
                    { id:3, icon:"person-circle", text:this.$auth.user.nickname, url:"resetPassword"},
                ] : this.$auth.loggedIn ? [
                    { id:1, icon:"journal-bookmark", text:"Description", url:"/"},
                    { id:2, icon:"pencil-square", text:"Regist URL", url:"registURL"},
                    { id:3, icon:"person-circle", text:this.$auth.user.nickname, url:"resetPassword"},
                ] : [
                    { id:1, icon:"door-open", text:"Login", url:"login"},
                    { id:2, icon:"person-circle", text:"Regist User", url:"registUser"},
                    { id:3, icon:"journal-bookmark", text:"Description", url:"/"},
                ],
            };
        },

        created() {
            if (this.$route.path === '/') {
                this.navWidth = true;
            }
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
        margin-top: 60px;
        text-align: center;
        margin-bottom: 30px;
    }

    .nav-width-s {
        width: 389px;
    }

    .nav-width-l {
        width: 515px;
    }

    .nav-list {
        padding: 0;
        padding-left: 0px !important;
        margin: 0 auto;
        position: relative;
        background-color: var(--nav-background-color);
        display: flex;
        border: solid 0.1rem #00BB00;
        border-radius: 4px;
        list-style-type: none;
        overflow: hidden;
        justify-content: space-between;
        width: 515px;
    }

    .nav-item {
        display: flex;
        cursor: pointer;
    }

    .nav-link {
        padding: 1.15rem 0.9rem;
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