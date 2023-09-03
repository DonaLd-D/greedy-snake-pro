import { GameObj } from "./gameObj";
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
  start(){
    for(let i=0;i<1000;i++){
      if(this.build_walls()) break
    }
  }
  update_size(){
    //计算边长
    this.edge=parseInt(Math.min(this.parent.clientWidth/this.rows,this.parent.clientHeight/this.cols))
    this.ctx.canvas.width=this.edge*this.rows
    this.ctx.canvas.height=this.edge*this.cols
  }
  update(){
    this.update_size()
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
