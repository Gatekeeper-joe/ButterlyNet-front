<template>
    <div class="workspace">
        <Navbar />
        <div class="a-dashboard d-flex">
            <div class="col-md-7">
                <span class="mt-3">reserved</span>
            </div>
            <UpdatedPageTable />
        </div>

        <div class="mt-5 handoff-table">
            <HandoffTable />
        </div>
    </div>
</template>

<script>
    const axios = require('axios')
    import Navbar from "~/components/Navbar"
    import UpdatedPageTable from "~/components/UpdatedPageTable"
    // import HandoffTable from "~/components/HandoffTable"

    export default {
        components: {
            Navbar,
            // HandoffTable,
            UpdatedPageTable,
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
                pageData: '',
                count: '',
                index: '',
                items: [],
                editedItem: '',
                editedIndex: '',

                hostTableHeaders: [
                    {text: '', value: 'count'},
                    {text: 'Updated page', value: 'host'},
                    {text: 'Updated time', value: 'last_updated_at'},
                    {text: '', value: 'actions', sortable: false},
                ],

                updateTarget: {
                    uid: this.$auth.user.id,
                    host: '',
                },
            }
        },

        methods: {
            getUpdated () {
                this.$axios.$post('/getUpdated', { uid: this.user_id })
                .then((pageData) => {
                    this.pageData = pageData;
                    this.count = this.pageData.length;
                    this.pageData.forEach((v, i) => {
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
                this.index = this.items.indexOf(item);
                this.items.splice(this.index, 1);
                this.count = this.items.length;
                this.items.forEach((v, i) => {
                    i += 1;
                    v['count'] = i;
                });

                this.updateTarget.host = item.host;

                this.$axios.$post('/updateFlag', { targetData: this.updateTarget })
                .then((res) => {
                    return;
                })
                .catch((err) => {
                    errorMessage = 'データの削除に失敗しました。';
                    alert(errorMessage);
                })
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
