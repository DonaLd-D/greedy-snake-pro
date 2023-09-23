<template>
  <container>
      user
  </container>
  
</template>

<script setup>
import container from '@/components/container.vue'
import { addBot, deleteBot, updateBot, getBots } from '@/api/user.js'

// const data = { title: "xyz", desc: "123", code: "asdfg" }
// addBot(data).then(res => {
//   console.log(res.msg)
// })
// const data = { id: 8 }
// deleteBot(data).then(res => {
//   console.log(res.msg)
// })

// const data = { id: 5, title: "xxxyyy", desc: "xxxxxxx", code: "yyyyyyyyy" }
// updateBot(data).then(res => {
//   console.log(res.msg);
// })

getBots().then(res => {
  console.log(res)
})
</script>

<style>

</style>
