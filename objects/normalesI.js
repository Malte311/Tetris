//Konstruktor Funktion
function NormalesI() {

  //Postionswerte dieses Objektes
  this.x = seitenrand + (anzahlBloecke / 2 - 1) * blockBreite;
  this.y = 0;

  //Funktion zum Zeichnen des Objektes
  this.display = function() {
    fill(0, 255, 255);
    noStroke();
    rect(this.x - 4 * blockBreite, this.y, blockBreite, 4 * blockHoehe);
  }
}
