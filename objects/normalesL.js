//Konstruktor Funktion
function NormalesL() {
  //Position bestehend aus x Wert und y Wert
  this.x = graphics.bloeckeProZeile / 2 - 1;
  this.y = 0;
  this.farbCode = 7;
  this.platziert = -7;
  this.isMoving = true;
  this.senkrecht = true;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  3;
  this.breite = 2;
  //Funktion zum Anzeigen
  this.display = function() {

  }
  //Funktion zum Drehen
  this.drehen = function() {

  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {

  }
  //Funktion fuer das automatische runterfallen
  this.gravity = function() {

  }
  //Funktion zum Bewegen nach rechts
  this.bewegungRechts = function() {

  }
  //Funktion zum Bewegen nach links
  this.bewegungLinks = function() {

  }
  //Funktion zum Pruefen, ob ausreichend Platz ist, um das Objekt zu erzeugen
  this.createNewObjectIsPossible = function() {

  }
}
