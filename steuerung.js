//Konstruktor Funktion
function Steuerung(object) {
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
        if (object.x > 0) {
          object.x -= 1;
        }
      }
      //Bewegung nach rechts mit Pfeiltaste rechts oder d
      else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        if (object.x <= graphics.bloeckeProZeile - object.breite - 1) {
          object.x += 1;
        }
      }
      //Block schnell runter fallen lassen mit Pfeiltaste unten oder s
      else if (keyCode == DOWN_ARROW || keyCode == 83) {
        this.freierFall();
      }
      //Drehen eines Objektes mittels Pfeiltaste hoch oder w
      else if (keyCode == UP_ARROW || keyCode == 87) {
        object.drehen();
      }
    }
  }
  //Funktion, die dafuer sorgt, dass das Objekt faellt
  this.gravity = function() {
    if (object.y < graphics.bloeckeProSpalte - object.hoehe) {
      if (graphics.gridArray[round(object.y + object.hoehe)][object.x] == 0) {
        object.y += 0.03;
      }
      else {
        object.isMoving = false;
      }
    }
  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {
    for (var i = object.y; i < graphics.bloeckeProSpalte - object.hoehe; i++) {
      //if (graphics.gridArray[i][object.x] !== 0) {
        object.y = 18;
      //}
    }
  }
  //Funktion zum Testen ob eine Zeile voll ist
  this.reiheVoll = function() {
    for (var i = 0; i < graphics.bloeckeProSpalte; i++) {
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        if (graphics.gridArray[i][j] != 0) {
          continue;
        }
        if (graphics.gridArray[i][graphics.bloeckeProZeile - 1] != 0) {
          graphics.deleteVolleReihe(i);
        }
      }
    }
  }
  //Funktion zum Testen, ob der Spieler verloren hat
  this.checkIfPlayerLost = function() {
    
  }
}
