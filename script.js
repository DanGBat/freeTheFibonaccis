

// GRAB CANVAS FROM CSS FILE
const canvas = document.getElementById('canvas1');
// PASS THE 2D ANIMATION API INTO CANVAS VARIABLE
//! TO MAKE IT AN OBJECT
const ctx = canvas.getContext("2d");

// MAKE CANVAS COVER BROWSER WINDOW
// (This only happens on initial load so for it to happen everytime
// the browser window is resized, it needs to go inside a 'ResizeEventListener')
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 1;

// PROPERTY TO DETERMINE HOW NEW SHAPES ARE DRAWN (THESE ARE DRAWN ABOVE THE LAST)
ctx.globalCompositeOperation = 'destination-over';

let number = 0;
let scale = 20;
let shapeSize = 20;
let lineThickness = 10;
let multiplier = 10;
// SET VARIABLE FOR MAX NUMBER OF FRAME RENDERS
let maxNumberFrames = 500;
// SET VARIABLES FOR HUE STARTING VALUES
let hue1 = 75;
let hue2 = 125;
let alphaTrans = 0.7;

function drawShape() {
    // CHANGE THE MULTIPLIER HERE FOR DRAMATIC RESULT CHANGES
    let angle = number * multiplier;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + canvas.width/2;
    let positionY = radius * Math.cos(angle) + canvas.height/2;

    ctx.fillStyle = 'hsla('+hue1+', 100%, 50%, '+alphaTrans+')';
    ctx.strokeStyle = 'hsla('+hue2+', 100%, 50%, '+alphaTrans+')';
    ctx.lineWidth = lineThickness;  
// TELL JS TO START DRAWING
    ctx.beginPath(); 
// CO-ORDINATES OF DRAWING (WITH VARIABLES PASSED IN)
    ctx.arc(positionX, positionY, shapeSize, 0, Math.PI * 2);
// TELL JS TO STOP DRAWING
    ctx.closePath();
// ADD FILL AND STROKE TO SHAPE
    ctx.fill();
    ctx.stroke();

    // INCREAES NUMBER VARIABLE AND HUE VARIABLE BY ONE EACH FRAME
    number ++;
    hue1++;
    hue2++;
}

function animate() {

    // CALL DRAWING FUNCTION
    drawShape();

    // STOP WHEN NUMBER REACHES 'MAX NUMBER'
    if (number > maxNumberFrames) return;
    // CREATE A METHOD THAT PASSES IN THE PARENT 'ANIMATE FUNCTION'
    // WHICH CREATES A CONTINOUS LOOP SO THE FUNCTION IS CONSTANTLY BEING RUN
    requestAnimationFrame(animate);
}

function applyNewValues() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    number = document.getElementById("baseNum").value;
    scale = document.getElementById("scale").value;
    shapeSize = document.getElementById("shapeSize").value;
    lineThickness = document.getElementById("borderThickness").value;
    lmultiplier = document.getElementById("multiplier").value;
    hue1 = document.getElementById("fillHue").value;
    hue2 = document.getElementById("borderHue").value;
    alphaTrans = document.getElementById("transparency").value;
    maxNumberFrames = document.getElementById("maxFrames").value;

    console.log(number, scale, shapeSize)
    animate();
}

// ANIMATE WITH INITIAL VALUES
animate();