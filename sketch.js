var fieldWidth = 400;
var fieldHeight = 400;
var backgroundColor = 200;
var x = fieldWidth / 2;
var y = 0;

function setup() {
    createCanvas(fieldWidth, fieldHeight);
    background(backgroundColor);
}

function draw() {
    drawSquare();
}

function drawSquare(){
    fill(255, 0, 0); 
    rect(x, y, 20, 20);
}
