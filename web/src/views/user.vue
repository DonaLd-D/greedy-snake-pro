<template>
  <div class="user">
    <div class="img">
      <img :src="img" alt="">
    </div>
    <div class="list">
      <div class="header">
        <div>我的bots</div>
        <el-button type="primary" @click="show=true">添加</el-button>
      </div>
      <el-table :data="tdata" stripe style="width: 100%;">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="createtime" label="创建日期"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="toEdit(scope.$index)">编辑</el-button>
            <el-button size="small" type="danger" @click="delBot(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog v-model="show" :title="isEdit?'编辑bot':'添加bot'" width="35%">
    <el-form :model="form" :rules="rules" label-position="top" ref="myForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"/>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入描述" :rows="2"/>
      </el-form-item>
      <el-form-item label="代码" prop="code">
        <VAceEditor
          v-model:value="form.code"
          class="vue-ace-editor"
          lang="java"
          theme="monokai"
          :options="{
            useWorker: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
          }"
        />
        <!-- <el-input v-model="form.code" type="textarea" placeholder="请输入代码" :rows="3"/> -->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="add">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { VAceEditor } from 'vue3-ace-editor';
import "@/utils/ace-config.js"

import { addBot, deleteBot, updateBot, getBots } from '@/api/user.js'
import useUserStore from "@/store/modules/user.js";
import { reactive } from 'vue';
const userStore = useUserStore();
const img = userStore.avatar

const tdata = ref([])
const getList=()=>{
  getBots().then(res => {
    tdata.value=res;
  })
}
getList()

const show=ref(false)

const form = reactive({
  title:"",
  desc:"",
  code:""
})
const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 1, max: 100, message: '长度在1到100', trigger: 'blur' },
  ],
  desc: [
    { required: false, message: '请输入描述', trigger: 'blur' },
    { min: 0, max: 300, message: '长度在0到300', trigger: 'blur' },
  ],
  code: [
    { required: false, message: '请输入代码', trigger: 'blur' },
    { min: 1, max: 10000, message: '长度在1到10000', trigger: 'blur' },
  ],
})

//添加
const myForm=ref()
const add=()=>{
  myForm.value.validate((valid, fields) => {
    if (valid) {
      if(isEdit.value){
        toUpdate(update_id.value)
        isEdit.value=false
        return
      }
      addBot(form).then(res=>{
        show.value=false;
        for(let key in form){
          form[key]=""
        }
        getList()
        ElMessage({
          message: res.msg,
          type: 'success',
        })
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

//删除
const delBot=(id)=>{
  ElMessageBox.confirm(
    '确认要删除吗？？',
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    deleteBot(id).then(res=>{
      ElMessage({
        type: 'success',
        message: res.msg,
      })
      getList()
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '删除取消',
    })
  })
}

const isEdit=ref(false)
const update_id=ref(null)
//改
const toEdit=(index)=>{
  isEdit.value=true
  show.value=true
  let {id,title,description,code}=tdata.value[index]
  update_id.value=id
  form.title=title
  form.desc=description
  form.code=code
}

const toUpdate=(id)=>{
  const data={id,...form}
  updateBot(data).then(res=>{
    ElMessage({message: res.msg,type: 'success'})
    show.value=false
    getList()
  })
}

</script>

<style lang="less" scoped>
.user{
  width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
  background-color: transparent;
  display: flex;

}
.img{
  width: 200px;
  height: 200px;
  border: 5px solid #fff;
  >img{
    width: 100%;
    height: 100%;
  }
}

.list{
  flex: 1;
  margin-left: 1em;
  padding: 1em;
  background-color: #fff;
  >.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.vue-ace-editor{
  font-size: 16px;
  border: 1px solid;
  flex: 1;
  height: 300px;
}
</style>
