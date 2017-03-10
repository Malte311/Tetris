//Variable, die zu schnelles Bewegen verhindert
var bewegenOK = true;
var einfachBewegt;
//Konstruktor Funktion (bekommt das zu steuernde Objekt uebergeben)
function Steuerung(object) {
  //Fuer erweiterte Steuerung (Bewegungen nach links und rechts)
  this.xLeft = object.x - 1;
  this.xRight = object.x + 1;
  //Funktion zum Steuern nach links und rechts (einfacher Tastendruck)
  this.steuerungLR = function() {
    //Spiel kann mit der Taste p oder Enter pausiert bzw. fortgesetzt werden
    if ((keyCode == 13 || keyCode == 80) && !dialogOffen) {
      running = !running;
      //Die Variable start ist nur zu Beginn true, danach ist sie immer auf false
      graphics.start = false;
    }
    //Steuerung nur moeglich, wenn das Spiel laeuft und der Block nicht bereits fest ist
    //Oder wenn das Objekt kurz vor der Platzierung ist, kann noch kurz eine letzte Bewegung durchgefuehrt werden
    if ((running && object.isMoving) || (running && object.lastMove)) {
      //Bewegung nach links mit Pfeiltaste links oder a
      if ((keyCode == LEFT_ARROW || keyCode == 65) && bewegenOK) {
        object.bewegungLinks();
        einfachBewegt = true;
        setTimeout(function() {einfachBewegt = false}, 200);
      }
      //Bewegung nach rechts mit Pfeiltaste rechts oder d
      else if ((keyCode == RIGHT_ARROW || keyCode == 68) && bewegenOK) {
        object.bewegungRechts();
        einfachBewegt = true;
        setTimeout(function() {einfachBewegt = false}, 200);
      }
      //Drehen eines Objektes mittels Pfeiltaste hoch oder w
      else if ((keyCode == UP_ARROW || keyCode == 87)) {
        object.drehen();
      }
      //Leertaste fuer den freien Fall
      else if (keyCode == 32) {
        object.freierFall();
      }
    }
    //Wenn das Spiel nicht laeuft, und das Spiel vorbei ist, soll man neu starten koennen
    else if (gameOver && keyCode == 13) {
      //Spielfeld resetten
      setup();
      //nicht mehr gameOver
      gameOver = false;
      //Spiel laeuft wieder
      running = true;
      //Und das Fenster ist nicht das erste Mal offen
      graphics.start = false;
    }
  }
  //Funktion, die dafuer sorgt, dass das Objekt staendig faellt
  this.gravity = function() {
    object.gravity();
  }
  //Funktion zum Testen, ob eine Zeile voll ist
  this.reiheVoll = function() {
    //Durchlaufe alle Reihen
    for (var i = 0; i < graphics.bloeckeProSpalte; i++) {
      //Angenommen, eine Reihe ist voll
      var reiheVoll = true;
      //Durchlaufe jedes Feld der Reihe
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        //Wenn nur ein Feld keinen Stein beinhaltet, ist sie nicht voll
        if (!(graphics.gridArray[i][j] < 0)) {
          reiheVoll = false;
          //Dann muss die Schleife auch nicht weiter durchlaufen werden
          break;
        }
      }
      //Wird die Schleife komplett durchlaufen und am Ende ist kein leeres Feld gefunden,
      //dann wird die Reihe wohl voll sein
      if (reiheVoll) {
        //Und es soll die volle Reihe geloescht werden
        graphics.deleteVolleReihe(i);
      }
    }
  }
  //Funktion fuer die erweiterte Steuerung (Tasten gedrueckt halten)
  this.erweiterteSteuerung = function() {
    //Steuerung nur moeglich, wenn das Spiel laeuft und der Block nicht bereits fest ist
    //Oder wenn das Objekt kurz vor der Platzierung ist, kann noch kurz eine letzte Bewegung durchgefuehrt werden
    if ((running && object.isMoving) || (running && object.lastMove)) {
      //Block schnell runter fallen lassen mit Pfeiltaste unten oder s
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        //Die Geschwindigkeit der gravity wird erhoeht, solange die Taste gedrueckt ist
        speed = 0.35;
      }
      //Sobald die Taste losgelassen wird
      else {
        //Wird die Geschwindigkeit wieder auf den normalen Wert gesetzt
        speed = defaultSpeed;
      }
      //Steuerung mit gedrueckt gehaltenen Tasten
      //Fuer links
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        //Erst pruefen, ob eine Bewegung moeglich ist
        if (object.moveLeftPossible && bewegenOK && !einfachBewegt) {
          //Nachdem bewegt wurde, darf fuer ein paar Millisekunden nicht wieder bewegt werden
          bewegenOK = false;
          //Dann bewegen
          object.x -= 1;
          //Die Bewegung soll aber nicht zu schnell sein
          setTimeout(function() {bewegenOK = true}, 200);
        }
      }
      //Fuer rechts
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        //Erst pruefen, ob eine Bewegung moeglich ist
        if (object.moveRightPossible && bewegenOK && !einfachBewegt) {
          //Nachdem bewegt wurde, darf fuer ein paar Millisekunden nicht wieder bewegt werden
          bewegenOK = false;
          //Dann bewegen
          object.x += 1;
          //Die Bewegung soll aber nicht zu schnell sein
          setTimeout(function() {bewegenOK = true}, 200);
        }
      }
    }
  }
}
