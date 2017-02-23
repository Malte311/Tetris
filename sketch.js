var breite = 300;
var hoehe = 300;

function setup() {
  createCanvas(breite, hoehe);
  background(0);
}

function draw() {
  square();
}

function square(){
  fill(255, 0, 0);
  rect(100, 100, 20, 20);
}

function grid(){
  var anzahlBloecke = 12;
  var blockBreite = 20;
  var seitenrand = (breite - (anzahlBloecke * blockBreite)) / 2;
  fill(255);
  for(var i = 0; i < spielfeldbreite; i++){
    line(seitenrand, 0, seitenrand, hoehe);
  }
}
