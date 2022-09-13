var PLAY = 1;
var END = 0;
var gameState = PLAY;

var megaman, megaman_correndo, megaman_collided;
var fundo, chao_invisivel, fundoIMG;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg;
var gameOver, restart;


function preload(){
  megaman_correndo = loadAnimation("Sem título.png","megaman.png");
  
  megaman_collided = loadAnimation("megamandano.png");

  fundoIMG = loadImage("paisagem-linda-do-verão-rural-planície-com-árvores-e-arbustos-no-horizonte-perfeita-estilo-de-desenho-animado-beleza-romântica-230041967.jpg");
                                                                                                                                                                                    
  
  
  obstacle1 = loadImage("7eaad4fd48b806a6c8813dd0d775e526-removebg-preview.png");
  obstacle2 = loadImage("pngtree-hand-drawn-cartoon-tree-material-paintedhand-drawn-plantsapple-png-image_604799-removebg-preview.png");
  obstacle3 = loadImage("065c369b55eb231d7e6a5fdc37297279-removebg-preview.png");
  obstacle4 = loadImage("6696134-arvore-desenho-ilustracao-isolado-em-fundo-branco-vetor-removebg-preview.png");
  obstacle5 = loadImage("árvore-grande-dos-desenhos-animados-75316382-removebg-preview.png");
  obstacle6 = loadImage("d0cc0ee448b6686a2d38b68ae5645696-removebg-preview.png");
  
   restartImg = loadImage("5277836.png");
  gameOverImg = loadImage("99937628-ACx1rdyNl7nNN3szhsbiWtU6aP5HaD1U-cropped-3x2-browser.png");
   
}

function setup() {
  frameRate(30);
  createCanvas(600, 400);
  
  
  fundo = createSprite(200,180,400,20);
  fundo.addImage("fundo",fundoIMG);
  fundo.x = fundo.width /2;

  megaman = createSprite(50,300,20,50);
  megaman.addAnimation("correndo", megaman_correndo);
  megaman.scale = 0.3;

  megaman.addAnimation("collided", megaman_collided);
  
  
    gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 0.2;
  chao_invisivel = createSprite(200,300,400,10);
  chao_invisivel.visible = false;
  
  

  obstaclesGroup = createGroup();
 
  
  console.log("Hello" + 5);
  
  megaman.setCollider("circle",0,0,40);
  megaman.debug = false;
  
  score = 0;
}

function draw() {
  console.log(frameRate);
  background(180);
  
  text("Score: "+ score, 500,50);
  
    console.log("this is ",gameState)

   
    

  
  if(gameState === PLAY){
     gameOver.visible = false
    restart.visible = false
    
    fundo.velocityX = -4;
    
    
    score = score + Math.round(frameCount/60);
    
    if (fundo.x < 0){
      fundo.x = fundo.width/2;
      
    }

   
    
   
    if(keyDown("space")&& megaman.y >= 165) {
        megaman.velocityY = -13;
    }
    
   
    megaman.velocityY = megaman.velocityY + 0.8
  
  

  
  
    spawnObstacles();

    
      
    
    
    if(obstaclesGroup.isTouching(megaman)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      
      fundo.velocityX = 0;
      megaman.velocityY=0;
      gameOver.visible = true;
    restart.visible = true;
     obstaclesGroup.setVelocityXEach(0);
     

     obstaclesGroup.setLifetimeEach(-1);
  

     megaman.changeAnimation("collided", megaman_collided);


     
     
   }

   if (mousePressedOver(restart)){
    console.log("reinciar jogo");
    reset();
   }


     
 

  megaman.collide(chao_invisivel);
  
  
  
  drawSprites();
}

function reset (){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  megaman.changeAnimation("correndo", megaman_correndo);

  obstaclesGroup.destroyEach();
  
  score = 0;
}



function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,300,10,40);
   obstacle.velocityX = -6;
   
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
            
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   

    obstaclesGroup.add(obstacle);
 }
}


    


