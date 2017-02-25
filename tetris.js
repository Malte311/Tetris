/**
 * @author Malte Luttermann
 */

//Anzahl der Bloecke pro Zeile
var anzahlBloecke = 12;
//Die Breite eines Blocks
var blockBreite = 22;
//Die Hoehe eines Blocks
var blockHoehe = 22;
//Der Abstand links und rechts vom tatsaechlichen Spielfeld zum Rand vom Canvas
var seitenrand = (500 - (anzahlBloecke * blockBreite)) / 2;
//Die Breite des tatsaechlichen Spielfeldes
var spielfeldbreite = 500 - (2 * seitenrand);
//Die xPosition wenn ein neuer Stein erscheint
var xPosition = seitenrand + (anzahlBloecke / 2 - 1) * blockBreite;
//Die yPosition wenn ein neuer Stein erscheint
var yPosition = 0;
//Der aktuelle Scorewert
var aktuellerScore = 0;
//Der bisherige Highscore
var highscore = 0;
//Die Spielgeschwindigkeit
var speed = 1;
//Variable zum Testen ob das Spiel pausiert ist
var running = false;


var test;
var test2;
var controller;

function setup() {
  createCanvas(500, 550);
  test = new Square();
  test2 = new NormalesI();
  newgui = new GUI();

}

function draw() {
  background(0);
  newgui.sideMenu();
  test.display();
  test2.display();
  if(running){
    test.move();
  }
  newgui.grid();
}

function keyPressed() {
  controller = new Steuerung(test);
}

function mousePressed(){
  if(mouseX >= width - seitenrand + blockBreite && mouseX <= width - seitenrand + blockBreite + 75 && mouseY >= 8 * blockHoehe && mouseY <= 8 * blockHoehe + 50){
    speed += 1;
  }
  else if (speed > 1){
    if(mouseX >= width - seitenrand + blockBreite && mouseX <= width - seitenrand + blockBreite + 75 && mouseY >= 11 * blockHoehe && mouseY <= 11 * blockHoehe + 50){
      speed -= 1;
    }
  }
  if(mouseX >= width - seitenrand + blockBreite && mouseX <= width - seitenrand + blockBreite + 75 && mouseY >= 14 * blockHoehe && mouseY <= 14 * blockHoehe + 50){
    running = !running;
  }
}

//Funktion, die ein zufaelliges neues Objekt erstellt
function newRandomObject() {

}
