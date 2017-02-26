//Konstruktor Funktion
function Square() {
  //Position bestehend aus x Wert und y Wert
  this.x = graphics.bloeckeProZeile / 2 - 1;
  this.y = 0;
  this.farbCode = 1;
  this.platziert = -1;
  this.isMoving = true;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  2;
  this.breite = 2;
  //Funktion zum Anzeigen
  //bewegt sich der Block noch, wird dies ausgefuehrt
  this.display = function() {
    if (this.isMoving && this.y + this.hoehe < graphics.bloeckeProSpalte) {
      graphics.gridArray[round(this.y)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y)][this.x + 1] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = this.farbCode;
    }
    //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
    else {
      graphics.gridArray[round(this.y)][this.x] = this.platziert;
      graphics.gridArray[round(this.y)][this.x + 1] = this.platziert;
      graphics.gridArray[round(this.y + 1)][this.x] = this.platziert;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = this.platziert;
      this.isMoving = false;
    }
  }
  //Funktion zum Drehen
  this.drehen = function() {
    //tut nichts, da ein Quadrat gedreht gleich bleibt
  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {
    for (var i = floor(this.y); i < graphics.bloeckeProSpalte; i++) {
      if (graphics.gridArray[i][this.x] < 0 || graphics.gridArray[i][this.x + 1] < 0) {
        this.y = i - this.hoehe;
        this.isMoving = false;
        break;
      }
      else {
        this.y = 18;
        this.isMoving = false;
      }
    }
  }
  //Funktion fuer das automatische runterfallen
  this.gravity = function() {
    if (this.y < graphics.bloeckeProSpalte - this.hoehe) {
      if (graphics.gridArray[floor(this.y + this.hoehe)][this.x] == 0 && graphics.gridArray[floor(this.y + this.hoehe)][this.x + 1] == 0) {
        this.y += controller.speed;
      }
      else {
        object.isMoving = false;
      }
    }
  }
  //Funktion zum Bewegen nach rechts
  this.bewegungRechts = function() {
    if (this.x <= graphics.bloeckeProZeile - this.breite - 1) {
      if (!(graphics.gridArray[round(this.y)][this.x + this.breite] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + this.breite] < 0)) {
        this.x += 1;
      }
    }
  }
  //Funktion zum Bewegen nach links
  this.bewegungLinks = function() {
    if (this.x > 0) {
      if (!(graphics.gridArray[round(this.y)][this.x - 1] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x - 1] < 0)) {
        this.x -= 1;
      }
    }
  }
}
