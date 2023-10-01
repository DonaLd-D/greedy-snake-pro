<template>
  <div class="gamemap" ref="parent" v-show="pkStore.status=='playing'">
    <canvas ref="canvas" tabindex="0"/>
  </div>
  <matching v-show="pkStore.status=='matching'"/>
</template>

<script setup>
import {GameMap} from '@/scripts/gameMap.js'
import { onMounted, watch } from 'vue'
import usePkStore from '@/store/modules/pk';
const pkStore=usePkStore()
import matching from './components/matching.vue'

const parent=ref(null)
const canvas=ref(null)
const socketUrl=`ws://localhost:8080/websocket/${sessionStorage.getItem("token")}/`
const socket=new WebSocket(socketUrl)
onMounted(()=>{
  socket.onopen=()=>{
    console.log("connected!")
    pkStore.updateSocket(socket)
  }
  socket.onmessage=msg=>{
    const data=JSON.parse(msg.data)
    if(data.event=='start'){
      pkStore.updateOpponent({username:data.opponent_username,avatar:data.opponent_avatar})
      pkStore.updateGamemap(data.map);
      new GameMap(parent.value,canvas.value.getContext('2d'),pkStore.gamemap)
      setTimeout(()=>{
        pkStore.updateStatus("playing")
      },1000)
    }
  }
  socket.onclose=()=>{
    console.log("disconnected!")
  }
})

onUnmounted(()=>{
  socket.close()
  pkStore.updateStatus("matching")
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
