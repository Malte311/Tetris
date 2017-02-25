//Konstruktor Funktion
function Square() {
  //Position bestehend aus x Wert und y Wert
  this.x = 5
  this.y = 0;
  //Groesse eines Objektes
  this.hoehe = graphics.blockHoehe * 2;
  this.breite = graphics.blockBreite * 2;
  //Funktion zum Anzeigen
  this.display = function() {
    graphics.gridArray[this.y][this.x] = 1;
    graphics.gridArray[this.y][this.x + 1] = 1;
    graphics.gridArray[this.y + 1][this.x] = 1;
    graphics.gridArray[this.y + 1][this.x + 1] = 1;
  }
  //Funktion zum Drehen
  this.drehen = function() {
    //tut nichts, da ein Quadrat gedreht gleich bleibt
  }
}
