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
    //Durchlaufe alle Reihen, bis auf die unterste (daher -1), da die unterste immer Boden unter sich hat
    for (var i = 0; i < this.bloeckeProSpalte - 1; i++) {
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
      //Wenn wir am Rand sind, pruefen wir nur in eine Richtung
      //linker Rand
      if (j == 0) {

      }
      //rechter Rand
      else if (j == this.bloeckeProZeile - 1) {

      }
      //alles dazwischen
      else {

      }
    }
    //NormalesZ (rot)
    else if (this.gridArray[i][j] <= -680 && this.gridArray[i][j] > -1280) {
      //Wenn wir am Rand sind, pruefen wir nur in eine Richtung
      //linker Rand
      if (j == 0) {

      }
      //rechter Rand
      else if (j == this.bloeckeProZeile - 1) {

      }
      //alles dazwischen
      else {

      }
    }
    //GedrehtesZ (gruen)
    else if (this.gridArray[i][j] <= -1280 && this.gridArray[i][j] > -1880) {
      //Wenn wir am Rand sind, pruefen wir nur in eine Richtung
      //linker Rand
      if (j == 0) {

      }
      //rechter Rand
      else if (j == this.bloeckeProZeile - 1) {

      }
      //alles dazwischen
      else {

      }
    }
    //GedrehtesL (blau)
    else if (this.gridArray[i][j] <= -1880 && this.gridArray[i][j] > -2480) {
      //Wenn wir am Rand sind, pruefen wir nur in eine Richtung
      //linker Rand
      if (j == 0) {

      }
      //rechter Rand
      else if (j == this.bloeckeProZeile - 1) {

      }
      //alles dazwischen
      else {

      }
    }
    //NormalesT (lila)
    else if (this.gridArray[i][j] <= -2480 && this.gridArray[i][j] > -3080) {
      //Wenn wir am Rand sind, pruefen wir nur in eine Richtung
      //linker Rand
      if (j == 0) {
        if (this.gridArray[i][j] === this.gridArray[i][j + 1] && this.gridArray[i][j] === this.gridArray[i][j + 2]) {
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j + 1] == 0 && this.gridArray[i + 1][j + 2] == 0) {
            //Dann fallen alle vier Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            this.gridArray[i + 1][j + 2] = this.gridArray[i][j + 2];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
            this.gridArray[i][j + 2] = 0;
          }
        }
        else if (this.gridArray[i][j] === this.gridArray[i][j + 1] && this.gridArray[i][j] !== this.gridArray[i][j + 2]) {
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j + 1] == 0) {
            //Dann fallen alle vier Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
          }
        }
        else if (this.gridArray[i][j] !== this.gridArray[i][j + 1]) {

        }
      }
      //rechter Rand
      else if (j == this.bloeckeProZeile - 1) {

      }
      //alles dazwischen
      else {

      }
    }
    //NormalesI (tuerkis)
    else if (this.gridArray[i][j] <= -3080 && this.gridArray[i][j] > -3680) {
      //Wenn wir am Rand sind, pruefen wir nur in eine Richtung
      //linker Rand
      if (j == 0) {
        //Wenn dieses Objekt daneben nicht weitergeht, faellt das einzelne Quadrat
        if (this.gridArray[i][j] !== this.gridArray[i][j + 1]) {
          //Das Feld darunter enthaelt nun den Stein
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          //Das Feld darueber wird auf Null zurueckgesetzt
          this.gridArray[i][j] = 0;
        }
        else {
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j + 1] == 0 && this.gridArray[i + 1][j + 2] == 0 && this.gridArray[i + 1][j + 3] == 0) {
            //Dann fallen alle vier Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            this.gridArray[i + 1][j + 2] = this.gridArray[i][j + 2];
            this.gridArray[i + 1][j + 3] = this.gridArray[i][j + 3];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
            this.gridArray[i][j + 2] = 0;
            this.gridArray[i][j + 3] = 0;
          }
        }
      }
      //rechter Rand
      else if (j == this.bloeckeProZeile - 1) {
        //Wenn dieses Objekt daneben nicht weitergeht, faellt das einzelne Quadrat
        if (this.gridArray[i][j] !== this.gridArray[i][j - 1]) {
          //Das Feld darunter enthaelt nun den Stein
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          //Das Feld darueber wird auf Null zurueckgesetzt
          this.gridArray[i][j] = 0;
        }
        else {
          //wenn das Objekt quer liegt
          if (this.gridArray[i + 1][j] == 0 && this.gridArray[i + 1][j - 1] == 0 && this.gridArray[i + 1][j - 2] == 0 && this.gridArray[i + 1][j - 3] == 0) {
            //Dann fallen alle vier Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j - 1] = this.gridArray[i][j - 1];
            this.gridArray[i + 1][j - 2] = this.gridArray[i][j - 2];
            this.gridArray[i + 1][j - 3] = this.gridArray[i][j - 3];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j - 1] = 0;
            this.gridArray[i][j - 2] = 0;
            this.gridArray[i][j - 3] = 0;
          }
        }
      }
      //alles dazwischen
      else {
        //Wenn dieses Objekt daneben nicht weitergeht, faellt das einzelne Quadrat
        if (this.gridArray[i][j] !== this.gridArray[i][j + 1] && this.gridArray[i][j] !== this.gridArray[i][j - 1]) {
          //Das Feld darunter enthaelt nun den Stein
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          //Das Feld darueber wird auf Null zurueckgesetzt
          this.gridArray[i][j] = 0;
        }
        //wenn das Objekt daneben weitergeht
        else {
          //wenn alle weiteren Quadrate auch in der Luft haengen, faellt das Objekt
          if (this.gridArray[i][j] === this.gridArray[i][j + 1]) {
            //Dann fallen alle vier Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            this.gridArray[i + 1][j + 2] = this.gridArray[i][j + 2];
            this.gridArray[i + 1][j + 3] = this.gridArray[i][j + 3];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
            this.gridArray[i][j + 2] = 0;
            this.gridArray[i][j + 3] = 0;
          }
          else if (this.gridArray[i][j] === this.gridArray[i][j - 1]) {
            //Dann fallen alle vier Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j - 1] = this.gridArray[i][j - 1];
            this.gridArray[i + 1][j - 2] = this.gridArray[i][j - 2];
            this.gridArray[i + 1][j - 3] = this.gridArray[i][j - 3];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j - 1] = 0;
            this.gridArray[i][j - 2] = 0;
            this.gridArray[i][j - 3] = 0;
          }
        }
      }
    }
    //Square (gelb)
    else if (this.gridArray[i][j] <= -3680 && this.gridArray[i][j] > -4280) {
      //Wenn wir am Rand sind, pruefen wir nur ein nebenanliegendes Feld
      //linker Rand
      if (j == 0) {
        //Wenn dieses Objekt daneben nicht weitergeht, faellt das einzelne Quadrat
        if (this.gridArray[i][j] !== this.gridArray[i][j + 1]) {
          //Das Feld darunter enthaelt nun den Stein
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          //Das Feld darueber wird auf Null zurueckgesetzt
          this.gridArray[i][j] = 0;
        }
        //Wenn es weitergeht
        else {
          //Das Quadrat faellt, wenn das danebenliegende Quadrat auch in der Luft haengt
          if (this.gridArray[i + 1][j + 1] === 0) {
            //Dann fallen beide Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
          }
        }
      }
      //rechter Rand
      else if (j == this.bloeckeProZeile - 1) {
        //Wenn daneben kein Quadrat ist, faellt das einzelne Quadrat
        if (this.gridArray[i][j] !== this.gridArray[i][j - 1]) {
          //Das Feld darunter enthaelt nun den Stein
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          //Das Feld darueber wird auf Null zurueckgesetzt
          this.gridArray[i][j] = 0;
        }
        //Gibt es daneben noch eins
        else {
          //wird erst mal geprueft, ob es in der Luft haengt, wenn ja, fallen beide
          if (this.gridArray[i + 1][j - 1] === 0) {
            //Dann fallen beide Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j - 1] = this.gridArray[i][j - 1];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j - 1] = 0;
          }
        }
      }
      //alles dazwischen
      else {
        //Einmal rechts daneben pruefen
        //Wenn dieses Objekt daneben nicht weitergeht, faellt das einzelne Quadrat
        if (this.gridArray[i][j] !== this.gridArray[i][j + 1] && this.gridArray[i][j] !== this.gridArray[i][j - 1]) {
          //Das Feld darunter enthaelt nun den Stein
          this.gridArray[i + 1][j] = this.gridArray[i][j];
          //Das Feld darueber wird auf Null zurueckgesetzt
          this.gridArray[i][j] = 0;
        }
        //Wenn es weitergeht
        else if (this.gridArray[i][j] === this.gridArray[i][j + 1] && this.gridArray[i][j] !== this.gridArray[i][j - 1]) {
          //Das Quadrat faellt, wenn das danebenliegende Quadrat auch in der Luft haengt
          if (this.gridArray[i + 1][j + 1] === 0) {
            //Dann fallen beide Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j + 1] = this.gridArray[i][j + 1];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j + 1] = 0;
          }
        }
        else if (this.gridArray[i][j] !== this.gridArray[i][j + 1] && this.gridArray[i][j] === this.gridArray[i][j - 1]) {
          //Das Quadrat faellt, wenn das danebenliegende Quadrat auch in der Luft haengt
          if (this.gridArray[i + 1][j - 1] === 0) {
            //Dann fallen beide Quadrate
            this.gridArray[i + 1][j] = this.gridArray[i][j];
            this.gridArray[i + 1][j - 1] = this.gridArray[i][j - 1];
            //Zuruecksetzen der urspruenglichen Position
            this.gridArray[i][j] = 0;
            this.gridArray[i][j - 1] = 0;
          }
        }
      }
    }
  }
}
