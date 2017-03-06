//Konstruktor Funktion
function Steuerung(object) {
  //Funktion zum steuern nach links und rechts
  this.steuerungLR = function() {
    //Spiel kann mit der Taste p oder Enter pausiert bzw. fortgesetzt werden
    if (keyCode == 13 || keyCode == 80) {
      running = !running;
    }
    //Steuerung nur moeglich, wenn Spiel laeuft und der Block nicht bereits fest ist
    if (running && object.isMoving) {
      //Bewegung nach links mit Pfeiltaste links oder a
      if (keyCode == LEFT_ARROW || keyCode == 65) {
        object.bewegungLinks();
      }
      //Bewegung nach rechts mit Pfeiltaste rechts oder d
      else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        object.bewegungRechts();
      }
      //Drehen eines Objektes mittels Pfeiltaste hoch oder w
      else if (keyCode == UP_ARROW || keyCode == 87) {
        object.drehen();
      }
      //Leertaste fuer den freien Fall
      else if (keyCode == 32) {
        object.freierFall();
      }

      //Block schnell runter fallen lassen mit Pfeiltaste unten oder s
      // if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      //   speed = 0.05;
      // }
      // else {
      //   speed = defaultSpeed;
      // }
    }
  }
  //Funktion, die dafuer sorgt, dass das Objekt faellt
  this.gravity = function() {
    object.gravity();
  }
  //Funktion zum Testen ob eine Zeile voll ist
  this.reiheVoll = function() {
    //Durchlaufe alle Reihen
    for (var i = 0; i < graphics.bloeckeProSpalte; i++) {
      //Angenommen, eine Reihe ist voll
      var reiheVoll = true;
      //Durchlaufe jedes Feld der Reihe
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        //Wenn ein Feld keinen Stein beinhaltet, ist sie nicht voll
        if (!(graphics.gridArray[i][j] < 0)) {
          reiheVoll = false;
          //Dann muss die Schleife auch nicht weiter durchlaufen werden
          break;
        }
      }
      //Wird die Schleife komplett durchlaufen und am Ende ist kein leeres Feld gefunden
      //Dann wird die Reihe wohl voll sein
      if (reiheVoll) {
        //Und es soll die volle Reihe geloescht werden
        graphics.deleteVolleReihe(i);
      }
    }
  }
}
