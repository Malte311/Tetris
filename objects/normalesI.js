//Konstruktor Funktion
function NormalesI() {
  //Position bestehend aus x Wert und y Wert
  //Zu Anfang in der Mitte des Feldes
  this.x = graphics.bloeckeProZeile / 2 - 1;
  //und ganz oben
  this.y = 0;
  //farbCode fuer diesen Stein waehrend er sich bewegt
  this.farbCode = 2;
  //farbCode sobald der Stein sich nicht weiter bewegt
  this.platziert = -2;
  //zu Anfang bewegt er sich
  this.isMoving = true;
  //und ist zu Anfang senkrecht
  this.senkrecht = true;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  4;
  this.breite = 1;
  //Funktion zum Anzeigen
  this.display = function() {
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      //Ist der Block ganz unten, bewegt er sich nicht weiter
      if (this.isMoving && round(this.y) + this.hoehe < graphics.bloeckeProSpalte) {
        //Das Objekt besteht aus vier kleinen untereinander gereihten Rechtecken
        graphics.gridArray[round(this.y)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 1][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 2][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 3][this.x] = this.farbCode;
      }
      //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
      else {
        //Das Objekt besteht aus vier kleinen untereinander gereihten Rechtecken
        graphics.gridArray[round(this.y)][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 1][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 2][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 3][this.x] = this.platziert;
        //Und nun bewegt sich das Objekt nicht weiter
        this.isMoving = false;
      }
    }
    //Wenn der Stein quer liegt
    else {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      if (this.isMoving && round(this.y) + this.hoehe < graphics.bloeckeProSpalte) {
        //Das Objekt besteht aus vier kleinen hintereinander gereihten Rechtecken
        graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y + 1)][this.x + 1] = this.farbCode;
        graphics.gridArray[round(this.y + 1)][this.x + 2] = this.farbCode;
        graphics.gridArray[round(this.y + 1)][this.x + 3] = this.farbCode;
      }
      //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
      else {
        //Das Objekt besteht aus vier kleinen hintereinander gereihten Rechtecken
        graphics.gridArray[round(this.y + 1)][this.x] = this.platziert;
        graphics.gridArray[round(this.y + 1)][this.x + 1] = this.platziert;
        graphics.gridArray[round(this.y + 1)][this.x + 2] = this.platziert;
        graphics.gridArray[round(this.y + 1)][this.x + 3] = this.platziert;
        //Und das Objekt bewegt sich nicht weiter
        this.isMoving = false;
      }
    }
  }
  //Funktion zum Drehen
  this.drehen = function() {
    //Variable zur Hilfe, um Breite und Hoehe tauschen zu koennen, sobald gedreht wird
    var tauschen = this.hoehe;
    //Wenn es senkrecht ist, wird es quer gedreht
    if (this.senkrecht) {
      //Um drehen zu koennen, muss erst geprueft werden, ob ausreichend Platz vorhanden ist
      //Dafuer muss erst mal sichergestellt werden, dass das Array nicht verlassen wird, sprich, dass nur innerhalb des Feldes geprueft wird
      if (this.x > 1 && round(this.y) < graphics.bloeckeProSpalte - 1) {
        if (graphics.gridArray[round(this.y + 1)][this.x - 2] == 0 && graphics.gridArray[round(this.y + 1)][this.x - 1] == 0
        && graphics.gridArray[round(this.y + 1)][this.x + 1] == 0) {
          //Da der Stein nun nicht mehr senkrecht ist, soll seine Position nun angepasst werden
          this.x = this.x - 2;
          this.y = this.y + 1;
          //Die Hoehe wird zur Breite
          this.hoehe = this.breite;
          //Die Breite wird zur Hoehe
          this.breite = tauschen;
          //Nachdem gedreht wurde, ist das Objekt nun nicht mehr senkrecht
          this.senkrecht = !this.senkrecht;
        }
      }
    }
    //Wenn es quer liegt wird es senkrecht gedreht
    else {
      //Auch hier wird erst geprueft, ob Platz zum Drehen ist und vorher sichergestellt, dass das Array nicht verlassen wird
      if (this.x < graphics.bloeckeProZeile - 2 && round(this.y) < graphics.bloeckeProSpalte - 2) {
        if (graphics.gridArray[round(this.y - 1)][this.x + 2] == 0 && graphics.gridArray[round(this.y + 1)][this.x + 2] == 0
        && graphics.gridArray[round(this.y + 2)][this.x + 2] == 0) {
          //Position des Objektes anpassen
          this.x = this.x + 2;
          this.y = this.y - 1;
          //Hoehe und Breite vertauschen
          this.hoehe = this.breite;
          this.breite = tauschen;
          //Nun ist das Objekt wieder senkrecht
          this.senkrecht = !this.senkrecht;
        }
      }
    }
  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {
    //Zunaechst einmal werden alle Felder einer Spalte durchlaufen
    for (var i = floor(this.y); i < graphics.bloeckeProSpalte; i++) {
      //wenn der Stein senkrecht steht
      if (this.senkrecht) {
        //pruefen, ob an einer Stelle bereits ein Stein im Weg ist
        if (graphics.gridArray[i][this.x] < 0) {
          //wenn ja, dann wird dieses Objekt direkt darüber platziert
          this.y = i - this.hoehe;
          //und es bewegt sich nicht weiter
          this.isMoving = false;
          //zudem muss die Schleife nicht weiter durchlaufen
          break;
        }
        //Wenn nein, dann kann das Objekt nach ganz unten fallen
        else {
          //Objekt ganz unten platzieren
          this.y = graphics.bloeckeProSpalte - this.hoehe;
          //Objekt bewegt sich dann auch nicht mehr weiter
          this.isMoving = false;
        }
      }
      //Wenn der Stein quer liegt
      else {
        //Zuerst wird auch wieder geprueft, ob irgendwo ein Hindernis auftaucht
        if (graphics.gridArray[i][this.x] < 0 || graphics.gridArray[i][this.x + 1] || graphics.gridArray[i][this.x + 2] || graphics.gridArray[i][this.x + 3]) {
          //Wenn ja, wird dieses Objekt wieder direkt darueber platziert
          this.y = i - this.hoehe;
          //Und es bewegt sich nicht mehr weiter
          this.isMoving = false;
          //Zusaetzlich muss die Schleife nicht weiter durchlaufen
          break;
        }
        //Wenn es kein Hindernis gibt, dann wird dies ausgefuehrt
        else {
          //Das Objekt wird ganz unten platziert
          this.y = graphics.bloeckeProSpalte - this.hoehe;
          //Und bewegt sich nicht weiter
          this.isMoving = false;
        }
      }
    }
  }
  //Funktion fuer das automatische runterfallen
  this.gravity = function() {
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      //Das Objekt soll sinken, wenn es noch nicht ganz unten ist
      if (round(this.y) < graphics.bloeckeProSpalte - this.hoehe) {
        //Und wenn zusaetzlich kein Feld unter dem Objekt bereits besetzt ist
        if (graphics.gridArray[floor(this.y + this.hoehe)][this.x] == 0) {
          this.y += speed;
        }
        else {
          this.isMoving = false;
        }
      }
    }
    //Wenn der Stein quer liegt
    else {
      if (round(this.y) < graphics.bloeckeProSpalte - this.hoehe) {
        if (graphics.gridArray[round(this.y + this.hoehe)][this.x] == 0 && graphics.gridArray[round(this.y + this.hoehe)][this.x + 1] == 0 &&
        graphics.gridArray[round(this.y + this.hoehe)][this.x + 2] == 0 && graphics.gridArray[round(this.y + this.hoehe)][this.x + 3] == 0) {
          this.y += speed;
        }
        else {
          this.isMoving = false;
        }
      }
    }
  }
  //Funktion zum Bewegen nach rechts
  this.bewegungRechts = function() {
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      if (this.x <= graphics.bloeckeProZeile - this.breite - 1) {
        if (!(graphics.gridArray[round(this.y)][this.x + this.breite] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + this.breite] < 0) &&
        !(graphics.gridArray[round(this.y + 2)][this.x + this.breite] < 0) && !(graphics.gridArray[round(this.y + 3)][this.x + this.breite] < 0)) {
          this.x += 1;
        }
      }
    }
    //Wenn der Stein quer liegt
    else {
      if (this.x <= graphics.bloeckeProZeile - this.breite - 1) {
        if (!(graphics.gridArray[round(this.y)][this.x + this.breite] < 0)) {
          this.x += 1;
        }
      }
    }
  }
  //Funktion zum Bewegen nach links
  this.bewegungLinks = function() {
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      if (this.x > 0) {
        if (!(graphics.gridArray[round(this.y)][this.x - 1] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x - 1] < 0) &&
        !(graphics.gridArray[round(this.y + 2)][this.x - 1] < 0) && !(graphics.gridArray[round(this.y + 3)][this.x - 1] < 0)) {
          this.x -= 1;
        }
      }
    }
    //Wenn der Stein quer liegt
    else {
      if (this.x > 0) {
        if (!(graphics.gridArray[round(this.y)][this.x - 1] < 0)) {
          this.x -= 1;
        }
      }
    }
  }
  //Funktion zum Pruefen, ob ausreichend Platz ist, um das Objekt zu erzeugen
  this.createNewObjectIsPossible = function() {
    if (!(graphics.gridArray[round(this.y)][this.x] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x] < 0) &&
    !(graphics.gridArray[round(this.y + 2)][this.x] < 0) && !(graphics.gridArray[round(this.y + this.hoehe)][this.x] < 0)) {
      return true;
    }
    else {
      return false;
    }
  }
}
