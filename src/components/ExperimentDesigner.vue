<template>
  <div>
    <el-form :inline="true" :model="config" class="demo-form-inline">
      <el-form-item label="Server">
        <el-input :disabled="true" :value="'http://localhost:3001'"></el-input>
      </el-form-item>
      <el-form-item label="Environment">
        <el-select v-model="environment" placeholder="Environment">
          <el-option
            v-for="(item, index) in this.env"
            :key="index"
            v-bind:label="item"
            v-bind:value="item"
          ></el-option>
          <!--
          <el-option label="localhost" value="1"></el-option>
          <el-option label="wbk-Server" value="1"></el-option>
          -->
        </el-select>
      </el-form-item>
      <div></div>

      <el-form-item label="Name of the Experiment">
        <el-input v-model="name" placeholder="Name"></el-input>
      </el-form-item>
      <div></div>

      <div></div>
      <el-form-item>
        <input
          type="file"
          @change="configImport"
          style="display: none"
          id="input"
        />
        <input
          type="file"
          @change="csvUp"
          style="display: none"
          id="csvInput"
        />
        <el-button @click="upload()" type="primary"
          >Upload Configuration</el-button
        >
        <el-button @click="switchConifgVisibility()" type="warning"
          >Show/Hide Current Configguration</el-button
        >
      </el-form-item>
      <div></div>

      <el-form-item>
        <el-button @click="onSubmit()" type="info" class="wbkButtonStyle1"
          >Start Experiment</el-button
        >
      </el-form-item>
      <div></div>

      <el-form-item>
        <el-button @click="uploadCSV()" type="primary"
          >CSV File Upload</el-button
        >
        <el-button @click="requestCSVList()" id="csvButton" type="warning"
          >Show CSV Files</el-button
        >
      </el-form-item>
      <div></div>
      <el-form-item>
        <vue-json-pretty
          :path="'res'"
          :data="csvlist"
          id="csvViewer"
          style="display: none"
        >
        </vue-json-pretty>
      </el-form-item>
      <div></div>
      <el-form-item>
        <vue-json-pretty
          :path="'res'"
          :data="config"
          @click="handleClick"
          id="json"
          style="display: none"
        >
        </vue-json-pretty>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "../style/wbk.css";
import { com } from "../comHelper";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      resource: "",
      environment: "v2",
      config: {},
      env: ["v1", "v2", "ki", "h1", "V2Optimization", "BenchmarkTest"],
      name: "",
      csvlist: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.config.name == "") {
        this.$message({
          message: "Error: Experiment needs a name",
          dangerouslyUseHTMLString: true,
          type: "error",
        });
        return;
      }
      var xhttp = new XMLHttpRequest();
      let that = this;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          that.$message({
            message: "Simulation started",
            dangerouslyUseHTMLString: true,
            type: "success",
          });
        } else if (this.readyState == 4) {
          that.$message({
            message:
              "Error: No Connection to Server" + this.response.$message,
            dangerouslyUseHTMLString: true,
            type: "error",
          });
        }
      };

      if (!this.checkConfig()) return;

      this.config.name = this.name;
      this.config.envConfig.environment = this.environment;
      let msg = JSON.stringify(this.config);
      com(xhttp, this.$store.state, "/start", msg);
    },
    checkConfig() {
      let filter = true;
      filter = filter && !(this.config == {});
      filter = filter && !!this.config["envConfig"];
      filter = filter && !!this.config["mlconfigL"];
      filter = filter && !!this.config["mlconfigN"];

      if (!filter) {
        this.$message({
          message:
            "Configuration file has not the correct form.",
          dangerouslyUseHTMLString: true,
          type: "error",
        });
        return false;
      }
      this.$message({
        message: "Configuration file seems to be ok!",
        dangerouslyUseHTMLString: true,
        type: "success",
      });
      return true;
    },
    handleClick() {},
    configImport(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.config = JSON.parse(e.target.result);

        if (this.checkConfig()) {
          if (this.config.name) this.name = this.config.name;
          if (this.config.envConfig.environment)
            this.environment = this.config.envConfig.environment;
        }
      };
      reader.readAsText(file);
    },
    csvUp(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      var xhttp = new XMLHttpRequest();
      let that = this;

      reader.onload = (e) => {
        let csv = e.target.result;
        let csvObj = {};
        csvObj["data"] = csv;
        csvObj["name"] = file.name;

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            that.$message({
              message: "Upload successfull!",
              type: "success",
            });
          } else if (this.readyState == 4) {
            that.$message({
              message:
                "Error: No Connection to Server" + this.response.$message,
              dangerouslyUseHTMLString: true,
              type: "error",
            });
          }
        };

        let msg = JSON.stringify(csvObj);
        com(xhttp, this.$store.state, "/uploadCSV", msg);
      };
      reader.readAsText(file);
    },
    upload() {
      document.getElementById("input").click();
    },
    switchConifgVisibility() {
      if (document.getElementById("json").style.display == "none")
        document.getElementById("json").style.display = "block";
      else document.getElementById("json").style.display = "none";
    },
    uploadCSV() {
      document.getElementById("csvInput").click();
    },
    requestCSVList() {
      var xhttp = new XMLHttpRequest();
      let that = this;

      if (document.getElementById("csvViewer").style.display == "none") {
        document.getElementById("csvViewer").style.display = "block";
        document.getElementById("csvButton").innerText =
          "CSV Dateien ausblenden";
      } else {
        document.getElementById("csvViewer").style.display = "none";
        document.getElementById("csvButton").innerText =
          "Vorhandene CSV Dateien anfragen";
        return;
      }

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          try {
            that.csvlist = JSON.parse(this.response);
          } catch {}
        } else if (this.readyState == 4) {
          that.$message({
            message:
              "Error: No Connection to Server" + this.response.$message,
            dangerouslyUseHTMLString: true,
            type: "error",
          });
        }
      };

      com(xhttp, this.$store.state, "/csvlist");
    },
  },
  computed: {},
  watch: {
    resource: function () {
      this.$store.state.selectedAdress = this.resource;
    },
  },
  mounted() {
    //this.resource = this.$store.state.adress[0].adress;
  },
};
</script>
