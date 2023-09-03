import { GameObj } from "./gameObj";
import { Cell } from "./cell";

export class Snake extends GameObj{
  constructor(info,gameMap){
    super()
    this.id=info.id
    this.color=info.color
    this.gm=gameMap
    this.cells=[new Cell(info.r,info.c)]

  }
  start(){

  }
  update(){
    this.render()
  }
  render(){
    const edge=this.gm.edge
    const ctx=this.gm.ctx
    ctx.fillStyle=this.color
    for(let cs of this.cells){
      ctx.beginPath()
      ctx.arc(cs.x*edge,cs.y*edge,edge/2,0,Math.PI*2)
      ctx.fill()
    }
  }
}
