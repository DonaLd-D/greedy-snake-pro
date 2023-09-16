<template>
  <navbar/>
  <router-view/>
</template>

<script setup>
import navbar from "./components/navbar.vue"
import { login } from '@/api/user.js'
login("djh", "pdjh").then(res => {
  console.log(res)
})

</script>

<style lang="less">
  #app{
    height: 100vh;
    background-image: url('./assets/bg.png');
    background-size: cover;
  }
</style>
