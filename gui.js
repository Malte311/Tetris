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
    for (var i = 0; i < graphics.bloeckeProZeile; i++) {
      graphics.gridArray[index][i] = 0;
      this.updateScore();
      this.updateRows();
    }
  }
  //Funktion zum Zeichnen der Objekte
  this.drawObjects = function() {
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        if (this.gridArray[i][j] != 0) {
          //Switch Statement fuer die Farbwahl
          switch (this.gridArray[i][j]) {
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
    //Score anzeigen, Play again fragen, wenn ja dann folgendes:
    //setup();
    //running = true;
  }
  //Funktion zum Updaten der Scoreanzeige
  this.updateScore = function() {
    this.score += this.bloeckeProZeile;
  }
  //Funktion zum Runterfallen von Steinen, die in der Luft schweben wuerden, wenn eine Reihe geloescht wird
  this.updateRows = function() {
    for (var i = 0; i < graphics.bloeckeProSpalte - 1; i++) {
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        if (graphics.gridArray[i][j] < 0 && !(graphics.gridArray[i + 1][j] < 0)) {
          graphics.gridArray[i + 1][j] = graphics.gridArray[i][j];
          graphics.gridArray[i][j] = 0;
        }
      }
    }
  }
}
