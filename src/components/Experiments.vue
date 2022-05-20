<template>
  <div style="position: relative; width: 100%">
    <div>
      <h3>Overview of Current Experiments</h3>
    </div>
    <div>
      <h4>Current Version on Server: {{this.$store.state.versionHash }} @ {{this.$store.state.versionDate }}</h4>
    </div>
    <el-row style="width: 90%; margin: 0 auto 0 auto" type="flex" justify="end">
      <el-col :span="18"><div style="width: 100%"></div></el-col>
      <el-col :span="6">
        <el-input size="mini" placeholder="Type to search" v-model="search">
        </el-input>
      </el-col>
    </el-row>
    <el-row style="width: 90%; margin: 0 auto 4% auto">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          stripe
          :data="tableData.filter((data) => !search || myFilter(data))"
          empty-text="No Data Found"
        >
          <el-table-column
            prop="date"
            label="Start Date"
            sortable
          ></el-table-column>
                    <el-table-column
            prop="end"
            label="End Date"
            sortable
          ></el-table-column>
          <el-table-column prop="name" label="Name" sortable></el-table-column>
          <el-table-column
            prop="expid"
            label="ID of Experiments in DB"
            sortable
          ></el-table-column>
          <el-table-column
            prop="status"
            label="Status"
            sortable
          ></el-table-column>
          <el-table-column align="right">
            <template slot="header"> </template>
            <template slot-scope="scope">
              <el-button
                type="success"
                size="large"
                v-if="showButton(scope.index, scope.row, 0)"
                @click="handleContinue(scope.$index, scope.row)"
                >Continue</el-button
              >
              <el-button
                type="warning"
                size="large"
                v-if="showButton(scope.index, scope.row, 1)"
                @click="handlePause(scope.$index, scope.row)"
                >Pause</el-button
              >
              <el-button
                type="danger"
                size="large"
                v-if="showButton(scope.index, scope.row, 2)"
                @click="handleStop(scope.$index, scope.row)"
                >Stop</el-button
              >
              <el-button
                type="primary"
                size="large"
                v-if="showButton(scope.index, scope.row, 3)"
                @click="handleAnalytics(scope.$index, scope.row)"
                >Analytics</el-button
              >
              <el-button
                type="danger"
                size="large"
                v-if="showButton(scope.index, scope.row, 4)"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
              <el-button
                type="primary"
                size="large"
                @click="downloadConfig(scope.$index, scope.row)"
                style="margin: 10px"
                >Download Configuration</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="width: 90%; margin: 0 auto 4% auto">
      <el-col :span="12">
        <el-button
          type="danger"
          size="large"
          @click="dialogVisible = true"
          align="right"
          >Delete All Data</el-button
        >
      </el-col>
      <el-col :span="12">
        <el-button type="info" size="large" @click="downloadDB()" align="right"
          >Download Database</el-button
        >
      </el-col>
    </el-row>
    <el-dialog
      title="Alle Daten löschen"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>Sure?</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            deleteAll();
          "
          >Ja</el-button
        >
        <el-button @click="dialogVisible = false">Abort</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { com } from "../comHelper";
import hash from "object-hash";

