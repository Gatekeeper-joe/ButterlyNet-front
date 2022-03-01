<script>
    import { Doughnut } from "vue-chartjs"

    export default ({
        extends: Doughnut,
        data() {
            return {
            graphData: {
                labels: ['Open', 'Pending', 'Close'],
                datasets: [
                {
                    data: [3, 2, 5],
                    backgroundColor: ['#F44336', '#FF9800', '#9E9E9E']
                }
                ]
            },
            options: {
                responsive: true
            }
            }
        },
        mounted() {
            this.renderChart(this.graphData, this.options)
        }
    })
</script>

<style>
    #doughnut-chart {
        width: 400px !important;
        height: 400px !important;
    }
</style>
