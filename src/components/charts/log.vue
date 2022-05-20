  <template>
  <el-container style="width: 100%">
    <el-header>{{ dataset.chartTitle }}</el-header>
    <el-row style="margin: 0 auto 0 auto, width:50%" type="flex" justify="end">
      <el-col :span="18"><div style="width: 100%"></div></el-col>
      <el-col :span="6">
        <el-input size="mini" placeholder="Type to search" v-model="search">
        </el-input>
      </el-col>
    </el-row>
    <div
      :style="{
        'border-width': '1px',
        'border-color': 'lightgrey',
        'border-style': 'solid',
        height: '50vh',
        padding: '10px',
        'max-height': '50vh',
      }"
      v-if="dataset.chartData.datasets[0].data.length > 0"
    >
      <el-main :style="{ width: '100%', 'max-height': '50vh' }">
        <div
          v-for="(item, index) in tabledata"
          :key="index"
          :style="{
            color: index % 2 == 0 ? 'darkblue' : 'darkgrey',
            'tex-align': 'left',
          }" style="text-align: left"
        >
            {{ item }}
        </div>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      search: "",
      tabledata: [],
      myFunc: {handler:()=>{}}
    };
  },
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    
  },
  methods: {
    myFilter(data) {
      let res = false;
      //console.log(data);
      let searchString = this.search.toLowerCase();
      for (var element in data) {
        res =
          res || data[element].toString().toLowerCase().includes(searchString);
      }
      return res;
    },
    //debFunc() {return ["Test"];},
    myData() {
      let res = this.dataset.chartData.datasets[0].data.filter(
        (data) => !this.search || this.myFilter([data])
      );
      this.tabledata = res;
    }
  },

  computed: {
  },
  watch: {
    search: function (){
      //this.myData();
      this.myFunc.handler();
      //console.log(this.search);
    }
    /*dataset: {
      // This will let Vue know to look inside the array
      deep: true,
      immediate: true,
      // We have to move our method to a handler field
      handler() {
        this.updateTable();
      },
    },*/
  },
  mounted() {
    this.tabledata = this.dataset.chartData.datasets[0].data;
    this.myFunc.handler =_.debounce(this.myData, 1000, { leading: true });
    //this.debFunc = this.myData;//_.debounce(this.myData, 100, { leading: true });
    //var container = this.$el.querySelector("#container");
    //container.scrollTop = container.scrollHeight;
    //this.updateTable();
  },
};
</script>