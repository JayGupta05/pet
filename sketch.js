//Create variables here
var dog,sadDog,happyDog;
var database,foodObj;
var foodS,foodStock,getFoodStock;

function preload()
{
  //load images here
  happyDog = loadImage("dogImg1.png");
  sadDog = loadImage("dogImg.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  dog = createSprite(250,300,20,20);
  dog.addImage(sadDog);
  dog.scale = 0.3;
  foodObj = new Food();
  foodObj.getFoodStock();  

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46,139,87); 
  textSize(20);
  fill(255,255,254);
  text("Food : " + foodObj.foodStock,350,80);
  if(foodObj.lastFed>=12){
    text("Last Feed : " +foodObj.lastFed%12 + " PM",350,30);
  } else if(foodObj.lastFed === 0){
    text("Last Feed : 12 AM",350,30);
  } else{
    text("Last Feed : " + foodObj.lastFed + "AM",350,30);
  }

  /*fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })*/
  

  drawSprites();
  //add styles here
}

/*function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}*/

function addFoods(){
  foodObj.foodStock++;
  database.ref('/').update({
    Food : foodObj.foodStock
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock-1);
}