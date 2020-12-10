var Play = 1;
var End = 0;
var gameStates = Play;
var ground
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, survivalTime

function preload(){
  
  monkey_collided = loadAnimation("sprite_8.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.x=ground.width/2;
  
  FoodGroup = new Group();
  
  obstacleGroup = new Group();
  
  survivalTime = 0;
  
}


function draw() {
 background("white");
  
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival "+"Time = "+survivalTime,100,50);
  
  if(gameStates === Play){
    
    
    survivalTime = Math.ceil(frameCount/frameRate());
    
    
    ground.velocityX = -4;
  
    if(keyDown("space") && monkey.y >= 250){
       monkey.velocityY = -12;
}  

    monkey.velocityY = monkey.velocityY +0.8;
      
  if(obstacleGroup.isTouching(monkey)){
    gameStates = End;
  }
  
  }else if(gameStates === End){
    
   obstacleGroup.setVelocityXEach(0); 
   FoodGroup.setVelocityXEach(0);
   monkey.changeAnimation("sprite_8.png",monkey_collided);
    
    
    
     }
  
  
 
  
if(ground.x < 0){
  ground.x=ground.width/2;
}
  
  console.log(monkey.y);
  

  
  monkey.collide(ground);
  

   

  
  food();
  
  obstacle();
  
  drawSprites();
  
}

function food(){
  
  if(frameCount % 80 === 0){
    banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = -1;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
    
    FoodGroup.add(banana);
    
  }
}

function obstacle(){
  
  if(frameCount % 300 === 0){
    rock = createSprite(400,327,20,20);
    rock.addImage(obstaceImage);
    rock.scale = 0.1;
    rock.velocityX = -8;
    rock.lifetime = -1;
    
    obstacleGroup.add(rock);
    
  }
}