export default {
  data() {
    return {
      search: "",
      loading: true,
      dialogVisible: false,
    };
  },
  methods: {
    downloadDB() {
      var xhttp = new XMLHttpRequest();
      xhttp.responseType = "blob";
      xhttp.onload = function () {
        let url = URL.createObjectURL(this.response);
        var hiddenElement = document.createElement("a");
        hiddenElement.style.display = "none";
        hiddenElement.href = url;
        hiddenElement.target = "_blank";
        hiddenElement.download = "experiments.db";
        hiddenElement.click();
        document.body.removeChild(hiddenElement);
        URL.revokeObjectURL(url);
      };

      com(xhttp, this.$store.state, "/downloadDB", null);
    },
    downloadConfig(index, row) {
      var xhttp = new XMLHttpRequest();
      xhttp.responseType = "blob";
      xhttp.onload = function () {
        let url = URL.createObjectURL(this.response);
        var hiddenElement = document.createElement("a");
        hiddenElement.style.display = "none";
        hiddenElement.href = url;
        hiddenElement.target = "_blank";
        hiddenElement.download =
          "experimentSettings_" + row.date + "_" + row.name + ".json";
        hiddenElement.click();
        document.body.removeChild(hiddenElement);
        URL.revokeObjectURL(url);
      };

      com(xhttp, this.$store.state, "/downloadSettings", row.expid);
    },
    deleteAll() {
      var xhttp = new XMLHttpRequest();
      let comp = this;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          comp.$store.state.emptyView();
          comp.$store.state.selectedExp = -1;
        } else if (this.readyState == 4) {
          comp.$message({
            message: "Fehler: Löschen gescheitert " + xhttp.responseText,
            dangerouslyUseHTMLString: true,
            type: "error",
          });
        }
      };
      com(xhttp, this.$store.state, "/deleteAll", null);
      //xhttp.open("GET", "http://localhost:3001/deleteAll", true);
      //xhttp.send();
    },
    onSubmit() {},
    myFilter(data) {
      let res = false;
      let searchString = this.search.toLowerCase();
      //console.log(searchString);
      for (var element in data) {
        res =
          res || data[element].toString().toLowerCase().includes(searchString);
      }
      return res;
    },
    handleContinue(index, row) {
      this.cusXHRRequest(
        "POST",
        "/continue",
        row.expid,
        null,
        "Error: Cannot continue"
      );
    },
    handlePause(index, row) {
      this.cusXHRRequest(
        "POST",
        "/pause",
        row.expid,
        null,
        "Error: Pausing failed"
      );
    },
    handleStop(index, row) {
      this.cusXHRRequest(
        "POST",
        "/stop",
        row.expid,
        null,
        "Error: Stopping failed"
      );
    },
    handleDelete(index, row) {
      this.cusXHRRequest(
        "POST",
        "/delete",
        row.expid,
        null,
         "Error: Deletion failed"
      );
      if (this.$store.state.selectedExp == row.expid) {
        this.$store.state.selectedExp = -1;
        this.$store.state.emptyView();
      }
    },
    cusXHRRequest(method, route, data, msgSucess, msgFail) {
      var xhttp = new XMLHttpRequest();
      let comp = this;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (msgSucess)
            comp.$message({
              message: msgSucess + " " + xhttp.responseText,
              dangerouslyUseHTMLString: true,
              type: "success",
            });
        } else if (this.readyState == 4) {
          if (msgFail)
            comp.$message({
              message: msgFail + " " + xhttp.responseText,
              dangerouslyUseHTMLString: true,
              type: "error",
            });
        }
      };
      /*xhttp.open(method, "http://localhost:3001" + route, true);
      if (data) xhttp.send(data);
      else xhttp.send();*/

      com(xhttp, this.$store.state, route, data);
    },
    showButton(index, row, butID) {
      //Compare https://www.tjvantoll.com/2013/03/14/better-ways-of-comparing-a-javascript-string-to-multiple-values/
      //For keywords see: GenericExperimentStatus.ts

      switch (butID) {
        case 0: //start
          if (["angehalten"].indexOf(row.status) >= 0) return true;
          return false;
        case 1: //pause
          if (["laufend"].indexOf(row.status) >= 0) return true;
          return false;
        case 2: //stop
          if (["ausstehend", "laufend", "angehalten"].indexOf(row.status) >= 0)
            return true;
          return false;
        case 3: //Analyse
          return true;
        case 4: //Löschen
          if (["abgebrochen", "abgeschlossen", "abgestürzt"].indexOf(row.status) >= 0)
            return true;
          return false;
      }
    },
    handleAnalytics(index, row) {
      this.$store.state.emptyView();
      this.$store.state.selectedExp = row.expid;
      this.$store.state.updateReports();
    },
    updateTable() {
      var xhttp = new XMLHttpRequest();
      let comp = this;

      xhttp.timeout = comp.$store.state.timeout; // time in milliseconds; // time in milliseconds

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.response);
          comp.$store.state.versionHash = data["versionHash"];
          comp.$store.state.versionDate = data["versionDate"];
          comp.$store.state.tableData = data["tabledata"];

          comp.loading = false;
        } else if (this.readyState == 4 && this.status != 204) {
          if (!comp.loading) {
            comp.$message({
              message: "Fehler: Server nicht erreichbar" + xhttp.responseText,
              dangerouslyUseHTMLString: true,
              type: "error",
            });
          }
          //comp.loading = true;
        }

        if (this.readyState == 4)
          setTimeout(comp.updateTable, comp.$store.state.updateFreq);
      };

      let msg = hash(comp.$store.state.tableData);
      console.log(msg);
      if (comp.loading) msg = "0";

      com(xhttp, this.$store.state, "/getExp", msg);
      //xhttp.open("GET", "http://localhost:3001/getExp", true);
      //xhttp.send();
    },
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
  },
  mounted() {
    this.updateTable();
  },
};
</script>