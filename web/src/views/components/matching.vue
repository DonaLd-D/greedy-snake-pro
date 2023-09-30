<template>
  <div class="main">
    <div class="matching">
      <div class="left">
        <img :src="userStore.avatar" alt="#">
        <div>{{ userStore.username }}</div>
      </div>
      <div class="right">
        <img :src="pkStore.opponent_avatar" alt="#">
        <div>{{ pkStore.opponent_username }}</div>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button type="warning" size="large" class="btn" @click="handle">
      {{ status }}
      </el-button>
    </div>
    
  </div>
</template>

<script setup>
import useUserStore from '@/store/modules/user.js'
const userStore=useUserStore()
import usePkStore from '@/store/modules/pk.js'
const pkStore=usePkStore()


const status=ref("开始匹配")
const handle=()=>{
  if(status.value=="开始匹配"){
    status.value="取消"
    pkStore.socket.send(JSON.stringify({event:'start'}))
  }else{
    status.value="开始匹配"
    pkStore.socket.send(JSON.stringify({event:'stop'}))
  }
}
</script>

<style lang='less' scoped>
.main{
  width: 60vw;
  height: 60vh;
  background-color: rgba(50, 50, 50, 0.5);
  margin:2em auto;
  border-radius: 5px;
}
.matching{
  display: flex;
  justify-content: space-around;
  padding-top: 1em;
  >div>img{
    width: 220px;
    height: 220px;
    border-radius: 50%;
  }
  >div>div{
    text-align: center;
    color: aliceblue;
    margin-top: 1em;
  }
}

.btn{
  margin-top: 15vh;
}
</style>
