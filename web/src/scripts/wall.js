import { GameObj } from "./gameObj";

export class Wall extends GameObj{
  constructor(r,c,GameMap){
    super()
    this.r=r
    this.c=c
    this.ctx=GameMap.ctx
    this.edge=GameMap.edge
  }
  update(){
    this.render()
  }
  render(){
    this.ctx.fillStyle='#ff0'
    this.ctx.fillRect(this.r*this.edge,this.c*this.edge,this.edge,this.edge)
  }
}
