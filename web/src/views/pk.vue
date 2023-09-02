<template>
  <div class="main" ref="parent">
    <canvas ref="canvas"/>
  </div>
</template>

<script setup>
import {GameMap} from '@/scripts/gameMap.js'
import { onMounted } from 'vue'
const parent=ref(null)
const canvas=ref(null)
onMounted(()=>{
  new GameMap(parent.value,canvas.value.getContext('2d'))
})
</script>

<style lang="less" scoped>
  .main{
    width: 60vw;
    height: 70vh;
    margin: 2em auto;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
