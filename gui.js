//Konstrutor Funktion
function GUI() {

  //Variablen vom Graphical User Interface
  this.score = 0;
  this.blockBreite = 22;
  this.blockHoehe = this.blockBreite;
  this.bloeckeProZeile = 12;
  this.bloeckeProSpalte = 20;
  this.gridArray = [this.bloeckeProSpalte];

  //Funkton fuer die Scoreanzeige und Play Again Button
  this.anzeige = function() {

  }

  //Funktion zum Zeichnen des Grids
  this.grid = function() {
    //Grid zeichnen
    stroke(255);
    noFill();
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        rect(j * this.blockBreite, i * this.blockHoehe, this.blockBreite, this.blockHoehe);
      }
    }
  }

  //Funktion zum Fuellen des Arrays
  this.fillArray = function() {
    //Zweidimensionales Array erstellen
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      this.gridArray[i] = new Array(this.bloeckeProZeile);
    }
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        this.gridArray[i][j] = 0;
      }
    }
  }
  //Funktion zum Entfernen einer vollen Zeile
  this.deleteVolleReihe = function(index) {
    for (var i = 0; i < this.bloeckeProZeile; i++) {

      //funktioniert vorne und hinten nicht
      //this.gridArray[index][i] = 0;
    }
    //alle Reihen darueber fallen nun runter

  }
  //Funktion zum Zeichnen der Objekte
  this.drawObjects = function() {
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        if (this.gridArray[i][j] != 0) {
          //Switch Statement fuer die Farbwahl
          switch (this.gridArray[i][j]) {
            //Erster Fall ist Square (gelb) (Stein bereits fest)
            case -1:
              fill(255, 255, 0);
              break;
            //Erster Fall ist Square (gelb) (Stein bewegt sich)
            case 1:
              fill(255, 255, 0);
              break;
            //Zweiter Fall ist normalesI (tuerkis) (Stein bewegt sich)
            case 2:
            fill(0, 206, 209);
            break;
          }
          stroke(0);
          rect(j * this.blockBreite, i * this.blockHoehe, this.blockBreite, this.blockHoehe);
        }
      }
    }
  }
  //Funktion zum Neuzeichnen des Spielfeldes
  this.repaintField = function() {
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        if (this.gridArray[i][j] > 0) {
          this.gridArray[i][j] = 0;
        }
      }
    }
  }
}
