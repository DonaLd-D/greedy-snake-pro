<template>
  <container>
      <el-form ref="ruleForm" :model="form" :rules="rules" :hide-required-asterisk="true" label-width="120px" class="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password0">
          <el-input type="password" v-model="form.password0" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submitForm">注册</el-button>
        </el-form-item>
      </el-form>
  </container>
</template>

<script setup>
import container from '@/components/container.vue'
import { reactive } from 'vue';
import { register } from '@/api/user.js'
import { useRouter } from "vue-router"
const router = useRouter()

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  password0: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
  ]
})
const form = reactive({
  username: "",
  password: "",
  password0: "",
})

const ruleForm = ref()
const submitForm = () => {
  ruleForm.value.validate((valid, fields) => {
    if (valid) {
      register(form.username, form.password, form.password0).then(res => {
        ElMessage(res.msg)
        router.push('login')
      })
    } else {
      ElMessage.error('Oops,error submit!')
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang='less' scoped>
.form {
  width: 22vw;
  margin: 5vh auto;
}
</style>
