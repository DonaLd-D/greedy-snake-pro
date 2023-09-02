import { GameObj } from "./gameObj";

export class Wall extends GameObj{
  constructor(r,c,GameMap){
    super()
    this.r=r
    this.c=c
    this.gm=GameMap
  }
  update(){
    this.render()
  }
  render(){
    const edge=this.gm.edge
    const ctx=this.gm.ctx
    ctx.fillStyle='#ff0'
    ctx.fillRect(this.r*edge,this.c*edge,edge,edge)
  }
}
