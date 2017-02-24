/**
 * @author Malte Luttermann
 */

//Breite vom Canvas
var breite = 500;
//Hoehe vom Canvas
var hoehe = 550;
//Anzahl der Bloecke pro Zeile
var anzahlBloecke = 12;
//Die Breite eines Blocks
var blockBreite = 22;
//Die Hoehe eines Blocks
var blockHoehe = 22;
//Der Abstand links und rechts vom tatsaechlichen Spielfeld zum Rand vom Canvas
var seitenrand = (breite - (anzahlBloecke * blockBreite)) / 2;
//Die Breite des tatsaechlichen Spielfeldes
var spielfeldbreite = breite - (2 * seitenrand);
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
var running = true;
//Array zum Pruefen ob eine Reihe voll ist
var reiheVoll = [anzahlBloecke];

var test;

function setup() {
  createCanvas(breite, hoehe);
   var block = new GedrehtesZ(xPosition, yPosition);
   test = new Square();
}

function draw() {
  background(0);
  sideMenu();
  test.display();
  if(running){
    test.move();
  }
  grid();
}

function keyPressed() {
  test.steuerung();
}

function mousePressed(){
  if(mouseX >= breite - seitenrand + blockBreite && mouseX <= breite - seitenrand + blockBreite + 75 && mouseY >= 8 * blockHoehe && mouseY <= 8 * blockHoehe + 50){
    speed += 1;
  }
  else if (speed > 1){
    if(mouseX >= breite - seitenrand + blockBreite && mouseX <= breite - seitenrand + blockBreite + 75 && mouseY >= 11 * blockHoehe && mouseY <= 11 * blockHoehe + 50){
      speed -= 1;
    }
  }
  if(mouseX >= breite - seitenrand + blockBreite && mouseX <= breite - seitenrand + blockBreite + 75 && mouseY >= 14 * blockHoehe && mouseY <= 14 * blockHoehe + 50){
    running = !running;
  }
}

function sideMenu(){
  fill(255);
  textSize(28);
  //aktuelle Scoreanzeige
  text("Score", breite - seitenrand + blockBreite, 1.25 * blockHoehe);
  text(aktuellerScore, breite - seitenrand + 1.25 * blockBreite, 3 * blockHoehe);
  //Highscoreanzeige
  text("Best", breite - seitenrand + 1.25 * blockBreite, 4.75 * blockHoehe);
  text(highscore, breite - seitenrand + 1.25 * blockBreite, 6.5 * blockHoehe);
  //Buttons zum Veraendern der Spielgeschwindigkeit und Pausebutton
  rect(breite - seitenrand + blockBreite, 8 * blockHoehe, 75, 50);
  rect(breite - seitenrand + blockBreite, 11 * blockHoehe, 75, 50);
  rect(breite - seitenrand + blockBreite, 14 * blockHoehe, 75, 50);
  fill(0);
  stroke(0);
  text(">>", breite - seitenrand + blockBreite + 22, 8 * blockHoehe + 36);
  text("<<", breite - seitenrand + blockBreite + 22, 11 * blockHoehe + 36);
  if(running){
    textSize(88);
    text("\"", breite - seitenrand + blockBreite + 22, 16 * blockHoehe + 36);
  }
  else{
    textSize(60);
    text(">", breite - seitenrand + blockBreite + 20, 15 * blockHoehe + 25);
  }
}

function grid(){
  //Zeichnet die vertikalen Linien
  for(var i = 0; i <= anzahlBloecke; i++){
    //weiße Linien
    stroke(255);
    line(seitenrand + i * blockBreite, 0, seitenrand + i * blockBreite, hoehe);
  }

  //Zeichnet die horizontalen Linien
  for (var i = 0; i <= hoehe / blockHoehe; i++){
    //weiße Linien
    stroke(255);
    line(seitenrand, i * blockHoehe, breite - seitenrand, i * blockHoehe);
    }
}
