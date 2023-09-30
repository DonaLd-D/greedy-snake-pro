
const usePkStore = defineStore(
  'pk',
  {
    state: () => ({
      status:"matching",
      socket:null,
      opponent_username:"",
      opponent_avatar:"",
      gamemap:null,
    }),
    actions: {
      updateSocket(socket){
        this.socket=socket
      },
      updateOpponent(opponent){
        this.opponent_username=opponent.username
        this.opponent_avatar=opponent.avatar
      },
      updateStatus(status){
        this.status=status
      }
      
    }
  })

export default usePkStore
