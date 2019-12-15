
// Rover Object 
// ======================
const roverObj = {direction:'N',x:0,y:0,travellog:[]}

// Initiate HTML grid
// ======================
var gridArr = createGridItems();
createHTML(gridArr,roverObj);

// Create array with coordinates and obstacles for the Mars grid
// ======================
function createGridItems(rover){
var gridArr = [];

for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    
  gridArr.push({'x':i,'y':j,'o':false});

  }
}
addObstacles(gridArr);
return gridArr;
}

// Create html Grid
// ======================
function createHTML(gridArr,rover){
const grid = document.getElementById("grid")
grid.innerHTML = '';


for (let i = 0; i < gridArr.length; i++ ) {
  var divElement = document.createElement("div")
  divElement.id = `${gridArr[i].x},${gridArr[i].y}`;
  
grid.appendChild(divElement);

 if (rover.x === gridArr[i].x && rover.y === gridArr[i].y && rover.direction === 'N') {

divElement.className = 'grid-item';
divElement.innerHTML = '&#8657;'

}

else if (rover.x === gridArr[i].x && rover.y === gridArr[i].y && rover.direction === 'E') {

divElement.className = 'grid-item';
divElement.innerHTML = '&#8658;'
  
  }

else if (rover.x === gridArr[i].x && rover.y === gridArr[i].y && rover.direction === 'W') {

divElement.className = 'grid-item';
divElement.innerHTML = '&#8656;'
    
    }

else if (rover.x === gridArr[i].x && rover.y === gridArr[i].y && rover.direction === 'S') {

divElement.className = 'grid-item';
divElement.innerHTML = '&#8659;'
      
    }
    
else if (gridArr[i].o === true) {

divElement.className = 'grid-item blue';

    }

else {

divElement.className = 'grid-item black';

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
        rover.direction = 'E'
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
        else {
        alert("You can't go forward")
        }
        break;
      case "W": 
      if (rover.y > 0 && !checkObstacles(gridArray,rover,'y',-1)) {
         rover.y-- 
        }
        else {
        alert("You can't go forward")
        }
        break;  
      case "S": 
      if (rover.x < 9 && !checkObstacles(gridArray,rover,'x',1)) {
       rover.x++ 
        }
        else {
        alert("You can't go forward")
        }
      break; 
      case "E": 
      if (rover.y < 9 && !checkObstacles(gridArray,rover,'y',1)) {
        rover.y++
        }
        else {
        alert("You can't go forward")
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
      else {
          alert("you can't go backward")
      }
      break;
      case "W": 
      if (rover.y < 9 && !checkObstacles(gridArray,rover,'y',1)) {
          rover.y++
        }
      else {
      alert("you can't go backward")
        } 
      break;  
      case "S": 
      if (rover.x > 0 && !checkObstacles(gridArray,rover,'x',-1)) {
           rover.x--
        }
      else {
      alert("you can't go backward")
        } 
      break; 
      case "E": 
      if (rover.y > 0 && !checkObstacles(gridArray,rover,'y',-1)) {
            rover.y--
        }
      else {
      alert("you can't go backward")
      } 
      break;
    }
   
 rover.travellog.push({"x":rover.x,"y":rover.y})
  }

// Event listener for control buttons mars rover
// ======================
document.getElementById('control-container').addEventListener('click',function(event){

if (event.target.id === 'L'){
turnLeft(roverObj);
createHTML(gridArr,roverObj);
   }
else if (event.target.id === 'R' ) {
turnRight(roverObj);
createHTML(gridArr,roverObj);
}
else if (event.target.id === 'F' ){
moveForward(roverObj,gridArr);
createHTML(gridArr,roverObj);
}
else if (event.target.id === 'B' ){            
moveBackward(roverObj,gridArr);
createHTML(gridArr,roverObj);
}     
})

// Helper functions
// ======================

// Add obstacles to the grid
// ======================
function addObstacles(gridArray){

const randArr = [];
for (let i = 0; i < gridArray.length; i++){
console.log(gridArray);

if (gridArray[i].x !== 0 && gridArray[i].y !== 0) {
gridArray[Math.floor(Math.random() * gridArray.length)].o = true;

randArr.push(gridArray[Math.floor(Math.random() * gridArray.length)]);

}

if (randArr.length > 10) {

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
