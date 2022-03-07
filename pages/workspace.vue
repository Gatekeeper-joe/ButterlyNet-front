<template>
    <div class="workspace">
        <Navbar />
        <div class="a-dashboard d-flex">
            <div class="col-md-7 d-flex just-center">
                <Chart :gid="gid" :chartData="chartData" v-if="viewChart"/>
                {{ chartData }}
                {{ viewChart }}
            </div>
            <UpdatedPageTable />
        </div>

        <div class="mt-5 handoff-table">
            <HandoffTable :gid="gid" :uname="uname" @receiveChartData="redraw($event)" />
        </div>
    </div>
</template>

<script>
    const axios = require('axios')
    import { Doughnut } from "vue-chartjs"
    import Navbar from "~/components/Navbar"
    import UpdatedPageTable from "~/components/UpdatedPageTable"
    import HandoffTable from "~/components/HandoffTable"
    import Chart from "~/components/Chart"

    export default {
        extends: Doughnut,
        components: {
            Navbar,
            HandoffTable,
            UpdatedPageTable,
            Chart,
        },

        middleware: ['auth'],
        head() {
            return {
                title: 'HOME'
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

                //Use in Chart.
                openCount: 0,
                pendingCount: 0,
                closeCount: 0,
                viewChart: false,
                chartData: {
                    labels: ['Open', 'Pending', 'Close'],
                    datasets: [
                        {
                            data: '',
                            backgroundColor: ''
                        }
                    ],
                },
            }
        },

        methods: {
            aggregate (records) {
                this.openCount = 0;
                this.pendingCount = 0;
                this.closeCount = 0;

                records.forEach(obj => {
                    if (obj.status === 'Open') {
                        this.openCount += 1;
                    } else if (obj.status === 'Pending') {
                        this.pendingCount += 1;
                    } else {
                        this.closeCount += 1;
                    }
                });

                // let countStat = [openCount, pendingCount, closeCount];

                const countStat = [
                    {
                        data: [this.openCount, this.pendingCount, this.closeCount],
                        backgroundColor: ['#F44336', '#FF9800', '#9E9E9E']
                    }
                ]

                this.$set(this.chartData,"datasets", countStat);
                return;
            },

            getRecord () {
                this.$axios.$post('/getRecord', {gid: this.gid} )
                .then((records) => {
                    this.aggregate(records);
                    this.viewChart = true
                    return;
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            redraw ($event) {
                let deletestatus = $event;
                this.viewChart = false;

                if (deletestatus === 'Open') {
                    this.openCount --;
                } else if (deletestatus === 'Pending') {
                    this.pendingCount --;
                } else {
                    this.closeCount --;
                }

                const countStat = [
                    {
                        data: [this.openCount, this.pendingCount, this.closeCount],
                        backgroundColor: ['#F44336', '#FF9800', '#9E9E9E']
                    }
                ]
                this.$set(this.chartData,"datasets", countStat);

                setTimeout(this.viewChart = true, 2000);
                return;
            }

        },


        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.prevRoute = from;
            })
        },

        mounted () {
            this.getRecord();
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