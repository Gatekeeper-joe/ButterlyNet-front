<template>
    <div class="nav-bar">
        <ul class="nav-list">
            <li class="nav-item" v-for="link in links" :key="link.id">
                <nuxt-link :to="link.url" class="nav-link" :class="link.id === selectedIndex ? 'active' : null">
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
                selectedIndex: 0,
                links: [
                    { id:1, icon:"door-closed", text:"Login", url:"login"},
                    { id:2, icon:"journal-bookmark", text:"Description", url:"description"},
                    { id:3, icon:"pencil-square", text:"Regist URL", url:"regist"},
                ],
            };
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style>
    :root {
    --active-color: white;
    --link-text-color: #00BB00;
    --nav-background-color: white;
    --active-background-color: #00BB00;
    }

    ul {
        display: flex;
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
    padding: 0.75rem 1rem;
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
    height: 1.5rem;
    width: 1.5rem;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    margin-right: 0.2rem;
    }

    .link-text {
    font-size: 1.1rem;
    }

</style>