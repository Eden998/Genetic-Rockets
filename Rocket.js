class Rocket{
  constructor(dna){
    this.pos = createVector(width / 2, height - 5);
    this.size = [5, 25];
    this.vel = createVector();
    this.acc = createVector();
    if (dna){
      this.dna = dna;
    }
    else{
      this.dna = new DNA();
    }
    this.fitness = 0;
    this.completed = false;
    this.crashed = false;
  }
  
  update(){
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < arrival_distance){
      this.completed = true;
      this.pos = target.copy();
    }
    this.applyForce(this.dna.genes[count]);
    if (!this.complete && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  calcFitness(){
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    if (this.crashed){
      this.fitness /= 100;
    }
    
    if (this.completed){
      this.fitness *= 10;
    }
  }

  is_crashed(obstacle){
    if(obstacle.pos.x - obstacle.size_x / 2 <= this.pos.x && this.pos.x <= obstacle.pos.x + obstacle.size_x / 2 && obstacle.pos.y - obstacle.size_y / 2 <= this.pos.y && this.pos.y <= obstacle.pos.y + obstacle.size_y / 2){
      this.crashed = true;
    }
    if(this.pos.x < 0 || this.pos.x > width ||this.pos.y < 0 || this.pos.y > height){
      this.crashed = true;
    }
  }
  
  draw(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    fill(255, 100);
    if (this.crashed){
      fill(255, 0, 0, 100);
    }
    else if(this.completed){
      fill(0, 255, 0, 100);
    }
    stroke(0);
    rect(0, 0, this.size[1], this.size[0]);
    pop();
  }
}