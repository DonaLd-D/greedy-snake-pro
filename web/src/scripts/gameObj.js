const arr=[]

export class GameObj{
  constructor(){
    arr.push(this)
    this.timeStamp=0
    this.started=false
  }
  start(){

  }
  update(){

  }
  before_destroy(){

  }
  destroy(){
    this.before_destroy()
    for(let i in arr){
      if(arr[i]==this) arr.splice(i)
      break
    }
  }
}

let last_timeStamp=null

const step=(timeStamp)=>{
  for(let gameObj of arr){
    if(!gameObj.started){
      gameObj.started=true
      gameObj.start()
    }else{
      gameObj.timeStamp=timeStamp-last_timeStamp
      gameObj.update()
    }
  }
  last_timeStamp=timeStamp
  requestAnimationFrame(step)
}

requestAnimationFrame(step)
