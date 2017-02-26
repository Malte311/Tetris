//Konstruktor Funktion
function NormalesI() {
  //Position bestehend aus x Wert und y Wert
  this.x = graphics.bloeckeProZeile / 2 - 1;
  this.y = 0;
  this.farbCode = 2;
  this.platziert = -2;
  this.isMoving = true;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  4;
  this.breite = 1;
  //Funktion zum Anzeigen
  //bewegt sich der Block noch, wird dies ausgefuehrt
  this.display = function() {
    if (this.isMoving && this.y + this.hoehe < graphics.bloeckeProSpalte) {
      graphics.gridArray[round(this.y)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y) + 1][this.x] = this.farbCode;
      graphics.gridArray[round(this.y) + 2][this.x] = this.farbCode;
      graphics.gridArray[round(this.y) + 3][this.x] = this.farbCode;
    }
    //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
    else {

    }
  }
  //Funktion zum Drehen
  this.drehen = function() {

  }
}
