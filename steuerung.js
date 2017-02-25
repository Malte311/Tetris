//Konstruktor Funktion
function Steuerung(object) {
  //Funktion zum steuern nach links und rechts
  this.steuerungLR = function() {
    //Spiel kann mit der Taste p oder Enter pausiert bzw. fortgesetzt werden
    if (keyCode == 13 || keyCode == 80) {
      running = !running;
    }
    //Steuerung nur moeglich, wenn Spiel laeuft
    if (running) {
      //Bewegung nach links mit Pfeiltaste links oder a
      if (keyCode == LEFT_ARROW || keyCode == 65) {
        if (object.x > 0) {
          object.x -= graphics.blockBreite;
        }
      }
      //Bewegung nach rechts mit Pfeiltaste rechts oder d
      else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        if (object.x < width - 2 * graphics.blockBreite) {
          object.x += graphics.blockBreite;
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
    if (object.y < height - object.hoehe) {
      graphics.gridArray[object.y][object.x] = 0;
      graphics.gridArray[object.y + 1][object.x] = 1;
    }
  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {
    for (var i = 0; i < graphics.bloeckeProSpalte; i++) {
      if (graphics.gridArray[i][object.x])

    }
  }
  //Funktion zum Testen ob eine Zeile voll ist
  this.reiheVoll = function() {
    for (var i = 0; i < graphics.bloeckeProSpalte; i++) {
      for (j = 0; j < graphics.bloeckeProZeile; j++) {
        if (graphics.gridArray[i][j] == 0) {
          break;
        }
        if (graphics.gridArray[i][j] != 0){
          graphics.deleteVolleReihe(i);
        }
      }
    }
  }
}
