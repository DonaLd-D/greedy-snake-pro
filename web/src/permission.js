import router from './router'

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  const token=sessionStorage.getItem('token')
  if (token) {
    next()
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
