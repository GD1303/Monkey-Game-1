var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_jumping;
var ground, groundImage, invisible_ground;
var background, backgroundImage;
var banana ,bananaImage, bananaGroup;
var bush, bushImage, bushGroup;
var obstacle, obstacleImage, obstacleGroup;

var survival_time, score;

function preload(){
  groundImage = loadImage("grass.png");
  bushImage = loadImage("bush.png")
  
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  monkey_jumping = loadImage("monkey_3.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 }

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  ground = createSprite(250,windowHeight - 20,1000000000000,50)
  ground.shapeColor = "forestgreen";
  
  monkey = createSprite(40,windowHeight - 35)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  invisible_ground = createSprite(250,windowHeight,1000000000000,1)
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  bushGroup = createGroup();
  
  survival_time = 0;
  score = 0;
}


function draw() {
  background("lightblue");
  
  textSize(13);
  textFont("TimesNewRoman");
  fill("black");
  text("Survival Time: " + survival_time + "s", 10,35);
  
  survival_time = survival_time + Math.round(getFrameRate()/61);
  
  textSize(13);
  textFont("TimesNewRoman");
  fill("black");
  text("Score: " + score,10,20);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 1
  }
  
  if(gameState === PLAY){
    ground.velocityX = -3
    
    if(ground.x < 300){
      ground.x = 330;
    }
    
    if(keyDown("space")){
      monkey.velocityY = -15;
    }
    
    console.log(monkey.y)
    console.log(invisible_ground.y)
    
    if(monkey.y > invisible_ground + 1){
      monkey.addImage("jumping", monkey_jumping)
    }
    
    //console.log(monkey.y)
    //console.log(getFrameRate())
    
    monkey.velocityY = monkey.velocityY + 0.6;
    
    obstacleGroup.depth = bushGroup.depth;
    obstacleGroup.depth = obstacleGroup.depth + 1;
    
    bananas();
    obstacles();
    bush();
  }
  
  invisible_ground.visible = false;
  
  monkey.collide(invisible_ground);
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  if(gameState === END){
    monkey.destroy();
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    bushGroup.destroyEach();
    
    ground.velocityX = 0;
    
    textSize(60);
    textFont("Algerian");
    textAlign(CENTER);
    fill("black");
    text("GAME OVER",windowWidth/2,windowHeight/2);
    
    survival_time = 0;
    score = 0;
  }
  
  drawSprites();
}

function bush(){
  if (frameCount % 140 === 0){
    var bush = createSprite(windowWidth + 30, windowHeight - 80,10,40);
     bush.addImage(bushImage);
     bush.scale = 0.09;
     bush.velocityX = -5;
     bush.lifetime = -1;
    
    bushGroup.add(bush);
    
    monkey.depth = bush.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function bananas(){
 if (frameCount % 80 === 0){
   var banana = createSprite(windowWidth + 30, Math.round(random(windowWidth/2,windowWidth/3)),10,40);
   banana.addImage(bananaImage);
   banana.scale = 0.1;
   banana.velocityX = -5;
   banana.lifetime = -1;
   
   bananaGroup.add(banana);
    }
}

function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(windowWidth + 30, windowHeight - 30,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.5;
   obstacle.velocityX = -5;
   obstacle.lifetime = -1;
   
   obstacle.setCollider("circle",0,0,200)
   obstacle.debug = false;
   
   obstacleGroup.add(obstacle);
  }
}