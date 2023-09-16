<template>
  <navbar/>
  <router-view/>
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
</style>
