var person,personImg;
var corona_img,corona_img1,corona_img2,corona;
var score = 0;
var flu,flu1,flu2;
var virusGroup,fluGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart_img,restart,gameover,gamover_img;
var bg;



function preload() {
  personImg = loadImage('karthika.png');
  corona_img = loadImage('vasan.png');
  corona_img1 = loadImage('malar.png');
  corona_img2 = loadImage('covid.png');
  flu1 = loadImage('flu2.png'); 
  flu2 = loadImage('covid1.png');
  restart_img = loadImage('restart.png');
  gamover_img = loadImage('gameover.png');
  bg = loadImage('bg.png');
  }




function setup() {
createCanvas(1000,900);

person = createSprite(500,500,1,1);
person.addImage(personImg);
person.scale = 0.2;
virusGroup = new Group();
fluGroup = new Group();

restart = createSprite(500,300,12,15);
restart.addImage(restart_img);
restart.scale = 0.1;

gameover = createSprite(500,400,12,15);
gameover.addImage(gamover_img);
gameover.scale = 0.5;

}

function draw() {
background(bg);


text(" Score: " + score,800,50);

if(gameState === PLAY) {

gameover.visible = false;
restart.visible = false;

score = score + Math.round(getFrameRate()/60);

if(keyDown(LEFT_ARROW)) {
person.x = person.x - 5;
}

if(keyDown(RIGHT_ARROW)) {
person.x = person.x + 5;  
}

if(keyDown(UP_ARROW)) {
person.y = person.y - 5;  
}

if(keyDown(DOWN_ARROW)) {
person.y = person.y + 5;  
}

if(virusGroup.isTouching(person) || fluGroup.isTouching(person)) {
gameState = END;
}

virus();
spawnObstacles(); 
}

else if(gameState === END) {
virusGroup.setVelocityYEach(0);
fluGroup.setVelocityXEach(0);

score = 0;

virusGroup.setLifetimeEach(-1);
fluGroup.setLifetimeEach(-1);

gameover.visible = true;
restart.visible = true;

if(mousePressedOver(restart)) {
 restartGame();
}

}



drawSprites()
}

function virus() {
  if(frameCount % 60 === 0) {
    corona = createSprite(500,150,12,15);
    corona.velocityY = 4 + 2 * score/100;
    corona.scale = 0.1
    
    corona.x = Math.round(random(100,500));
    var rand = Math.round(random(1,3));

    switch(rand) {
   
      case 1: 
      corona.addImage(corona_img);
      break;
       
      case 2:
      corona.addImage(corona_img1);
      break;

      case 3:
      corona.addImage(corona_img2);
      break;

      default:
      break;
    }
    virusGroup.add(corona);
    corona.lifetime = 150;
  }
  
}

function spawnObstacles() {
 if(frameCount % 60 === 0) {
   flu = createSprite(900,150,12,15)
   flu.velocityX = -(4 + 2 *score/100);
   flu.scale = 0.1

   var rand = Math.round(random(1,4));
   flu.y = Math.round(random(100,800));

   switch(rand) {

    case 1:
      flu.addImage(flu1);
    break;

    case 2:
      flu.addImage(flu2);
      break;

    case 3: 
      flu.addImage(corona_img);
      break;
       
      case 4:
      flu.addImage(corona_img1);
      break;  

      default:
      break;

   }
   fluGroup.add(flu);
   flu.lifetime = 250;

 }
}

function restartGame() {
 gameState = PLAY;
 gameover.visible = false;
 restart.visible = false;
 fluGroup.destroyEach();
 virusGroup.destroyEach();
 score = 0;
 person.position.x = 500;
 person.position.y = 500;

}