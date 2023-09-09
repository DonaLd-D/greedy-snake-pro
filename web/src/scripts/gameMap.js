import { GameObj } from "./gameObj";
import { Snake } from "./snake";
import {Wall} from './wall.js'

export class GameMap extends GameObj{
  constructor(parent,ctx){
    super()
    this.parent=parent
    this.ctx=ctx

    this.edge=0
    this.rows=13
    this.cols=13

    this.bricks=20
    this.walls=[]
    
    this.snakes=[new Snake({id:0,color:'#f00',r:this.rows-2,c:1},this),new Snake({id:1,color:'#00f',r:1,c:this.cols-2},this)]
  }
  check(mat,sx,sy,tx,ty){
    if(sx==tx&&sy==ty) return true
    mat[sx][sy]=true
    let dx=[-1,0,1,0],dy=[0,1,0,-1]
    for(let i=0;i<4;i++){
      let nx=sx+dx[i],ny=sy+dy[i]
      if(nx<0||nx>=this.rows||ny<0||ny>=this.cols) continue
      if(!mat[nx][ny]&&this.check(mat,nx,ny,tx,ty)) return true
    }
    return true
  }
  build_walls(){
    let mat=[]
    for(let i=0;i<this.rows;i++){
      mat[i]=[]
      for(let j=0;j<this.cols;j++){
        mat[i][j]=false
      }
    }
    //四周画墙
    for(let i=0;i<this.rows;i++){
      mat[i][0]=true
      mat[i][this.cols-1]=true
    }
    for(let j=0;j<this.cols;j++){
      mat[0][j]=true
      mat[this.rows-1][j]=true
    }
    //随机画墙
    for(let i=0;i<this.bricks/2;i++){
      for(let j=0;j<1000;j++){
        let r=parseInt(Math.random()*13)
        let c=parseInt(Math.random()*13)
        if(mat[r][c]) continue
        if(r==1&&c==this.cols-2||r==this.rows-2&&c==1) continue
        //对称的障碍物
        mat[r][c]=true
        mat[c][r]=true
        break
      }
    }
    let copy_mat=JSON.parse(JSON.stringify(mat))
    //检查连通性
    if(!this.check(copy_mat,1,this.cols-2,this.rows-2,1)) return false
    //连通就可以建墙
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
        if(!mat[i][j]) continue
        this.walls.push(new Wall(i,j,this))
      }
    }
    return true
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
    for(let i=0;i<1000;i++){
      if(this.build_walls()) break
    }
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
