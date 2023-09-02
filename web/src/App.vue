<template>
  <navbar/>
  <el-card>
    <router-view/>
  </el-card>
</template>

<script setup>
import navbar from "./components/navbar.vue"


</script>

<style lang="less">
  #app{
    height: 100vh;
    background-image: url('./assets/bg.png');
    background-size: cover;
  }
  .el-card{
    width: 1200px;
    margin-left: calc(50vw - 600px);
    margin-top: 1em;
  }
</style>
