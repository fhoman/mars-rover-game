
$( document ).ready(function() {
  console.log( "ready!" );



// Declare variables

var counter = 0;
var player = 0;
const grid = document.getElementById("grid")


// Set rover Object 
// ======================
var roverObj = [{player: 1,active:true,direction:'N',x:0,y:0,o:false,explosion:false,travellog:[]},{player: 2,active:false,direction:'S',x:9,y:9,o:false,explosion:false,travellog:[]}]

// Initialize game
// ======================

var gridArr = createGridItems();
createHTML(gridArr,roverObj);
$('#player-warning').hide();


// Generate array with coordinates and obstacles for the Mars grid
// ======================
function createGridItems(rover){
var gridArr = [];

for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    
  gridArr.push({'x':i,'y':j,'o':false,'explosion':false});

  }
}
addObstacles(gridArr);
return gridArr;
}

// Generate html Grid
// ======================
function createHTML(gridArr,rover){
grid.innerHTML = '';
var roverID = '';
var explosionID = '';


console.log(player);

for (let i = 0; i < gridArr.length; i++ ) {

var divElement = document.createElement("div")
    
divElement.id = `${gridArr[i].x}-${gridArr[i].y}`;
grid.appendChild(divElement);



if (gridArr[i].o === true) {

  divElement.className = 'grid-item obstacle';
  
      }
  
  else {
  
  divElement.className = 'grid-item road';
  
  }
  }
// Generate html for the active player

activePlayerID = `${rover[player].x}-${rover[player].y}`;
var activePlayerElement;
activePlayerElement = document.getElementById(activePlayerID);
  
// Generate the html for the rovers 

for (let i =0; i < rover.length; i++ ){
  

roverID = `${rover[i].x}-${rover[i].y}`;

console.log(roverID);

var roverElement;

roverElement = document.getElementById(roverID)
roverElement.innerHTML = '';



if (rover[i].direction === 'N') {

  roverElement.className = 'grid-item rover north';
  
  if (rover[i].active === true) {

    roverElement.className = 'grid-item rover north active';

  }


}

else if (rover[i].direction === 'E') {

  roverElement.className = 'grid-item rover east';

  if (rover[i].active === true) {

    roverElement.className = 'grid-item rover east active';
    
  }
  

}
else if (rover[i].direction === 'W') {

 
  roverElement.className = 'grid-item rover west';
  if (rover[i].active === true) {

    roverElement.className = 'grid-item rover west active';
    
  }

  
}

else if (rover[i].direction === 'S') {


  roverElement.className = 'grid-item rover south';
  if (rover[i].active === true) {
 
    roverElement.className = 'grid-item rover south active';

    
  }

  
}

}


// Generate HTML for the explosion

for (let i = 0; i < gridArr.length; i++ ) {

if (rover[player].explosion === true && gridArr[i].explosion === true) {
 
  explosionID = `${rover[player].x}-${rover[player].y}`;
console.log(explosionID);

var explosionElement;
explosionElement = document.getElementById(explosionID)
explosionElement.innerHTML = '';
explosionElement.className = 'grid-item explosion';
  
   gameOverSetup();
    
  }
  }




}

// Direction functions
// ======================
function turnLeft(rover){

    switch(rover.direction){
      case "N": 
        rover.direction = 'W'
        break;
      case "W": 
        rover.direction = 'S'
        break;  
      case "S": 
        rover.direction = 'E'
        break; 
      case "E": 
        rover.direction = 'N'
        break;
    }
rover.travellog.push({"x":rover.x,"y":rover.y})

  }
  
  function turnRight(rover){
 
    switch(rover.direction){
      case "N": 
        rove.direction = 'E'
        break;
      case "E": 
        rover.direction = 'S'
        break;  
      case "S": 
        rover.direction = 'W'
        break; 
      case "W": 
        rover.direction = 'N'
        break;
    }
rover.travellog.push({"x":rover.x,"y":rover.y})

  }
  
  function moveForward(rover,gridArray){

   
    switch(rover.direction){
      case "N":        
       if (rover.x > 0 && !checkObstacles(gridArray,rover,'x',-1)) {
        rover.x-- 
        }
      else if (checkObstacles(gridArray,rover,'x',-1)) {
        rover.x--
        rover.explosion = true
        setExplosion(rover);
          
      }
        else {
          generateWarningMessage(`You can't go forward player ${player+1}!`)
        }
        break;
      case "W": 
      if (rover.y > 0 && !checkObstacles(gridArray,rover,'y',-1)) {
         rover.y-- 
        }
      else if (checkObstacles(gridArray,rover,'y',-1)) {
          rover.y--     
          rover.explosion = true
          setExplosion(rover);
        
         }
        else {
          generateWarningMessage(`You can't go forward player ${player+1}!`)
        }
        break;  
      case "S": 
      if (rover.x < 9 && !checkObstacles(gridArray,rover,'x',1)) {
       rover.x++ 
        }
        else if (checkObstacles(gridArray,rover,'x',1)) {
        
          rover.x++ 
          rover.explosion = true;
          setExplosion(rover);
         
         }
        else {
          generateWarningMessage(`You can't go forward player ${player+1}!`)
        }
      break; 
      case "E": 
      if (rover.y < 9 && !checkObstacles(gridArray,rover,'y',1)) {
        rover.y++
        }
        else if (checkObstacles(gridArray,rover,'y',1)) {
          rover.y++
          rover.explosion = true;  
          setExplosion(rover);
           
         }
        else {
          generateWarningMessage(`You can't go forward player ${player+1}!`)
        }
      break;
    }
    rover.travellog.push({"x":rover.x,"y":rover.y})
    
  }
  
