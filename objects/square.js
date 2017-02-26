//Konstruktor Funktion
function Square() {
  //Position bestehend aus x Wert und y Wert
  this.x = 5;
  this.y = 0;
  this.farbCode = 1;
  this.platziert = -1;
  this.isMoving = true;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  2;
  this.breite = 2;
  //Funktion zum Anzeigen
  this.display = function() {
    if (this.isMoving && this.y + this.hoehe < graphics.bloeckeProSpalte) {
      graphics.gridArray[round(this.y)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y)][this.x + 1] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = this.farbCode;
    }
    else {
      graphics.gridArray[round(this.y)][this.x] = -1;
      graphics.gridArray[round(this.y)][this.x + 1] = -1;
      graphics.gridArray[round(this.y + 1)][this.x] = -1;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = -1;
      this.isMoving = false;
    }
  }
  //Funktion zum Drehen
  this.drehen = function() {
    //tut nichts, da ein Quadrat gedreht gleich bleibt
  }
}
