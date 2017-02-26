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
}
