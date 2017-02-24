//Konstruktor Funktion
function Square() {
  //Position bestehend aus x Wert und y Wert
  this.x = seitenrand + (anzahlBloecke / 2 - 1) * blockBreite;
  this.y = 0;
  //Funktion zum Anzeigen
  this.display = function() {
    fill(0, 255, 255);
    noStroke();
    rect(this.x, this.y, 2 * 22, 2 * 22);
  }
  //Funktion zum Fallen
  this.move = function() {
    if (this.y < hoehe - 2 * blockHoehe){
      this.y += speed * 0.5;
    }
  }
  //Funktion zum steuern
  this.steuerung = function() {
    if (running) {
      if (keyCode == LEFT_ARROW || keyCode == 65) {
        if (this.x > seitenrand) {
          this.x -= blockBreite;
        }
      }
      else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        if (this.x < breite - seitenrand - 2 * blockBreite) {
          this.x += blockBreite;
        }
      }
    }
  }
}
