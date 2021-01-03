
var monkey , runningMonkeyAnimation, monkeyGroup;
var bananaGroup, bananaImage;
var obstacleGroup, obstacleImage;
var survivalTime = 0;
var gameState = "intro";
var ground;
var rand;

function preload(){
  runningMonkeyAnimation = loadAnimation("monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png","monkey6.png","monkey7.png","monkey8.png", "monkey8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("rock.png");
 
}
function setup() {
  createCanvas(600, 600); 

  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  monkeyGroup = createGroup();

  monkey = createSprite(-50, 350, 10, 10);
  monkey.addAnimation("monkeyRunning", runningMonkeyAnimation);
  monkey.scale = 0.15;
  monkeyGroup.add(monkey);
  monkey.setCollider("circle");
}
function draw() {
  background(0);
  ground = createSprite(300, 400, 600, 15);
  drawSprites();

  fill("white");
  textSize(20);
  text("survival Time:"+survivalTime, 420, 25);

  if(gameState === "intro"){
    fill("white");
    textSize(50);
    text("Monkey", 210, 185);
    text("Jump", 230, 235);
    textSize(20);
    text("press space to start", 210, 265);
    survivalTime = frameCount;
    survivalTime = 0;
  }
  if(keyDown("space") && gameState === "intro"){
    gameState = "start";
  }
  if(gameState === "start"){
    monkey.velocityX = 1;
    survivalTime = frameCount;
    survivalTime = 0;
  }
  if(gameState === "start" && monkey.x === 100){
    monkey.velocityX = 0;
    gameState = "frameCountReset";
  }
  if(gameState === "frameCountReset"){
    frameCount = 0;
    gameState = "play";
  }
  if(gameState === "play"){
    monkey.velocityY = monkey.velocityY+1;
    monkey.collide(ground);
    spawnObstacles();
    spawnBanana();

    survivalTime = frameCount;

    if(monkey.y > 340 && keyDown("space")){
      monkey.velocityY = -20;
    }
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }

    if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.lifetime = -1;
      bananaGroup.lifetime = -1;
      monkey.velocityY = 0;
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      monkey.visible = false;
      gameState = "end";
    }
  }
  if(gameState === "end"){
    text("OH NO YOU LOST!", 200, 300);
    text("Press Space to Restart",190, 330);
  }
  if(keyDown("space") && gameState === "end"){
    monkey.visible = 
    gameState = "start";
  }
}
function spawnObstacles(){  
  if(frameCount  % 300 === 0){
    var obstacle = createSprite(700, 355, 10, 10);
    obstacle.scale = 0.14;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 150;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 120);
  }
}
function spawnBanana(){
  if(frameCount % 80 === 0){
    rand = Math.round(random(120, 300));
    var banana = createSprite(700, rand, 10, 10);
    banana.scale = 0.15;
    banana.addImage(bananaImage);
    banana.lifetime = 150;
    banana.velocityX = -5;
    bananaGroup.add(banana);
    banana.setCollider("rectangle", 0, 20, 500, 150);
  }
}