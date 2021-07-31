let rocket;
let population;
let population_size = 50;
let lifespan = 500;
let target;
let count = 0;
let arrival_distance = 16;
let obstacles = [];
let genes_vectors_length = 0.2;

function setup() {
  createCanvas(400, 400);
  population = new Population();
  target = createVector(width/2, 50);
  obstacles.push(new Obstacle(createVector(width/2, 150), 200, 20));
  obstacles.push(new Obstacle(createVector(width/2 + 100, 280), 250, 20));
}

function draw() {
  background(0);
  circle(target.x, target.y, arrival_distance);
  population.update();
  population.draw();
  
  if (count == lifespan){
    population.evaluate();
    population.selection();
    count = 0;
  }
  
  population.check_crashed(obstacles);
  
  for (let i = 0 ; i < obstacles.length ; i++){
    obstacles[i].draw();
  }
  count++;
}