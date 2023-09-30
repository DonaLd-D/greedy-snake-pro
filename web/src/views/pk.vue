<template>
  <div class="gamemap" ref="parent" v-if="pkStore.status=='playing'">
    <canvas ref="canvas" tabindex="0"/>
  </div>
  <matching v-if="pkStore.status=='matching'"/>
</template>

<script setup>
import {GameMap} from '@/scripts/gameMap.js'
import { onMounted } from 'vue'
import usePkStore from '@/store/modules/pk';
import useUserStore from '@/store/modules/user'
const pkStore=usePkStore()
const userStore=useUserStore()
import matching from './components/matching.vue'

const parent=ref(null)
const canvas=ref(null)
onMounted(()=>{
  if(pkStore.status=='playing'){
    new GameMap(parent.value,canvas.value.getContext('2d'))
  }
  
})

const socketUrl=`ws://localhost:8080/websocket/${sessionStorage.getItem("token")}/`
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
  .gamemap{
    width: 60vw;
    height: 70vh;
    margin: 2em auto;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
