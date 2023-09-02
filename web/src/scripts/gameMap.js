import { GameObj } from "./gameObj";
import {Wall} from './wall.js'

export class GameMap extends GameObj{
  constructor(parent,ctx){
    super()
    this.parent=parent
    this.ctx=ctx
    this.edge=0
    this.total=20
    this.cnt={}
    this.walls=[]
  }
  create_walls(r,c){
    return new Wall(r,c,this)
  }
  create_random_walls(){
    for(let i=0;i<1000;i++){
      if(this.walls.length>(50+this.total)) break
      let x=1+parseInt(Math.random()*12)
      let y=1+parseInt(Math.random()*12)
      let key=x+'&'+y
      if((x==11&&y==1)||(x==1&&y==11)) continue
      if(key in this.cnt) continue
      else{
        this.cnt[key]=true
        this.walls.push(this.create_walls(x,y,this))
      }
    }
  }
  update(){
    this.edge=parseInt(Math.min(this.parent.clientWidth/13,this.parent.clientHeight/13))
    this.ctx.canvas.width=this.edge*13
    this.ctx.canvas.height=this.edge*13
    this.render()
  }
  render(){
    let odd_color='#0ff',even_color='#aff'
    for(let i=0;i<13;i++){
      for(let j=0;j<13;j++){
        if(i==0||j==0||i==12||j==12){
          this.walls.push(this.create_walls(i,j,this))
          continue
        }
        if((i+j)%2==0) this.ctx.fillStyle=even_color
        else this.ctx.fillStyle=odd_color
        this.ctx.fillRect(i*this.edge,j*this.edge,this.edge,this.edge)
      }
    }
    this.create_random_walls()
  }
}
