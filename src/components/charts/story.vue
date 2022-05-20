  <template>
  <el-main style="max-height:50vh; width: 100%">
    <p>{{dataset.chartTitle}}</p>
    <el-row style="margin: 0 auto 0 auto;" type="flex" justify="end">
      <el-col :span="18"><div style="width: 100%"></div></el-col>
      <el-col :span="6">
        <el-input size="mini" placeholder="Type to search" v-model="search">
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin: 0 auto 4% auto">
      <el-table
        :data="(computeTable).filter((data) => !search || myFilter(data))"
        empty-text="Keine Daten gefunden"
      >
        <el-table-column prop="label" label="Art" sortable></el-table-column>
        <el-table-column prop="data" label="Inhalt" sortable></el-table-column>
      </el-table>
    </el-row>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      tabledata: [],
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
      let searchString = this.search.toLowerCase();
      for (var element in data) {
        res =
          res || data[element].toString().toLowerCase().includes(searchString);
      }
      return res;
    },
    /*updateTable() {
      this.tabledata.length = 0;
      for (let index = 0; index < this.dataset.labels.length; index++) {
        const label = this.dataset.labels[index];
        const data = this.dataset.data[index];

        this.tabledata.push({
          label: label,
          data: data,
        });
      }
    },*/
  },
  computed: {
    computeTable: function() {
      let tabledata = [];
      for (let index = 0; index < this.dataset.chartData.labels.length; index++) {
        const label = this.dataset.chartData.labels[index];
        const data = this.dataset.chartData.datasets[0].data[index];

        tabledata.push({
          label: label,
          data: data,
        });
      }
      return tabledata;
    },
  },
  watch: {
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
    //this.updateTable();
  },
};
</script>