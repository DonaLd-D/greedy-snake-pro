<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item class="title" >King of Bots</el-menu-item>
      <el-menu-item index="0">对战</el-menu-item>
      <el-menu-item index="1">对局列表</el-menu-item>
      <el-menu-item index="2">排行榜</el-menu-item>
      <el-menu-item class="exit">
            <div v-if="userStore.username">
              <div>{{ userStore.username }}</div>
              <el-dropdown>
                <el-icon style="color: #fff;"><ArrowDown/></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="toUser">我的bots</el-dropdown-item>
                    <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div v-else>
              <el-button type="primary" plain size="small" @click="$router.push({ path: '/login' })">登录</el-button>
              <el-button type="primary" plain size="small" @click="$router.push({ path: '/register' })">注册</el-button>
            </div>
        </el-menu-item>
      </el-menu>
    </el-header>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '../store/modules/user';
const userStore = useUserStore();

const activeIndex = ref('0')
const paths = ['/pk', '/record', '/rank', '/user']
const router = useRouter()
const route = useRoute()

const handleSelect = (key, keyPath) => {
  router.push({ path: paths[key] })
}
const toUser = () => {
  activeIndex.value = '3'
  router.push({ path: '/user' })
}
watch(route, (val) => {
  activeIndex.value = '' + paths.indexOf(val.path)
})

const logout = () => {
  userStore.logout()
  router.push({ path: '/login' })
}
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}
.title{
  margin-left: 10vw;
  font-weight: bold;
  font-size: 18px;
}
.el-menu-demo{
  position: relative;
}
.exit{
  position: absolute;
  right: 10vw;
  >div{
    display: flex;
    align-items: center;
  }
}
</style>
