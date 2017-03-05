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
  //Array zum eindeutigen bestimmen, welche Quadrate auf dem Feld zusammengehoeren und somit ein Objekt bilden
  this.countArray = [-8, -680, -1280, -1880, -2480, -3080, -3680];
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
          //if Abfrage fuer die Farbwahl
          //Negative Werte bedeuten feste Steine
          //Positive Werte bedeuten der Stein bewegt sich aktuell noch
          //NormalesL (orange)
          if (this.gridArray[i][j] == 7 || (this.gridArray[i][j] < -7 && this.gridArray[i][j] > -680)) {
            fill(255, 128, 0);
          }
          //NormalesZ (rot)
          else if (this.gridArray[i][j] == 6 || (this.gridArray[i][j] <= -680 && this.gridArray[i][j] > -1280)) {
            fill(255, 0, 0);
          }
          //GedrehtesZ (gruen)
          else if (this.gridArray[i][j] == 5 || (this.gridArray[i][j] <= -1280 && this.gridArray[i][j] > -1880)) {
            fill(0, 255, 0);
          }
          //GedrehtesL (blau)
          else if (this.gridArray[i][j] == 4 || (this.gridArray[i][j] <= -1880 && this.gridArray[i][j] > -2480)) {
            fill(0, 0, 255);
          }
          //NormalesT (lila)
          else if (this.gridArray[i][j] == 3 || (this.gridArray[i][j] <= -2480 && this.gridArray[i][j] > -3080)) {
            fill(255, 0, 255);
          }
          //NormalesI (tuerkis)
          else if (this.gridArray[i][j] == 2 || (this.gridArray[i][j] <= -3080 && this.gridArray[i][j] > -3680)) {
            fill(0, 255, 255);
          }
          //Square (gelb)
          else if (this.gridArray[i][j] == 1 || (this.gridArray[i][j] <= -3680 && this.gridArray[i][j] > -4280)) {
            fill(255, 255, 0);
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
    this.score += this.bloeckeProZeile;
    //Score in der Console ausgeben
    console.log(this.score);
  }
  //Funktion zum Runterfallen von Steinen, die in der Luft schweben wuerden, wenn eine Reihe geloescht wird
  this.updateRows = function() {
    //Durchlaufe alle Reihen, bis auf die unterste (daher -2), da die unterste immer Boden unter sich hat
    for (var i = this.bloeckeProSpalte - 2; i > 0; i--) {
      //Durchlaufe alle Felder der Reihe
      for (j = 0; j < this.bloeckeProZeile; j++) {
        //Wenn ein Feld einen Stein enthaelt, das darunter liegende Feld aber nicht, dann tue folgendes
        if (this.gridArray[i][j] < 0 && this.gridArray[i + 1][j] == 0) {
          //Fuehre die Funktion aus, die dafuer sorgt, dass die Steine korrekt fallen
          this.steinInDerLuft(i, j);
        }
      }
    }
  }
  //Funktion, die prueft, ob ein Stein komplett in der Luft haengt
  //Bekommt ein einzelnes Quadrat uebergeben, das in der Luft haengt
  this.steinInDerLuft = function(i, j) {
    //Zunaechst wird ermittelt, um was fuer ein Objekt es sich handelt
    //NormalesL (orange)
    if (this.gridArray[i][j] < -7 && this.gridArray[i][j] > -680) {

    }
    //NormalesZ (rot)
    else if (this.gridArray[i][j] <= -680 && this.gridArray[i][j] > -1280) {

    }
    //GedrehtesZ (gruen)
    else if (this.gridArray[i][j] <= -1280 && this.gridArray[i][j] > -1880) {

    }
    //GedrehtesL (blau)
    else if (this.gridArray[i][j] <= -1880 && this.gridArray[i][j] > -2480) {
      //Sicherstellen, dass das Array nicht verlassen wird
      if (j < this.bloeckeProZeile - 2) {
        //Pruefen, ob es quer liegt
        if (this.gridArray[i][j] === this.gridArray[i][j + 1] && this.gridArray[i][j] === this.gridArray[i][j + 2]) {
          //pruefen, ob es in der Luft haengt
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j + 1] == 0 && this.gridArray[i + 1][j + 2] == 0) {
            //Wenn es in der Luft haengt, soll es runterfallen
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            this.gridArray[i + 1][j + 2] = this.gridArray[i][j + 2];
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
            this.gridArray[i][j + 2] = 0;
          }
        }
      }
      //quer gedreht pruefen
      if (i > 0 && j > 1) {
        if (this.gridArray[i][j] === this.gridArray[i - 1][j] && this.gridArray[i - 1][j - 1] === this.gridArray[i][j] && this.gridArray[i - 1][j - 2] === this.gridArray[i][j]) {
          //pruefen, ob in der Luft
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i][j - 1] == 0 && this.gridArray[i][j - 2] == 0) {
            //wenn ja dann fallen
            this.gridArray[i][j - 1] = this.gridArray[i - 1][j - 1];
            this.gridArray[i][j - 2] = this.gridArray[i - 1][j - 2];
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i - 1][j] = 0;
            this.gridArray[i - 1][j - 2] = 0;
            this.gridArray[i - 1][j - 1] = 0;
          }
        }
      }
      if (j < this.bloeckeProZeile - 1) {
        //wenn es senkrecht ist
        if (this.gridArray[i][j] === this.gridArray[i][j + 1] && this.gridArray[i][j] !== this.gridArray[i][j + 2]) {
          //pruefen, ob es in der Luft haengt
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j + 1] == 0) {
            //Wenn es in der Luft haengt, soll es runterfallen
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
          }
        }
        //pruefen, ob es senkrecht gedreht ist
        if (i > 1) {
          if (this.gridArray[i][j] === this.gridArray[i - 1][j] && this.gridArray[i - 2][j] === this.gridArray[i][j]
          && this.gridArray[i - 2][j + 1] === this.gridArray[i][j]) {
            //pruefen, ob der Stein in der Luft haengt
            if (this.gridArray[i + 1][j] == 0 && this.gridArray[i - 1][j + 1] == 0) {
              //Wenn es in der Luft haengt, soll es runterfallen
              this.gridArray[i + 1][j] = this.gridArray[i][j];
              this.gridArray[i - 1][j + 1] = this.gridArray[i - 2][j + 1];
              this.gridArray[i - 2][j + 1] = 0;
              this.gridArray[i - 2][j] = 0;
            }
          }
        }
        //pruefen, ob es senkrecht gedreht ist aber bereits den unteren Stein verloren hat durch eine volle Reihe
        if (i > 0) {
          if (this.gridArray[i][j] === this.gridArray[i - 1][j] && this.gridArray[i - 1][j + 1] === this.gridArray[i][j] && this.gridArray[i][j] !== this.gridArray[i + 1][j]) {
            //pruefen, ob der Stein in der Luft haengt
            if (this.gridArray[i + 1][j] == 0 && this.gridArray[i][j + 1] == 0) {
              //dann soll der Stein fallen
              this.gridArray[i][j + 1] = this.gridArray[i - 1][j + 1];
              this.gridArray[i + 1][j] = this.gridArray[i][j];
              this.gridArray[i - 1][j + 1] = 0;
              this.gridArray[i - 1][j] = 0;
            }
          }
        }
        //alleine ? dann fallen wenn Platz ist
        if (this.gridArray[i][j] !== this.gridArray[i][j + 1] && this.gridArray[i][j] !== this.gridArray[i - 1][j + 1]) {
          //fallen
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          this.gridArray[i][j] = 0;
        }
      }
      if (j > 1) {
        //alleine ? dann fallen wenn Platz ist
        if (this.gridArray[i][j] !== this.gridArray[i][j + 1] && this.gridArray[i][j] !== this.gridArray[i - 1][j - 1]) {
          //fallen
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          this.gridArray[i][j] = 0;
        }
      }
      //letztes Feld der Reihe pruefen
      if (j == this.bloeckeProZeile - 1) {
        if (i > 0) {
          //fuer quer gedreht
          if (this.gridArray[i][j] === this.gridArray[i - 1][j] && this.gridArray[i - 1][j - 1] === this.gridArray[i][j] && this.gridArray[i - 1][j - 2] === this.gridArray[i][j]) {
            //pruefen, ob in der Luft
            if (this.gridArray[i + 1][j] == 0 && this.gridArray[i][j - 1] == 0 && this.gridArray[i][j - 2] == 0) {
              //wenn ja dann fallen
              this.gridArray[i][j - 1] = this.gridArray[i - 1][j - 1];
              this.gridArray[i][j - 2] = this.gridArray[i - 1][j - 2];
              this.gridArray[i + 1][j] = this.gridArray[i][j];
              this.gridArray[i - 1][j] = 0;
              this.gridArray[i - 1][j - 2] = 0;
              this.gridArray[i - 1][j - 1] = 0;
            }
          }
        }
        //alleine ? dann fallen wenn Platz ist
        if (this.gridArray[i + 1][j] == 0) {
          //fallen
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          this.gridArray[i][j] = 0;
        }
      }
    }
    //NormalesT (lila)
    else if (this.gridArray[i][j] <= -2480 && this.gridArray[i][j] > -3080) {

    }
    //NormalesI (tuerkis)
    else if (this.gridArray[i][j] <= -3080 && this.gridArray[i][j] > -3680) {
      //Sicherstellen, dass das Array nicht verlassen wird
      if (j < this.bloeckeProZeile - 3) {
        //Wenn das Objekt quer liegt
        if (this.gridArray[i][j] === this.gridArray[i][j + 1] && this.gridArray[i][j] === this.gridArray[i][j + 2] && this.gridArray[i][j] === this.gridArray[i][j + 3]) {
          //Bedingung fuer das Fallen ist, dass unter allen Quadraten freier Platz ist
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j + 1] == 0 && this.gridArray[i + 1][j + 2] == 0 && this.gridArray[i + 1][j + 3] == 0) {
            //dann fallen alle Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            this.gridArray[i + 1][j + 2] = this.gridArray[i][j + 2];
            this.gridArray[i + 1][j + 3] = this.gridArray[i][j + 3];
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
            this.gridArray[i][j + 2] = 0;
            this.gridArray[i][j + 3] = 0;
          }
        }
        //Steht das Objekt senkrecht, kann es sofort fallen, wenn darunter nichts ist
        else if (this.gridArray[i][j] !== this.gridArray[i][j + 1]) {
          //pruefen, ob darunter Platz ist (eigentlich ueberfluessig, da bereits in updateRows, aber zur besseren Anschaulichkeit noch mal hier)
          if (this.gridArray[i + 1][j] == 0) {
            //dann fallen
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i][j] = 0;
          }
        }
      }
      //allerletzte Moeglichkeit, in dem letzten Feld senkrecht
      else if (j == this.bloeckeProZeile - 1) {
        //pruefen, ob darunter Platz ist (eigentlich ueberfluessig, da bereits in updateRows, aber zur besseren Anschaulichkeit noch mal hier)
        if (this.gridArray[i + 1][j] == 0) {
          //dann fallen
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          this.gridArray[i][j] = 0;
        }
      }
    }
    //Square (gelb)
    else if (this.gridArray[i][j] <= -3680 && this.gridArray[i][j] > -4280) {
      //Wir gehen von links nach rechts, daher pruefen wir immer, ob rechts daneben ein gleiches Quadrat ist
      if (j < this.bloeckeProZeile - 1) {
        //Dafuer wird erst noch sichergestellt, dass das Array nicht verlassen werden kann, dann wird geprueft
        if (this.gridArray[i][j] === this.gridArray[i][j + 1]) {
          //nun kann geschaut werden, ob darunter alles frei ist und der Stein somit in der Luft haengt
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j + 1] == 0) {
            //Nur wenn dem so ist, faellt der Stein ein Feld runter
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
          }
        }
      }
    }
  }
}
