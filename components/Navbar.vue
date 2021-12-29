<template>
    <div class="nav-bar">
        <ul class="nav-list">
            <li class="nav-item cursor" v-if="$auth.loggedIn">
                <span class="nav-link">
                    <b-icon icon="door-closed"></b-icon>
                    <span class="link-text" @click="$auth.logout()">logout</span>
                </span>
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
                links: this.$auth.loggedIn ? [
                    { id:1, icon:"journal-bookmark", text:"Description", url:"/"},
                    { id:2, icon:"pencil-square", text:"Regist URL", url:"regist"},
                ] : [
                    { id:1, icon:"door-open", text:"Login", url:"login"},
                    { id:2, icon:"person-circle", text:"Regist User", url:"RegistUser"},
                    { id:3, icon:"pencil-square", text:"Regist URL", url:"regist"},
                ],
            };
        },

        methods: {
            addClass() {
                this.isActive = true
            },

            removeClass() {
                this.isActive = false
            },

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
    margin: 0;
    position: relative;
    background-color: var(--nav-background-color);
    display: inline-flex;
    border: solid 0.1rem #00BB00;
    border-radius: 4px;
    list-style-type: none;
    overflow: hidden;
    }

    .nav-item {
    display: inline-flex;
    }

    .nav-link {
    padding: 1.1rem 1rem;
    display: inline-flex;
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
    display: inline-flex;
    margin-right: 0.32rem;
    }

    .link-text {
    font-size: 1.76rem;
    }

</style>