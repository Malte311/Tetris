//Konstrutor Funktion
function GUI() {
  //Variablen vom Graphical User Interface
  //Variable fuer den Scorewert
  this.score = 0;
  //Variable zur dynamischen Anpassung der Position der Scorewertanzeige
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
  //Variable die angibt, ob das Spiel das allererste Mal gestartet wird
  this.start = true;
  //Funktion zum Zeichnen des Grids
  this.grid = function() {
    //Grid zeichnen, Linien in weiß
    stroke(255);
    //Dicke der Linien anpassen
    strokeWeight(1.5);
    //Es werden Rechtecke gezeichnet, die vorerst nicht ausgefuellt werden sollen (da nur ein Grid gezeichnet werden soll)
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
  //Funktion zum Fuellen des Arrays (ueberall wird der Wert 0 gespeichert)
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
  //Bekommt als Parameter den Index des Arrays uebergeben, der angibt, welche Zeile geloescht werden soll
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
          //if Abfrage fuer die Farbwahl (positive Werte = Objekt bewegt sich noch, negative Werte = Objekt ist fest)
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
  //und die alte Position rausgenommen wird (das Feld dort wieder schwarz gezeichnet wird)
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
  //Funktion fuer den Game Over Screen (wenn der Spieler verloren hat)
  this.gameOver = function() {
    //Spiel ist vorbei
    gameOver = true;
    //Das Level wird wieder auf 1 gesetzt
    level = 1;
    //Die Geschwindigkeit wird dementsprechend angepasst
    this.updateLevel();
    //Die Funktion passt die Schrift an
    this.textStyle();
    //Damit dann der Text angezeigt werden kann
    vtx.fillText("Press Enter to Play again!", 5, canvas.height / 2 + this.blockHoehe);
    //Diesen Text etwas groesser machen
    vtx.font = "40px impact";
    //Den erreichten Scorewert anzeigen
    vtx.fillText("Score: " + this.score, 5, canvas.height / 2 + 4 * this.blockHoehe);
    //und diesen nochmals vergroessern
    vtx.font = "55px impact";
    //Schriftzug mit "Game Over"
    vtx.fillText("Game Over!", 5, canvas.height / 2 - this.blockHoehe);
  }
  //Funktion zum Updaten der Scoreanzeige
  this.updateScore = function() {
    //Fuer jeden Stein, der entfernt wird, gibt es einen Punkt
    this.score += this.bloeckeProZeile;
    //Anpassen des x-Wertes, falls der Scorewert mehrstellig wird
    //Bis zu 999999 wird es korrekt angezeigt. Ab einer Million wird nicht weiter angepasst,
    //da dieser Wert extrem unrealistisch zu erreichen ist
    //Scorewert zweistellig
    if (this.score > 9) {
      this.scoreX = 225;
    }
    //Scorewert dreistellig
    if (this.score > 99) {
      this.scoreX = 215;
      //Ab 100 Punkten kommt man in Level 2
      level = 2;
    }
    //Scorewert vierstellig
    if (this.score > 999) {
      this.scoreX = 205;
      //Ab 1,000 Punkten kommt man in Level 3
      level = 3;
    }
    //Scorewert fuenfstellig
    if (this.score > 9999) {
      this.scoreX = 195;
      //Ab 10,000 Punkten kommt man in Level 4
      level = 4;
    }
    //Scorewert sechsstellig
    if (this.score > 99999) {
      this.scoreX = 185;
      //Ab 100,000 Punkten kommt man in Level 5
      level = 5;
    }
    //Anzeige updaten
    this.drawAnzeige();
    //Und die Geschwindigkeit anpassen, falls ein neues Level erreicht wurde
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
    //Pruefe danach, ob noch eine Reihe voll geworden ist
    controller.reiheVoll();
  }
  //Funktion um die Anzeige fuer den Score anzuzeigen
  this.drawAnzeige = function() {
    //Create gradient (fuer Schrift mit verschiedenen Farben)
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    //Score anzeigen
    //erst den alten Wert mit der Hintergrundfarbe ueberschreiben (loeschen)
    ctx.fillStyle = "#aaa";
    ctx.fillRect(100, 25, 200, 55);
    //Schriftfont einstellen
    ctx.font = "30px Verdana";
    //Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(graphics.score, this.scoreX, 50);
    vtx.fillStyle = linearGradient;
    //Anzeige,wenn das Spiel nicht laeuft
    if (this.start) {
      //Das wird angezeigt, wenn das Spiel noch nicht gestartet worden ist
      vtx.fillText("Press Enter to Start!", 1.5 * this.blockBreite - 1, canvas.height / 2 - this.blockHoehe);
    }
    //Wenn das Spiel schon gestartet worden ist, aber pausiert wurde
    else if (!gameOver) {
      //Dann wird angezeigt, dass das Spiel momentan pausiert ist
      vtx.fillText("PAUSED", canvas.width / 3, this.blockHoehe);
      vtx.fillText("Press Enter to Continue!", this.blockBreite / 2, 2 * this.blockHoehe);
    }
  }
  //Nur bei Setup aufrufen, da der Schriftzug sonst immer wieder draufgezeichnet wird und die Pixel immer dicker werden
  this.drawAnzeigeNurBeiSetup = function() {
    //Erst mal die alte Anzeige loeschen (falls ein neues Spiel gestartet wurde)
    ctx.fillStyle = "#aaa";
    ctx.fillRect(25, 5, 250, 15);
    ctx.fillRect(100, 25, 200, 55);
    //Create gradient
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    //Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.font = "20px Arial";
    //Anzeige zeichnen
    ctx.strokeText("Next", 30, 15);
    ctx.strokeText("Score", 220, 15);
    //Score Anzeigen
    ctx.fillStyle = "#aaa";
    ctx.fillRect(100, 35, 200, 45);
    ctx.font = "30px Verdana";
    //Fill with gradient
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
  //Funktion zum Levelaufstieg (passt die Geschwindigkeit an)
  this.updateLevel = function() {
    //Sobald man ein neues Level erreicht, wird die Spielgeschwindigkeit erhoeht
    switch (level) {
      //Level 1
      case 1:
        defaultSpeed = 0.03;
        speed = 0.03;
        break;
      //Level 2
      case 2:
        defaultSpeed = 0.04;
        speed = 0.04;
        break;
      //Level 3
      case 3:
        defaultSpeed = 0.055;
        speed = 0.055;
        break;
      //Level 4
      case 4:
        defaultSpeed = 0.08;
        speed = 0.08;
        break;
      //Level 5
      case 5:
        defaultSpeed = 0.15;
        speed = 0.15;
        break;
    }
  }
}
