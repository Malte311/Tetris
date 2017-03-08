//Konstrutor Funktion
function GUI() {
  //Variablen vom Graphical User Interface
  //Variable fuer den Scorewert
  this.score = 0;
  //Variable zur dynamischen Anpassung der Position des Scorewertes
  this.scoreX = 235;
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
  //Variable die angibt, ob man startet oder nur pausiert
  this.start = true;
  //Funktion zum Zeichnen des Grids
  this.grid = function() {
    //Grid zeichnen, Linien in weiß
    stroke(255);
    strokeWeight(1.5);
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
    this.updateRows(index);
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
          if (this.gridArray[i][j] == 7 || this.gridArray[i][j] == -7) {
            fill(255, 128, 0);
          }
          //NormalesZ (rot)
          else if (this.gridArray[i][j] == 6 || this.gridArray[i][j] == -6) {
            fill(255, 0, 0);
          }
          //GedrehtesZ (gruen)
          else if (this.gridArray[i][j] == 5 || this.gridArray[i][j] == -5) {
            fill(0, 255, 0);
          }
          //GedrehtesL (blau)
          else if (this.gridArray[i][j] == 4 || this.gridArray[i][j] == -4) {
            fill(0, 0, 255);
          }
          //NormalesT (lila)
          else if (this.gridArray[i][j] == 3 || this.gridArray[i][j] == -3) {
            fill(255, 0, 255);
          }
          //NormalesI (tuerkis)
          else if (this.gridArray[i][j] == 2 || this.gridArray[i][j] == -2) {
            fill(0, 255, 255);
          }
          //Square (gelb)
          else if (this.gridArray[i][j] == 1 || this.gridArray[i][j] == -1) {
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
    //Spiel ist vorbei
    gameOver = true;
    level = 1;
    this.updateLevel();
    this.textStyle();
    vtx.fillText("Press Enter to Play again!", 5, canvas.height / 2 + this.blockHoehe);
    vtx.font = "40px impact";
    vtx.fillText("Score: " + this.score, 5, canvas.height / 2 + 4 * this.blockHoehe);
    vtx.font = "55px impact";
    vtx.fillText("Game Over!", 5, canvas.height / 2 - this.blockHoehe);
  }
  //Funktion zum Updaten der Scoreanzeige
  this.updateScore = function() {
    //Fuer jeden Stein, der entfernt wird, gibt es einen Punkt
    this.score += this.bloeckeProZeile;
    //Anpassen des x-Wertes, falls der Scorewert mehrstellig wird
    //Bis zu 999999 wird es korrekt angezeigt. Ab einer Million wird nicht weiter angepasst
    if (this.score > 9) {
      this.scoreX = 225;
    }
    if (this.score > 99) {
      this.scoreX = 215;
      level = 2;
    }
    if (this.score > 999) {
      this.scoreX = 205;
      level = 3;
    }
    if (this.score > 9999) {
      this.scoreX = 195;
      level = 4;
    }
    if (this.score > 99999) {
      this.scoreX = 185;
      level = 5;
    }
    //Anzeige updaten
    this.drawAnzeige();
    this.updateLevel();
    //Score in der Console ausgeben
    //console.log(this.score);
  }
  //Funktion zum Runterfallen von Steinen, die in der Luft schweben wuerden, wenn eine Reihe geloescht wird
  //Bekommt als Parameter uebergeben, welche Reihe geloescht worden ist
  this.updateRows = function(index) {
    //Durchlaufe alle Reihen von unten nach oben, ab der Reihe ueber der geloeschten Reihe
    for (var i = index - 1; i > 0; i--) {
      //Durchlaufe alle Felder der Reihe
      for (j = 0; j < this.bloeckeProZeile; j++) {
        //Nun verschiebe alles um eins nach unten
        this.gridArray[i + 1][j] = this.gridArray[i][j];
        //Alte Position loeschen
        this.gridArray[i][j] = 0;
      }
    }
    //Pruefe danach, ob noch eine Reihe voll ist
    controller.reiheVoll();
  }
  //Funktion um die Anzeige fuer den Score anzuzeigen
  this.drawAnzeige = function() {
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    //Score Anzeigen
    ctx.fillStyle = "#aaa";
    ctx.fillRect(100, 25, 200, 55);
    ctx.font = "30px Verdana";
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(graphics.score, this.scoreX, 50);
    vtx.fillStyle = linearGradient;
    if (this.start) {
      vtx.fillText("Press Enter to Start!", 1.5 * this.blockBreite - 1, canvas.height / 2 - this.blockHoehe);
    }
    else if (!gameOver) {
      vtx.fillText("PAUSED", canvas.width / 3, this.blockHoehe);
      vtx.fillText("Press Enter to Continue!", this.blockBreite / 2, 2 * this.blockHoehe);
    }
  }
  //Nur fuer Setup
  this.drawAnzeigeNurBeiSetup = function() {
    ctx.fillStyle = "#aaa";
    ctx.fillRect(25, 5, 250, 15);
    ctx.fillRect(100, 25, 200, 55);
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.font = "20px Arial";
    ctx.strokeText("Next", 30, 15);
    ctx.strokeText("Score", 220, 15);
    //ctx.moveTo(0,0);
    //Score Anzeigen
    ctx.fillStyle = "#aaa";
    ctx.fillRect(100, 35, 200, 45);
    ctx.font = "30px Verdana";
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(graphics.score, this.scoreX, 50);
  }
  //Einstellen der Schrift
  this.textStyle = function() {
    v = document.getElementById("canvasID");
    vtx = v.getContext("2d");
    //Anzeige fuer den Spieler
    // create the rainbow linear-gradient
    linearGradient = vtx.createLinearGradient(0, 0, v.width, 0);
    linearGradient.addColorStop(0, "rgba(255, 0, 0, 1)");
    linearGradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
    linearGradient.addColorStop(0.3, "rgba(0, 255, 0, 1)");
    linearGradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
    linearGradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
    linearGradient.addColorStop(0.8, "rgba(255, 0, 255, 1)");
    linearGradient.addColorStop(1, "rgba(255, 0, 0, 1)");
    vtx.fillStyle = linearGradient;
    vtx.font = "25px impact";
  }
  //Funktion zum Levelaufstieg
  this.updateLevel = function() {
    switch (level) {
      case 1:
        defaultSpeed = 0.03;
        speed = 0.03;
        break;
      case 2:
        defaultSpeed = 0.04;
        speed = 0.04;
        break;
      case 3:
        defaultSpeed = 0.055;
        speed = 0.055;
        break;
      case 4:
        defaultSpeed = 0.08;
        speed = 0.08;
        break;
      case 5:
        defaultSpeed = 0.15;
        speed = 0.15;
        break;
    }
  }
}
