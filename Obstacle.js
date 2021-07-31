class Obstacle{
  constructor(pos, size_x, size_y){
    this.pos = pos.copy();
    this.size_x = size_x;
    this.size_y = size_y
  }
  
  draw(){
    fill(255);
    stroke(0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.size_x, this.size_y);
  }
}