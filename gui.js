//Konstrutor Funktion
function GUI() {

  //Funkton fuer die Sidebar rechts
  this.sideMenu = function() {
    fill(255);
    textSize(28);
    //aktuelle Scoreanzeige
    text("Score", width - seitenrand + blockBreite, 1.25 * blockHoehe);
    text(aktuellerScore, width - seitenrand + 1.25 * blockBreite, 3 * blockHoehe);
    //Highscoreanzeige
    text("Best", width - seitenrand + 1.25 * blockBreite, 4.75 * blockHoehe);
    text(highscore, width - seitenrand + 1.25 * blockBreite, 6.5 * blockHoehe);
    //Buttons zum Veraendern der Spielgeschwindigkeit und Pausebutton
    rect(width - seitenrand + blockBreite, 8 * blockHoehe, 75, 50);
    rect(width - seitenrand + blockBreite, 11 * blockHoehe, 75, 50);
    rect(width - seitenrand + blockBreite, 14 * blockHoehe, 75, 50);
    fill(0);
    stroke(0);
    text(">>", width - seitenrand + blockBreite + 22, 8 * blockHoehe + 36);
    text("<<", width - seitenrand + blockBreite + 22, 11 * blockHoehe + 36);
    if (running) {
      textSize(88);
      text("\"", width - seitenrand + blockBreite + 22, 16 * blockHoehe + 36);
    }
    else {
      textSize(60);
      text(">", width - seitenrand + blockBreite + 20, 15 * blockHoehe + 25);
    }
  }

  //Funktion zum Zeichnen des Grids
  this.grid = function() {
    //Zeichnet die vertikalen Linien
    for (var i = 0; i <= anzahlBloecke; i++) {
      //weiße Linien
      stroke(255);
      line(seitenrand + i * blockBreite, 0, seitenrand + i * blockBreite, height);
    }

    //Zeichnet die horizontalen Linien
    for (var i = 0; i <= height / blockHoehe; i++) {
      //weiße Linien
      stroke(255);
      line(seitenrand, i * blockHoehe, width - seitenrand, i * blockHoehe);
      }
  }

}
