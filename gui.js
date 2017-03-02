//Konstrutor Funktion
function GUI() {

  //Variablen vom Graphical User Interface
  this.score = 0;
  this.blockBreite = 22;
  this.blockHoehe = this.blockBreite;
  this.bloeckeProZeile = 12;
  this.bloeckeProSpalte = 20;
  this.gridArray = [this.bloeckeProSpalte];

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
    for (var i = 0; i < graphics.bloeckeProZeile; i++) {
      graphics.gridArray[index][i] = 0;
      this.updateRows();
      this.updateScore();
    }
  }
  //Funktion zum Zeichnen der Objekte
  this.drawObjects = function() {
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        if (this.gridArray[i][j] != 0) {
          //Switch Statement fuer die Farbwahl
          switch (this.gridArray[i][j]) {
            //Siebter Fall ist NormalesL (orange) (Stein bereits fest)
            case -7:
              fill(255, 128, 0);
              break;
            //Sechster Fall ist NormalesZ (rot) (Stein bereits fest)
            case -6:
              fill(255, 0, 0);
              break;
            //Fuenfter Fall ist GedrehtesZ (gruen) (Stein bereits fest)
            case -5:
              fill(0, 255, 0);
              break;
            //Vierter Fall ist GedrehtesL (blau) (Stein bereits fest)
            case -4:
              fill(0, 0, 255);
              break;
            //Dritter Fall ist NormalesT (lila) (Stein bereits fest)
            case -3:
              fill(255, 0, 255);
              break;
            //Zweiter Fall ist NormalesI (tuerkis) (Stein bereits fest)
            case -2:
              fill(0, 255, 255);
              break;
            //Erster Fall ist Square (gelb) (Stein bereits fest)
            case -1:
              fill(255, 255, 0);
              break;
            //Erster Fall ist Square (gelb) (Stein bewegt sich)
            case 1:
              fill(255, 255, 0);
              break;
            //Zweiter Fall ist NormalesI (tuerkis) (Stein bewegt sich)
            case 2:
              fill(0, 255, 255);
              break;
            //Dritter Fall ist NormalesT (lila) (Stein bewegt sich)
            case 3:
              fill(255, 0, 255);
              break;
            //Vierter Fall ist GedrehtesL (blau) (Stein bewegt sich)
            case 4:
              fill(0, 0, 255);
              break;
            //Fuenfter Fall ist GedrehtesZ (gruen) (Stein bewegt sich)
            case 5:
              fill(0, 255, 0);
              break;
            //Sechster Fall ist NormalesZ (rot) (Stein bewegt sich)
            case 6:
              fill(255, 0, 0);
              break;
            //Siebter Fall ist NormalesL (orange) (Stein bewegt sich)
            case 7:
              fill(255, 128, 0);
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
  //Funktion zum Play Again (Game Over Screen)
  this.gameOver = function() {
    console.log("Spiel zu Ende");
    //Score anzeigen, Play again fragen, wenn ja dann folgendes:
    //setup();
    //running = true;
  }
  //Funktion zum Updaten der Scoreanzeige
  this.updateScore = function() {
    this.score += 1;
    //Score in der Console ausgeben
    console.log(this.score);
  }
  //Funktion zum Runterfallen von Steinen, die in der Luft schweben wuerden, wenn eine Reihe geloescht wird

  //funktioniert noch nicht korrekt
  this.updateRows = function() {
    for (var i = 0; i < graphics.bloeckeProSpalte - 1; i++) {
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        if (graphics.gridArray[i][j] < 0 && graphics.gridArray[i + 1][j] == 0) {
          graphics.gridArray[i + 1][j] = graphics.gridArray[i][j];
          graphics.gridArray[i][j] = 0;
        }
      }
    }
  }
}
