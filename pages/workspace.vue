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
                                    :disable-sort=true
                                    sort-by="count"
                                    class="elevation-1"
                                >
                                    <template v-slot:[`item.actions`]="{ item }" @mouseover="showIcon()" @mouseleave="hideIcon()">
                                        <v-icon small @click="deleteItem(item)">
                                            mdi-delete
                                        </v-icon>
                                    </template>
                                    <template v-slot:no-data>
                                        <span>更新されたページはありません</span>
                                    </template>
                                </v-data-table>
                            </template>
                        </v-row>
                    </v-container>
                </div>
            </div>
        </div>
        {{ this.icon }}
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
                count: '',
                icon: false,

                headers: [
                    {text: '', value: 'count'},
                    {text: 'Updated page', value: 'host'},
                    {text: 'Updated time', value: 'last_updated_at'},
                    {text: '', value: 'actions', sortable: false},
                ],

                items: [],
            }
        },

        methods: {
            showIcon () {
                this.icon = true;
            },

            hideIcon () {
                this.icon = false;
            },

            getUpdated () {
                this.$axios.$post('/getUpdated', { uid: this.user_id })
                .then((pageData) => {
                    this.count = pageData.length;
                    pageData.forEach((v, i) => {
                        i += 1;
                        v['count'] = i;
                        this.items.push(v);
                    })
                })
                .catch ((err) => {
                    this.result = err;
                })
            },

            displayIcon () {
                this.hover = true;
            },

            deleteItem (item) {
                this.editedIndex = this.items.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.prevRoute = from;
            })
        },

    created () {
        this.getUpdated()
    },

        mounted() {
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
    height: 50px;
    padding: 0 15px;
}

.v-data-footer {
    font-size: 1.4rem;
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
