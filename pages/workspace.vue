<template>
    <div class="workspace">
        <Navbar />
        <div class="a-dashboard d-flex">
            <div class="col-md-7 d-flex just-center">
                <Graph :gid="gid" :countStat="countStat" v-if="countStat" />
            </div>
            <UpdatedPageTable />
        </div>

        <div class="mt-5 handoff-table">
            <HandoffTable :gid="gid" :uname="uname"/>
        </div>
    </div>
</template>

<script>
    const axios = require('axios')
    import Navbar from "~/components/Navbar"
    import UpdatedPageTable from "~/components/UpdatedPageTable"
    import HandoffTable from "~/components/HandoffTable"
    import Graph from "~/components/Graph"

    export default {
        components: {
            Navbar,
            HandoffTable,
            UpdatedPageTable,
            Graph,
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
                gid: this.$auth.user.group_id,
                uname: this.$auth.user.nickname,
                pageData: '',
                count: '',
                index: '',
                editedItem: '',
                editedIndex: '',
                countStat: '',
            }
        },

        methods: {
            displayIcon () {
                this.hover = true;
            },

            aggregate (records) {
                let openCount = 0;
                let pendingCount = 0;
                let closeCount = 0;

                records.forEach(obj => {
                    if (obj.status === 'Open') {
                        openCount += 1;
                    } else if (obj.status === 'Pending') {
                        pendingCount += 1;
                    } else {
                        closeCount += 1;
                    }
                });

                let countStat = [openCount, pendingCount, closeCount];
                this.countStat = countStat;
                return;
            },

            getRecord () {
                this.$axios.$post('/getRecord', {gid: this.gid} )
                .then((records) => {
                    this.aggregate(records);
                    return;
                })
                .catch((err) => {
                    console.log(err);
                })
            },
        },

        created () {
            this.getRecord();
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.prevRoute = from;
            })
        },

        mounted () {
            // if (this.prevRoute.path === '/registUser') {
            //     this.message = 'User registration has completed.' + "\n" + 'It's time to work!!!';
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

    .handoff-table {
        margin-bottom: 100px;
    }

    #doughnut-chart {
        width: 400px !important;
        height: 400px !important;
    }
</style>