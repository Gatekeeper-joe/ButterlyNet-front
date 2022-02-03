<template>
    <div class="workspace">
        <Navbar />
        <div class="a-dashboard d-flex mt-5">
            <div class="col-md-7">
                <span class="mt-3">reserved</span>
            </div>
            <div class="col-md-6">
                <div class="h-table-content">
                    <v-container>
                        <!-- <v-row>
                            <v-col cols="10">
                                <v-data-table :headers="headers" :items="items">
                                    <template v-slot:[`item.host`]="{ item }">
                                        <a :href="item.url"> {{ item.host }}</a>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row> -->

                        <v-row>
                            <template>
                                <v-data-table
                                    :headers="headers"
                                    :items="items"
                                    :items-per-page="5"
                                    class="elevation-1"
                                ></v-data-table>
                            </template>
                        </v-row>
                    </v-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios')
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
                user_id: this.$auth.user.id,

                headers: [
                    {text: '', value: 'count'},
                    {text: 'Updated page', value: 'host'},
                    {text: 'Updated time', value: 'last_updated_at'},
                ],

                items: [],
            }
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.prevRoute = from;
            })
        },

        mounted() {
            this.$axios.$post('/getUpdated', { uid: this.user_id })
            .then((pageData) => {
                pageData.forEach((v, i) => {
                    i += 1;
                    v['count'] = i;
                    this.items.push(v);
                })
            })
            .catch ((err) => {
                this.result = err;
            })
            // if (this.prevRoute.path === '/registUser') {
            //     this.message = 'ユーザ登録が完了しました。' + "\n" + '最高の体験があなたを待っています(小並感)';
            //     alert(this.message);
            // }
        },

    }
</script>

<style>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
    font-size: 1.5rem;
    height: 60px;
}

.v-data-footer {
    font-size: 1.4rem;
    justify-content: center;
}

.v-data-footer__select {
    display: flex;
    align-items: center;
    flex: 0 0 0;
    justify-content: flex-end;
    white-space: nowrap;
    margin-right: 10px;
}

.v-input {
    font-size: 16px;
    margin-left: 10px;
}
</style>