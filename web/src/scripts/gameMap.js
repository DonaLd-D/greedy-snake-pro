import { GameObj } from "./gameObj";

export class GameMap extends GameObj{
  constructor(parent,ctx){
    super()
    this.parent=parent
    this.ctx=ctx
    this.edge=0

  }
  start(){

  }
  update(){
    this.edge=Math.min(this.parent.clientWidth/13,this.parent.clientHeight/13)
    this.ctx.canvas.width=this.edge*13
    this.ctx.canvas.height=this.edge*13
    this.render()
  }
  render(){
    this.ctx.fillStyle='blue'
    this.ctx.fillRect(0,0,this.edge*13,this.edge*13)
  }
}
