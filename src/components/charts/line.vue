<script>
import { Line } from "vue-chartjs";
import zoom from "chartjs-plugin-zoom";

export default {
  extends: Line,
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    range: {
      type: Array,
    },
    title: {
      type: String,
    },
    movingAVG: {
      type: Boolean,
    },
  },
  data() {
    return {
      options: {
        title: {
          display: true,
          text: "",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          zoom: {
            // Container for pan options
            pan: {
              // Boolean to enable panning
              enabled: true,

              // Panning directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow panning in the y direction
              mode: "xy",
            },

            // Container for zoom options
            zoom: {
              // Boolean to enable zooming
              enabled: false,

              // Zooming directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow zooming in the y direction
              mode: "xy",
            },
          },
        },
      },
    };
  },
  watch: {
    dataset: function () {
      //this.renderChart(this.dataset.chartData, this.options);
      console.log("Test2");
      this.dataset.chartData.labelsBKU = this.dataset.chartData.labels;
      this.dataset.chartData.datasets[0].dataBKU =
        this.dataset.chartData.datasets[0].data;
      this.$data._chart.data = this.filterData(this.dataset.chartData);
      this.$data._chart.update();
    },
    zoom: function () {
      //this.options.plugins.zoom = this.zoom;
      //console.log("!!!");
      //console.log(this.zoom);
      //this.$data._chart.options.plugins.zoom = this.zoom;
      //this.$data._chart.update();
    },
    range: function () {
      this.$data._chart.data = this.filterData(this.dataset.chartData);
      let chartData = this.dataset.chartData;
      let range = this.range;
      if (
        this.range[0] > 0 &&
        this.range[0] < chartData.datasets[0].data.length
      ) {
        chartData.datasets[0].data.splice(0, range[0]);
        chartData.labels.splice(0, range[0]);
      }

      if (
        this.range[1] < chartData.datasets[0].data.length &&
        this.range[1] > this.range[0]
      ) {
        chartData.datasets[0].data.splice(
          range[1]-range[0],
          chartData.labels.length - this.range[1]+range[0]
        );
        chartData.labels.splice(
          range[1]-range[0],
          chartData.labels.length - this.range[1]+range[0]
        );
      }
      this.$data._chart.update();
    },

    title: function () {
      console.log("Test1");
      this.$data._chart.options.title.text = this.title;
      this.$data._chart.update();
    },
    movingAVG: function () {
      this.filterData(this.dataset.chartData);
      this.$data._chart.update();
    },
  },
  mounted() {
    this.options.title.text = this.dataset.chartTitle;
    //this.options.plugins.zoom = this.zoom;
    this.dataset.chartData.labelsBKU = this.dataset.chartData.labels;
    this.dataset.chartData.datasets[0].dataBKU =
      this.dataset.chartData.datasets[0].data;

    this.renderChart(this.filterData(this.dataset.chartData), this.options);
    this.$data._chart.config.options.animation.duration = 0; //Verhinderie wildes gezappel beim späteren live updating
  },
  methods: {
    resetZoom() {
      //this.$data._chart.resetZoom();
    },
    filterData(chartData) {
      console.log(this.movingAVG + "!");
      let temp = 0;
      let range = this.range;
      if (this.range[2] < chartData.labelsBKU.length) {
        let factor = chartData.labelsBKU.length / this.range[2];
        chartData.labels = new Array(this.range[2]);
        chartData.datasets[0].data = new Array(this.range[2]);

        if (this.movingAVG) temp = chartData.datasets[0].dataBKU[0];

        for (
          let index = 0;
          index <= this.range[2];
          index++
        ) {
          chartData.labels[index] =
            chartData.labelsBKU[Math.round(factor * index)];
          if (this.movingAVG) {
            temp =
              temp * 0.9 +
              0.1 * chartData.datasets[0].dataBKU[Math.round(factor * index)];
            chartData.datasets[0].data[index] = temp;
          } else {
            chartData.datasets[0].data[index] =
              chartData.datasets[0].dataBKU[Math.round(factor * index)];
          }
        }
      }
      return chartData;
    },
  },
};
</script>