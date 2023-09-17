import router from './router'
import useUserStore from './store/modules/user'

const whiteList = ['/login', '/register']

router.beforeEach(async(to, from, next) => {
  const token=sessionStorage.getItem('token')
  if (token) {
    if(useUserStore().username==""){
      await useUserStore().toGetInfo()
    }
    if(whiteList.indexOf(to.path) !== -1){
      next('/')
    }else{
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
  }
})

router.afterEach(() => {
  
})
