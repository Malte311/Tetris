//Konstruktor Funktion
function Square() {
  //Position bestehend aus x Wert und y Wert
  this.x = 5;
  this.y = 0;
  this.farbCode = 1;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  2;
  this.breite = 2;
  //Funktion zum Anzeigen
  this.display = function() {
    if (this.y + this.hoehe < graphics.bloeckeProSpalte) {
      graphics.gridArray[round(this.y)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y)][this.x + 1] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = this.farbCode;
    }
    else {
      graphics.gridArray[round(this.y)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y)][this.x + 1] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = this.farbCode;
    }
  }
  //Funktion zum Drehen
  this.drehen = function() {
    //tut nichts, da ein Quadrat gedreht gleich bleibt
  }
}
