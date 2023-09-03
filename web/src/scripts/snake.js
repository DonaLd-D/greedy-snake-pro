import { GameObj } from "./gameObj";
import { Cell } from "./cell";

export class Snake extends GameObj{
  constructor(info,gameMap){
    super()
    this.id=info.id
    this.color=info.color
    this.gm=gameMap
    this.cells=[new Cell(info.r,info.c)]
    this.speed=5

    this.direction=-1 //-1停止，0，1，2，3表示上右下左
    this.status='idle' //idle停止，move移动，die结束
  }
  set_direction(d){
    this.direction=d
  }
  start(){

  }
  handle_next(){
    const dx=[-1,0,1,0],dy=[0,1,0,-1]
    const d=this.direction
    const head=new Cell(this.cells[0].r+dx[d],this.cells[0].c+dy[d])
    this.cells.unshift(head)
    if(this.cells.length>=6){
      this.cells.pop()
    }
    this.direction=-1
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
