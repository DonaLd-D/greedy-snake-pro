import { GameObj } from "./gameObj";
import { Snake } from "./snake";
import {Wall} from './wall.js'

export class GameMap extends GameObj{
  constructor(parent,ctx,g){
    super()
    this.parent=parent
    this.ctx=ctx
    this.g=g

    this.edge=0
    this.rows=13
    this.cols=13

    this.bricks=20
    this.walls=[]
    
    this.snakes=[new Snake({id:0,color:'#f00',r:this.rows-2,c:1},this),new Snake({id:1,color:'#00f',r:1,c:this.cols-2},this)]
  }
  
  build_walls(){
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
        if(this.g[i][j]==0) continue
        this.walls.push(new Wall(i,j,this))
      }
    }
  }
  //监听键盘输入事件
  handle_events(){
    this.ctx.canvas.focus()
    const [snake0,snake1]=this.snakes
    this.ctx.canvas.addEventListener('keydown',e=>{
      const t=e.key
      const k2i0={'w':0,'d':1,'s':2,'a':3}
      const k2i1={'ArrowUp':0,"ArrowRight":1,"ArrowDown":2,"ArrowLeft":3}
      if(t in k2i0) snake0.set_direction(k2i0[t])
      else snake1.set_direction(k2i1[t])
    })
  }
  check_ready(){ //检测蛇是否可以移动
    for(let snake of this.snakes){
      if(snake.status!="idle") return false;
    }
    return true;
  }
  check_valid(cell){ //检测蛇是否死亡
    for(let wall of this.walls){
      if(cell.r==wall.r&&cell.c==wall.c) return false;
    }
    for(let snake of this.snakes){
      let len=snake.cells.length;
      for(let i=0;i<(len>=5?len-1:len);i++){
        if(cell.r==snake.cells[i].r&&cell.c==snake.cells[i].c) return false;
      }
    }
    return true;
  }
  start(){
    this.build_walls()
    this.handle_events()
  }
  update_size(){
    //计算边长
    this.edge=parseInt(Math.min(this.parent.clientWidth/this.rows,this.parent.clientHeight/this.cols))
    this.ctx.canvas.width=this.edge*this.rows
    this.ctx.canvas.height=this.edge*this.cols
  }
  update(){
    this.update_size()
    if(this.check_ready()){
      for(let snake of this.snakes){
        if(snake.direction!=-1) snake.handle_next()
      }
    }
    this.render()
  }
  render(){
    //画页面
    let odd_color='#0ff',even_color='#aff'
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
        if((i+j)%2==0) this.ctx.fillStyle=even_color
        else this.ctx.fillStyle=odd_color
        this.ctx.fillRect(i*this.edge,j*this.edge,this.edge,this.edge)
      }
    }
  }
}
