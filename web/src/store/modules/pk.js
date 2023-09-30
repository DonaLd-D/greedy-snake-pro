
const usePkStore = defineStore(
  'pk',
  {
    state: () => ({
      status:"matching",
      socket:null,
      opponent_username:"我的对手",
      opponent_avatar:'https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png',
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
