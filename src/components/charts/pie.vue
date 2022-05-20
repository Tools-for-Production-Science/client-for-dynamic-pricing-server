<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    dataset: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      /*chartData2: {
        labels: ["Babol", "Cabanatuan", "Daegu", "Jerusalem"],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            data: [1000, 500, 1500, 1000],
          },
        ],
      },*/
      options: {
        title: {
          display: true,
          text: "",
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    update() {
      this.renderChart(this.dataset.chartData, this.options);
    },
  },
  mounted() {
    this.options.title.text = this.dataset.chartTitle;
    this.renderChart(this.dataset.chartData, this.options);
  },
};
</script>