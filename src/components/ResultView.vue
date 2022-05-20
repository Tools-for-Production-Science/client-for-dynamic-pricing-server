  <template>
  <el-main>
    <el-row class="tac">
      <el-col :span="24">
        <span> Report: {{ data.setTitle }}</span>

        <div v-for="(set, index) in data.sets" :key="index">
          <el-divider></el-divider>
          <div v-if="set.chartType != 'story' && set.chartType != 'log'">
            <el-row>
              <el-col :span="11">
                <p style="margin: 5px">View</p>
                <el-input-number
                  :id="'input' + index"
                  :change="updateRange"
                  :step="1"
                  :step-strictly="true"
                  v-model="range[index][0]"
                ></el-input-number>
                <el-input-number
                  :id="'input' + index"
                  :change="updateRange"
                  :step="1"
                  :step-strictly="true"
                  v-model="range[index][1]"                  
                ></el-input-number>
              </el-col>
              <el-col :span="11">
                <p style="margin: 5px">Max. data points from {{set.chartData.labelsBKU ?set.chartData.labelsBKU.length : set.chartData.labels.length }}</p>
                <el-input-number
                  :id="'input' + index"
                  :change="updateRange"
                  :step="1"
                  :step-strictly="true"
                  v-model="range[index][2]"
                ></el-input-number>
              </el-col>
              <el-col :span="2">
                <p style="margin: 5px">Moving AVG</p>
                <el-checkbox v-model="checked[index]"></el-checkbox>
              </el-col>
            </el-row>
          </div>
          <linechart
            :dataset="set"
            :range="range[index]"
            :title="set.chartTitle"
            :movingAVG="checked[index]"
            v-if="set.chartType == 'line'"
            :ref="'chart'+index"
          ></linechart>
          <barchart
            :dataset="set"
            v-if="set.chartType == 'bar'"
            :range="range[index]"
            :ref="'chart'+index"
          ></barchart>
          <piechart
            :dataset="set"
            v-if="set.chartType == 'pie'"
            :range="range[index]"
            :ref="'chart'+index"
          ></piechart>
          <story
            :dataset="set"
            v-if="set.chartType == 'story'"
            :range="range[index]"
            :ref="'chart'+index"
          ></story>
          <log
            :dataset="set"
            v-if="set.chartType == 'log'"
            :range="range[index]"
            :ref="'chart'+index"
          ></log>
          <!--<button v-on:click="set.chartData.labels = ['none', 'none']">Test</button>-->
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import linechart from "./charts/line";
import barchart from "./charts/bar";
import piechart from "./charts/pie";
import story from "./charts/story";
import log from "./charts/log.vue";

export default {
  data() {
    return {
      search: "",
      zoom: [],
      range: [],
      checked: [],
      checking:[]
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    linechart,
    barchart,
    piechart,
    story,
    log,
  },

  methods: {
    resetZoom(index) {
      this.$refs.chart[index].resetZoom();
    },
    myFilter(data) {
      let res = false;
      let searchString = this.search.toLowerCase();
      console.log(searchString);
      for (var element in data) {
        res =
          res || data[element].toString().toLowerCase().includes(searchString);
      }
      return res;
    },
    updateRange(index, place, value) {
      console.log("update+ "+value);
    },
    updateArrayLength() {
      if (this.range.length != this.data.sets.length) {
        this.range.length = 0;
        this.checked.length = 0;
        this.data.sets.forEach((element) => {
          this.range.push([0, 100, 100]);
          this.checked.push(false);
        });
      }
    },
  },
  computed: {
     
  },
  watch: {
    data: {
      handler() {
        this.updateArrayLength();
      },
    },   
  },
  beforeMount() {
    this.updateArrayLength();
  },
};
</script>