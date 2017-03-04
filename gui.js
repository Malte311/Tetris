//Konstrutor Funktion
function GUI() {
  //Variablen vom Graphical User Interface
  //Variable fuer den Scorewert
  this.score = 0;
  //Die Breite eines Blockes
  this.blockBreite = 22;
  //Die Hoehe eines Blockes (gleich der Breite, da Bloecke quadratisch sein sollen)
  this.blockHoehe = this.blockBreite;
  //Die Anzahl der Bloecke pro Zeile
  this.bloeckeProZeile = 12;
  //Die Anzahl der Bloecke pro Spalte
  this.bloeckeProSpalte = 20;
  //Das Array welches das Spielfeld in Bloecken unterteilt speichert
  this.gridArray = [this.bloeckeProSpalte];
  //Funktion zum Zeichnen des Grids
  this.grid = function() {
    //Grid zeichnen, Linien in weiß
    stroke(255);
    //Es werden Rechtecke gezeichnet, die vorerst nicht ausgefuellt werden sollen
    noFill();
    //Durchlaufe alle Reihen
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      //Durchlaufe alle Felder einer Reihe
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        //Zeichne Rechtecke, so dass ein Grid zustande kommt
        rect(j * this.blockBreite, i * this.blockHoehe, this.blockBreite, this.blockHoehe);
      }
    }
  }
  //Funktion zum Fuellen des Arrays
  this.fillArray = function() {
    //Zweidimensionales Array erstellen
    //Dazu Array durchlaufen
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      //Und mit Arrays befuellen
      this.gridArray[i] = new Array(this.bloeckeProZeile);
    }
    //Dann das soeben erstellte Array komplett durchlaufen
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        //Und ueberall den Wert 0 speichern
        this.gridArray[i][j] = 0;
      }
    }
  }
  //Funktion zum Entfernen einer vollen Zeile
  //Bekommt als Parameter den Index des Arrays uebergeben, der angibt, welche Zeile geloescht wird
  this.deleteVolleReihe = function(index) {
    //Durchlaufe die zu loeschende Zeile
    for (var i = 0; i < graphics.bloeckeProZeile; i++) {
      //Setze die Werte alle auf 0 zurueck
      graphics.gridArray[index][i] = 0;
    }
    //Die Reihen muessen geupdated werden, damit keine Steine in der Luft haengen
    this.updateRows();
    //Der Score wird erhoeht, da eine volle Reihe zustande gekommen ist
    this.updateScore();
  }
  //Funktion zum Zeichnen der Objekte
  this.drawObjects = function() {
    //Durchlaufe das Array komplett
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        //Sollte irgendwo ein Wert ungleich Null stehen, tue folgendes
        if (this.gridArray[i][j] != 0) {
          //Switch Statement fuer die Farbwahl
          //Negative Werte bedeuten feste Steine
          //Positive Werte bedeuten der Stein bewegt sich aktuell noch
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
          //Die gezeichneten Rechtecke sollen schwarz umrandet gezeichnet werden
          stroke(0);
          //Dann werden Rechtecke an der entsprechenden Position mit der entsprechenden Farbe gezeichnet
          rect(j * this.blockBreite, i * this.blockHoehe, this.blockBreite, this.blockHoehe);
        }
      }
    }
  }
  //Funktion zum Neuzeichnen des Spielfeldes
  //Sorgt dafuer, dass der Stein, sobald er seine Position aendert, nur auf der neuen Position zu sehen ist
  //Und die alte Position rausgenommen wird
  this.repaintField = function() {
    //Durchlaufe das Array komplett
    for (var i = 0; i < this.bloeckeProSpalte; i++) {
      for (var j = 0; j < this.bloeckeProZeile; j++) {
        //Wenn ein positiver Wert gefunden wird, setze ihn direkt zurueck
        if (this.gridArray[i][j] > 0) {
          //Setze Wert wieder auf Null
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
    //Fuer jeden Stein, der entfernt wird, gibt es einen Punkt
    this.score += graphics.bloeckeProZeile;
    //Score in der Console ausgeben
    console.log(this.score);
  }
  //Funktion zum Runterfallen von Steinen, die in der Luft schweben wuerden, wenn eine Reihe geloescht wird
  this.updateRows = function() {
    //Durchlaufe alle Reihen, bis auf die unterste (daher -1)
    for (var i = 0; i < graphics.bloeckeProSpalte - 1; i++) {
      //Durchlaufe alle Felder der Reihe
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        //Wenn ein Feld einen Stein enthaelt, das darunter liegende Feld aber nicht, dann tue folgendes
        if (graphics.gridArray[i][j] < 0 && graphics.gridArray[i + 1][j] == 0) {
          //Das Feld darunter enthaelt nun den Stein
          graphics.gridArray[i + 1][j] = graphics.gridArray[i][j];
          //Das Feld darueber wird auf Null zurueckgesetzt
          graphics.gridArray[i][j] = 0;
        }
      }
    }
  }
}
