
//Konstruktor Funktion
function Square() {

  //Position bestehend aus x Wert und y Wert
  this.x = seitenrand + (anzahlBloecke / 2 - 1) * blockBreite;
  this.y = 0;
  //Groesse eines Objektes
  this.hoehe = 44;
  this.breite = 44;

  //Funktion zum Anzeigen
  this.display = function() {
    fill(255, 255, 0);
    noStroke();
    rect(this.x, this.y, this.hoehe, this.breite);
  }

  //Funktion zum Fallen
  this.move = function() {
    if (this.y < height - 2 * blockHoehe){
      this.y += speed * 0.5;
    }
  }

  //Funktion zum steuern nach links und rechts
  this.steuerung = function() {
    //Steuerung nur moeglich, wenn Spiel laeuft
    if (running) {
      //Bewegung nach links mit Pfeiltaste oder a
      if (keyCode == LEFT_ARROW || keyCode == 65) {
        if (this.x > seitenrand) {
          this.x -= blockBreite;
        }
      }
      //Bewegung nach rechts mit Pfeiltaste oder d
      else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        if (this.x < width - seitenrand - 2 * blockBreite) {
          this.x += blockBreite;
        }
      }
    }
  }
}
