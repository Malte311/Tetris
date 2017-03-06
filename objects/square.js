//Konstruktor Funktion
function Square() {
  //Position bestehend aus x Wert und y Wert
  //Zu Beginn in der Mitte des Spielfeldes
  this.x = graphics.bloeckeProZeile / 2 - 1;
  //und ganz oben
  this.y = 0;
  //farbCode dieses Steines (entspricht dann gelb beim zeichnen)
  this.farbCode = 1;
  this.platziert = -1;
  //Variable, die angibt, ob sich der Stein noch bewegt oder bereits fest ist
  this.isMoving = true;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  2;
  this.breite = 2;
  //Funktion zum Anzeigen
  this.display = function() {
    //bewegt sich der Block noch, wird dies ausgefuehrt (spaetestens ganz unten bewegt sich der Stein nicht mehr)
    //round Funktion, da der y-Wert durch die gravity Funktion auch Kommazahlen annehmen kann, und das keine Indizes im Array sind
    if (this.isMoving && round(this.y) + this.hoehe < graphics.bloeckeProSpalte) {
      //Zeichnen des Quadrates, besteht aus vier kleinen Rechtecken (Quadraten)
      graphics.gridArray[round(this.y)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y)][this.x + 1] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = this.farbCode;
    }
    //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
    else {
      //Zeichnen des Quadrates, besteht aus vier kleinen Rechtecken (Quadraten)
      graphics.gridArray[round(this.y)][this.x] = this.platziert;
      graphics.gridArray[round(this.y)][this.x + 1] = this.platziert;
      graphics.gridArray[round(this.y + 1)][this.x] = this.platziert;
      graphics.gridArray[round(this.y + 1)][this.x + 1] = this.platziert;
      //Nun bewegt sich der Stein nicht mehr weiter
      this.isMoving = false;
    }
  }
  //Funktion zum Drehen (hier leer)
  this.drehen = function() {
    //tut nichts, da ein Quadrat gedreht gleich bleibt
    //ist implementiert, da so in der Steuerung auf object.drehen() verwiesen kann fuer alle Objekte
  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {
    //Die Reihen werden durchlaufen, ausgehend vom aktuellen y-Wert bzw. evtl. ein Feld darueber bereits
    //(da die floor Funktion immer abrundet, so kann definitiv nichts ausgelassen werden)
    for (var i = floor(this.y); i < graphics.bloeckeProSpalte; i++) {
      //Sollte irgendwo ein bereits belegtes Feld auftreten, fuehre dies aus
      if (graphics.gridArray[i][this.x] < 0 || graphics.gridArray[i][this.x + 1] < 0) {
        //Der neue y-Wert ist nun so, dass dieses Objekt direkt auf dem bereits belegten Feld platziert wird
        this.y = i - this.hoehe;
        //Dann wird dieses Objekt dort fest
        this.isMoving = false;
        //Und die Schleife braucht auch nicht weiter durchlaufen werden
        break;
      }
      //Sollte sich kein Hindernis finden lassen, dann passiert dies
      else {
        //Das Objekt kann nach ganz unten platziert werden
        this.y = graphics.bloeckeProSpalte - this.hoehe;
        //Und bewegt sich dann nicht weiter
        this.isMoving = false;
      }
    }
  }
  //Funktion fuer das automatische runterfallen
  this.gravity = function() {
    //Wird nur ausgefuehrt, solange das Objekt nicht bereits ganz unten angekommen ist
    if (round(this.y) < graphics.bloeckeProSpalte - this.hoehe) {
      //Ist unter dem Objekt kein Hinternis, soll es weiter fallen
      if (graphics.gridArray[round(this.y + this.hoehe)][this.x] == 0 && graphics.gridArray[round(this.y + this.hoehe)][this.x + 1] == 0) {
        //Dazu wird der y-Wert einfach weiter erhoeht
        this.y += speed;
      }
      //Gibt es ein bereits belegtes Feld unter diesem Objekt, dann
      else {
        //stoppt dieses Objekt
        this.isMoving = false;
      }
    }
  }
  //Funktion zum Bewegen nach rechts
  this.bewegungRechts = function() {
    //Eine Bewegung nach rechts soll nur moeglich sein, wenn dadurch nicht das Spielfeld verlassen wird
    if (this.x < graphics.bloeckeProZeile - this.breite) {
      //Zudem darf kein Objekt ein Feld rechts von diesem Objekt blockieren
      if (!(graphics.gridArray[round(this.y)][this.x + this.breite] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + this.breite] < 0)) {
        //Dann kann dieses Objekt ein Block nach rechts bewegt werden
        this.x += 1;
      }
    }
  }
  //Funktion zum Bewegen nach links
  this.bewegungLinks = function() {
    //Eine Bewegung nach links soll nur moeglich sein, wenn dadurch nicht das Spielfeld verlassen wird
    if (this.x > 0) {
      //Ausserdem darf links von diesem Objekt kein Hindernis sein
      if (!(graphics.gridArray[round(this.y)][this.x - 1] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x - 1] < 0)) {
        //Dann kann dieses Objekt einen Block nach links bewegt werden
        this.x -= 1;
      }
    }
  }
  //Funktion zum Pruefen, ob ausreichend Platz ist, um das Objekt zu erzeugen
  this.createNewObjectIsPossible = function() {
    //Es kann ein neues Objekt erzeugt werden, wenn folgende Bedingungen erfuellt sind (die Startposition dieses Objektes muss frei sein)
    //(die Felder, die frei sein muessen, sind genau die, wo das Objekt angezeigt werden soll mittels display Funktion)
    if (!(graphics.gridArray[round(this.y)][this.x] < 0) && !(graphics.gridArray[round(this.y)][this.x + 1] < 0) &&
    !(graphics.gridArray[round(this.y + 1)][this.x] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + 1] < 0)) {
      //Sind die Bedingungen erfuellt, gebe true zurueck
      return true;
    }
    //Sollte kein neues Objekt erzeugt werden koennen
    else {
      //dann gib false zurueck
      return false;
    }
  }
}
