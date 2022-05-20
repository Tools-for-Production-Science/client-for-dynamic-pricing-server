<template>
  <div id="app">    
    <ExperimentDesigner />
    <el-divider></el-divider>
    <Experiments />
    <el-divider></el-divider>
    <Results />
  </div>
</template>

<script>
import ExperimentDesigner from "./components/ExperimentDesigner";
import Experiments from "./components/Experiments";
import Results from "./components/Results";
export default {
  name: "App",
  components: {
    ExperimentDesigner,
    Experiments,
    Results
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
