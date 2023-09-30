<template>
  <div class="main" ref="parent">
    <canvas ref="canvas" tabindex="0"/>
  </div>
</template>

<script setup>
import {GameMap} from '@/scripts/gameMap.js'
import { onMounted } from 'vue'
import usePkStore from '@/store/modules/pk';
import useUserStore from '@/store/modules/user'
const pkStore=usePkStore()
const userStore=useUserStore()

const parent=ref(null)
const canvas=ref(null)
onMounted(()=>{
  new GameMap(parent.value,canvas.value.getContext('2d'))
  
})

const socketUrl=`ws://localhost:8080/websocket/${userStore.userId}/`
const socket=new WebSocket(socketUrl)
socket.onopen=()=>{
  console.log("connected!")
  pkStore.updateSocket(socket)
}
socket.onmessage=msg=>{

}
socket.onclose=()=>{
  console.log("disconnected!")
}

onUnmounted(()=>{
  socket.close()
})
</script>

<style lang="less" scoped>
  .main{
    width: 60vw;
    height: 70vh;
    margin: 2em auto;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
