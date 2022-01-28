<template>
    <div class="col-md-9">
        <div class="home">
            <Navbar />
            <div class="secion py-3">
                <div class="a-header">
                    <h1>Hot News</h1>
                </div>
                <div class="post-list pt-5 d-flex">
                    <article class="post-card col-md-4" v-for="item in items" :key="item.id">
                        <div class="post-thumbnail">
                            <!-- <img :src="item.thumbnail" alt=""> -->
                            <img src="~/assets/img/MettaurEXE.png" alt="">
                        </div>
                        <div class="post-body">
                            <div class="post-meta">
                                <b-icon icon="calendar3"></b-icon>
                                <span>{{ item.date }}</span>
                            </div>
                            <div class="post-title">
                                <span>{{ item.title }}</span>
                            </div>
                        </div>
                        <Bookmark />
                    </article>
                </div>
            </div>
            <div class="secion py-3">
                <div class="a-header">
                    <h1>Unread News</h1>
                </div>
                <div class="post-list pt-5 d-flex">
                    <article class="post-card col-md-4" v-for="item in items" :key="item.id">
                        <div class="post-thumbnail">
                            <!-- <img :src="item.thumbnail" alt=""> -->
                            <img src="~/assets/img/MettaurEXE.png" alt="">
                        </div>
                        <div class="post-body">
                            <div class="post-meta">
                                <b-icon icon="calendar3"></b-icon>
                                <span>{{ item.date }}</span>
                            </div>
                            <div class="post-title">
                                <span>{{ item.title }}</span>
                            </div>
                        </div>
                        <Bookmark />
                    </article>
                </div>
            </div>
            <div class="secion py-3">
                <div class="a-header">
                    <h1>My Favorite</h1>
                </div>
                <div class="post-list pt-5 d-flex">
                    <article class="post-card col-md-4" v-for="item in items" :key="item.id">
                        <div class="post-thumbnail">
                            <!-- <img :src="item.thumbnail" alt=""> -->
                            <img src="~/assets/img/MettaurEXE.png" alt="">
                        </div>
                        <div class="post-body">
                            <div class="post-meta">
                                <b-icon icon="calendar3"></b-icon>
                                <span>{{ item.date }}</span>
                            </div>
                            <div class="post-title">
                                <span>{{ item.title }}</span>
                            </div>
                        </div>
                        <Bookmark />
                    </article>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Navbar from "~/components/Navbar"
    import Bookmark from "~/components/Bookmark"

    export default {
        components: {
            Navbar,
            Bookmark
        },

        middleware: ['auth'],

        head() {
            return {
                title: 'ホーム'
            }
        },

        data() {
            return {
                message: '',

                items: [
                    {id:1, date:"2021/12/28", thumbnail:"@/assets/img/MettaurEXE.png", title:"脆弱性対応パッチがリリースされました"},
                    {id:2, date:"2021/12/28", thumbnail:"~/assets/img/MettaurEXE.png", title:"セキュリティリサーチャーにより、新たなPOCが公開されました"},
                    {id:3, date:"2021/12/28", thumbnail:"~/assets/img/MettaurEXE.png", title:"株式会社Jがランサムウェア被害"},
                ]
            }
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.prevRoute = from;
            })
        },

        mounted() {
            if (this.prevRoute.path === '/registUser') {
                this.message = 'ユーザ登録が完了しました。' + "\n" + '最高の体験があなたを待っています(小並感)';
                alert(this.message);
            }
        },
    }
</script>

<style>
    .a-header {
        border-bottom: 0.2rem solid;
    }

    .post-list > article {
        margin-bottom: 1.6rem;
        display: flex;
        flex-direction: column;
    }

    .post-title {
        height: 7rem;
    }

    .post-footer {
        border-top: solid 1px;
        text-align: right;
    }

    .heart-icon {
        color: #FF69A3;
    }
</style>