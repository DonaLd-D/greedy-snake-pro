import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import "normalize.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app=createApp(App)
app.use(router)
app.use(store)
for (const key in ElementPlusIconsVue){
  app.component(key, ElementPlusIconsVue[key])
}

import './permission.js'

app.mount('#app')