function moveBackward(rover,gridArray){


  
  switch(rover.direction){
      case "N": 
      if (rover.x < 9 && !checkObstacles(gridArray,rover,'x',1)) {
          rover.x++
      }
      else if (checkObstacles(gridArray,rover,'x',1)) {
        rover.x++
        rover.explosion = true;
        setExplosion(rover);
       
       }
      else {
        generateWarningMessage(`You can't go backward player ${player+1}!`)
      }
      break;
      case "W": 
      if (rover.y < 9 && !checkObstacles(gridArray,rover,'y',1)) {
          rover.y++
        }
        else if (checkObstacles(gridArray,rover,'y',1)) {
          rover.y++
          rover.explosion = true;
          setExplosion(rover);
        
         }
      else {
        generateWarningMessage(`You can't go backward player ${player+1}!`)
        } 
      break;  
      case "S": 
      if (rover.x > 0 && !checkObstacles(gridArray,rover,'x',-1)) {
           rover.x--
        }
        else if (checkObstacles(gridArray,rover,'x',-1)) {
          rover.x--
          rover.explosion = true;
          setExplosion(rover);
            
         }
      else {
        generateWarningMessage(`You can't go backward player ${player+1}!`)
        } 
      break; 
      case "E": 
      if (rover.y > 0 && !checkObstacles(gridArray,rover,'y',-1)) {
            rover.y--
        }
        else if (checkObstacles(gridArray,rover,'y',-1)) {
          rover.y--
          rover.explosion = true;
          setExplosion(rover);
         
         }
      else {
        
        generateWarningMessage(`You can't go backward player ${player+1}!`)
        
      } 
      break;
    }
   
 rover.travellog.push({"x":rover.x,"y":rover.y})


  }

// Event listener for control buttons mars rover
// ======================
document.getElementById('control-container').addEventListener('click',function(event){
  $('#player-warning').hide();
  $('#player-message').show();
if (event.target.id === 'L'){
turnLeft(roverObj[player]);
createHTML(gridArr,roverObj);
   }
else if (event.target.id === 'R' ) {
turnRight(roverObj[player]);
createHTML(gridArr,roverObj);
}
else if (event.target.id === 'F' ){
moveForward(roverObj[player],gridArr);
setPlayer(roverObj);
createHTML(gridArr,roverObj);


}
else if (event.target.id === 'B' ){            
moveBackward(roverObj[player],gridArr);
setPlayer(roverObj);
createHTML(gridArr,roverObj);


}     
})


// Game over setup 

function gameOverSetup() {


$('#reset').show();
$('#control-container').hide();
$('#reset').html('<span class="control" id="restart">Start again</span>')

generateWarningMessage(`The rover of player ${player+1} exploded. Player ${setPlayer(roverObj)} has won the game`);



document.getElementById('reset').addEventListener('click',function(){
$('#player-warning').hide();
$('#player-message').show();
$('#player-message').html("It's your turn player 1");

gridArr = [];
roverObj = [{direction:'N',x:0,y:0,o:false,explosion:false,travellog:[]},{direction:'S',x:9,y:9,o:false,explosion:false,travellog:[]}]
counter = 0;
player = 0;

gridArr = createGridItems();
createHTML(gridArr,roverObj);
$('#control-container').show();
$('#reset').hide();


})

}

// Helper functions
// ======================

// Change turn player

function setPlayer(rover) {

  
var messageElement;
messageElement = document.getElementById('player-message');
messageElement.innerHTML = '';

counter++


if (counter % 2 === 0) {

player = 0;
rover[0].active = true;
rover[1].active = false;
messageElement.innerHTML = "It's your turn player 1";
console.log(roverObj);
return 1;

}

else {

player = 1;
rover[0].active = false;
rover[1].active = true;
messageElement.innerHTML = "It's your turn player 2";
console.log(roverObj);
return 2;

}

}

// Generate warning message

function generateWarningMessage(message) {

  $('#player-message').hide();
  $('#player-warning').show();

$('#player-warning').html('');
$('#player-warning').html(message);


}



// Add obstacles to the grid
// ======================

function addObstacles(gridArray){

const randArr = [];
for (let i = 1; i < gridArray.length; i++){

gridArray[Math.floor(Math.random() * gridArray.length)].o = true;

randArr.push(1);

if (randArr.length > 10) {

gridArray[0].o = false;
gridArray[99].o = false;
return 

}
}



}


// Check for obstacles
// ======================
function checkObstacles(gridArray,rover,axis,movement){
var axis;
var movement;
console.log('check obstacles')
return gridArray.some(function(element){
if (axis === 'x') {

return (rover.x + movement) === element.x && rover.y === element.y && element.o === true;


}
else if (axis === 'y'){

return rover.x === element.x && (rover.y + movement) === element.y && element.o === true;
}
})
}

// Set exploded obstacle

function setExplosion(rover) {


for (let i=0; i < gridArr.length; i++) {

if (rover.x === gridArr[i].x && rover.y === gridArr[i].y) {

gridArr[i].explosion = true;

}


}



}

});