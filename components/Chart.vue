<script>
    import { Doughnut, mixins } from "vue-chartjs"
    const { reactiveProp } = mixins;

    export default ({
        extends: Doughnut,
        mixins: [reactiveProp],

        data () {
            return {
                options: {
                    responsive: true
                }
            }
        },

        mounted () {
            this.renderChart(this.chartData, this.options)
        }
    })
</script>

<style>
    #doughnut-chart {
        width: 400px !important;
        height: 400px !important;
    }
</style>