var breite = 500;
var hoehe = 550;
var anzahlBloecke = 12; //Anzahl der Bloecke pro Zeile
var blockBreite = 22;
var blockHoehe = 22;
var seitenrand = (breite - (anzahlBloecke * blockBreite)) / 2;
var spielfeldbreite = breite - (2 * seitenrand);

function setup() {
  createCanvas(breite, hoehe);


}

function draw() {
  square();
  background(0);
  grid();
}

function grid(){
  //Zeichnet die vertikalen Linien
  for(var i = 0; i <= anzahlBloecke; i++){
    //weiße Linien 
    stroke(255);
    line(seitenrand + i * blockBreite, 0, seitenrand + i * blockBreite, hoehe);
  }

  //Zeichnet die horizontalen Linien
  for(var i = 0; i <= hoehe / blockHoehe; i++){
    //weiße Linien
    stroke(255);
    line(seitenrand, i * blockHoehe, breite - seitenrand, i * blockHoehe);
    }
}

function square(){
  fill(0, 255, 255);
  noStroke();
  var yPosition = 0;
  rect(seitenrand + (anzahlBloecke / 2 - 1) * blockBreite, yPosition, 2 * 22, 2 * 22);
  yPosition += 1;
}

function langerStein(){
  fill(255, 0, 0);
}
