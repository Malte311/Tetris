//Konstruktor Funktion
function Steuerung(object) {
  //Variable zum steuern der Geschwindigkeit, mit der die Steine fallen
  this.speed = 0.03;
  //Funktion zum steuern nach links und rechts
  this.steuerungLR = function() {
    //Spiel kann mit der Taste p oder Enter pausiert bzw. fortgesetzt werden
    if (keyCode == 13 || keyCode == 80) {
      running = !running;
    }
    //Steuerung nur moeglich, wenn Spiel laeuft
    if (running && object.isMoving) {
      //Bewegung nach links mit Pfeiltaste links oder a
      if (keyCode == LEFT_ARROW || keyCode == 65) {
        object.bewegungLinks();
      }
      //Bewegung nach rechts mit Pfeiltaste rechts oder d
      else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        object.bewegungRechts();
      }
      //Block schnell runter fallen lassen mit Pfeiltaste unten oder s
      else if (keyCode == DOWN_ARROW || keyCode == 83) {
        object.freierFall();
      }
      //Drehen eines Objektes mittels Pfeiltaste hoch oder w
      else if (keyCode == UP_ARROW || keyCode == 87) {
        object.drehen();
      }
    }
  }
  //Funktion, die dafuer sorgt, dass das Objekt faellt
  this.gravity = function() {
    object.gravity();
  }
  //Funktion zum Testen ob eine Zeile voll ist
  this.reiheVoll = function() {
    for (var i = 0; i < graphics.bloeckeProSpalte; i++) {
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        if (!(graphics.gridArray[i][j] < 0)) {
          break;
        }
        if (j == graphics.bloeckeProZeile - 1 && graphics.gridArray[i][j] < 0) {
          graphics.deleteVolleReihe(i);
        }
      }
    }
  }
}
