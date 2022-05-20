<template>
  <div style="min-height: 600px">
    <el-main>
      <el-row class="tac">
        <el-col :span="6">
          <el-button type="warning" @click="emptyReport"
            >Close Report</el-button
          >
          <h5>Report from ID {{this.$store.state.selectedExp}}</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @select="handleOpen"
          >
            <el-menu-item
              v-for="(item, index) in reports"
              :key="index"
              :index="index.toString()"
            >
              <span>{{ item.setTitle }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <span v-if="Object.keys(rview_data).length == 0"
            >No report chosen</span
          >
          <rview
            :data="rview_data"
            v-if="Object.keys(rview_data).length != 0"
            ref="rview"
          ></rview>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import rview from "./ResultView.vue";
import { com } from "../comHelper";

export default {
  components: { rview },
  data() {
    return {
      rview_data: {},
      historic: false,
      reportid: -1,
      reports: [
        {
          id: 0,
          setTitle: "TestReport",
        },
      ],
      loading: true,
      updating: false,
      lastExpID: -1,
    };
  },
  computed: {},
  methods: {
    handleOpen(index, indexPath) {
      this.reportid = this.reports[index].id;
      //if (!this.updating)
      this.getReport();
    },
    emptyView() {
      this.reportid = -1;
      this.rview_data = {};
      this.reports.length = 0;
      this.updating = false;
      this.historic = false;
    },
    emptyReport() {
      this.$store.state.selectedExp = -1;
      this.emptyView();
    },
    getReport() {
      if (this.$store.state.selectedExp < 0) return;
      this.updating = true;
      if (this.reportid < 0) return;

      var xhttp = new XMLHttpRequest();
      let comp = this;

      xhttp.timeout = comp.$store.state.timeout; // time in milliseconds
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.response);
          comp.rview_data = data;
          //comp.$refs.rview.
        }
        if (
          this.readyState == 4 &&
          comp.reportid > -1 &&
          comp.historic == false
        )
          setTimeout(comp.getReport, comp.$store.state.updateFreq);
      };

      xhttp.onerror = function () {
        console.log("An error occured during call for report");
        };
      /*xhttp.open("POST", "http://localhost:3001/getReport", true);
      let msg = JSON.stringify({
        expid: this.$store.state.selectedExp,
        repid: this.reportid,
      });
      xhttp.send(msg);*/

      let msg = JSON.stringify({
        expid: this.$store.state.selectedExp,
        repid: this.reportid,
      });
      com(xhttp, this.$store.state, "/getReport", msg);
    },
    updateReports() {
      if (this.$store.state.selectedExp < 0) {
        setTimeout(this.updateReports, 500);
        return;
      }

      var xhttp = new XMLHttpRequest();
      let comp = this;

      xhttp.timeout = comp.$store.state.timeout; // time in milliseconds // time in milliseconds

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.response);
          comp.historic = data[0];
          comp.reports = data[1];
          //comp.loading = false;
        } else if (this.readyState == 4) {
        }
        if (this.readyState == 4 && comp.historic == false)
          setTimeout(comp.updateReports, comp.$store.state.updateFreq);

        //console.log(this.readyState);
        //console.log(comp.historic);
      };
      /*xhttp.open("POST", "http://localhost:3001/getReports", true);
      xhttp.send(this.$store.state.selectedExp);*/
      com(
        xhttp,
        this.$store.state,
        "/getReports",
        this.$store.state.selectedExp
      );
    },
  },
  mounted() {
    this.updateReports();
    this.$store.state.emptyView = this.emptyView.bind(this);
    this.$store.state.updateReports = this.updateReports.bind(this);
    this.rview_data = this.$store.state.report;
    this.emptyReport();
  },
};
</script>
