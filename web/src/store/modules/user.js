import { login,getInfo } from "../../api/user"
import router from '../../router'

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      username:"",
      avatar:"",
      userId:""
    }),
    actions: {
      toLogin(username,password){
        login(username,password).then(res=>{
          sessionStorage.setItem("token",res.token)
          router.push({path:"/"})
        })
      },
      toGetInfo(){
        getInfo().then(res=>{
          console.log("success",res)
          this.username=res.username
          this.avatar=res.avatar
          this.userId=res.id
        })
      },
      logout(){
        this.username="",
        this.avatar=""
        sessionStorage.removeItem("token")
      }
    }
  })

export default useUserStore
