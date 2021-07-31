class Population{
  constructor(){
    this.rockets = []
    this.popsize = population_size;
    this.matingpool = [];
    
    for(let i = 0 ; i < this.popsize ; i++){
      this.rockets.push(new Rocket());
    }
  }
  
  evaluate(){
    let maxfit = 0;
    
    //calc fitness and get max fitness
    for(let i = 0 ; i < this.popsize ; i++){
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit){
        maxfit = this.rockets[i].fitness;
      }
    }
    
    //normalize fitness
    for(let i = 0 ; i < this.popsize ; i++){
      this.rockets[i].fitness /= maxfit;
    }
    
    this.matingpool = [];
    for(let i = 0 ; i < this.popsize ; i++){
      let n = this.rockets[i].fitness * 100;
      for(let j = 0 ; j < n ; j++){
        this.matingpool.push(this.rockets[i]);
      }
    }
  }
  
  selection(){
    let newRockets = []
    for (let i = 0 ; i < this.rockets.length ; i++){
      let parentA = random(this.matingpool).dna;
      let parentB = random(this.matingpool).dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }
  
  check_crashed(obstacles){
    for (let i = 0 ; i < this.rockets.length ; i++){
      for (let j = 0 ; j < obstacles.length ; j++){
          this.rockets[i].is_crashed(obstacles[j]);
      }
    }
  }
  
  draw(){
    for(let i = 0 ; i < this.rockets.length ; i++){
      this.rockets[i].draw();
    }
  }
  
  update(){
    for(let i = 0 ; i < this.rockets.length ; i++){
      this.rockets[i].update();
    }
  }
}