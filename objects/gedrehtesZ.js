//Konstruktor Funktion
function GedrehtesZ() {
  //Position bestehend aus x Wert und y Wert
  //Anfangsposition ist in der Mitte
  this.x = graphics.bloeckeProZeile / 2 - 1;
  //und ganz oben
  this.y = 0;
  //farbCode dieses Blockobjektes wenn es sich bewegt
  this.farbCode = 5;
  //farbCode dieses Blockobjektes wenn es sich nicht bewegt
  this.platziert = -5;
  //zu Anfang soll es sich bewegen
  this.isMoving = true;
  //und es soll senkrecht starten
  this.senkrecht = true;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  3;
  this.breite = 2;
  //Variablen fuer eine letzte Bewegung
  this.lastMove = true;
  this.yCounter = 0;
  //Funktion zum Anzeigen
  this.display = function() {
    //Wenn das Objekt senkrecht ist
    if (this.senkrecht) {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      if (this.isMoving && round(this.y) + this.hoehe < graphics.bloeckeProSpalte) {
        //Darstellung durch 4 zusammengefuegte kleine Rechtecke
        graphics.gridArray[round(this.y)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 1][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 1][this.x + 1] = this.farbCode;
        graphics.gridArray[round(this.y) + 2][this.x + 1] = this.farbCode;
        this.lastMove = true;
      }
      else if (this.lastMove) {
        //Darstellung durch 4 zusammengefuegte kleine Rechtecke
        graphics.gridArray[round(this.y)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 1][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 1][this.x + 1] = this.farbCode;
        graphics.gridArray[round(this.y) + 2][this.x + 1] = this.farbCode;
        //Und das Objekt bewegt sich dann nicht weiter
        this.isMoving = true;
      }
      //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
      else {
        //Darstellung durch 4 zusammengefuegte kleine Rechtecke
        graphics.gridArray[round(this.y)][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 1][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 1][this.x + 1] = this.platziert;
        graphics.gridArray[round(this.y) + 2][this.x + 1] = this.platziert;
        //Und das Objekt bewegt sich dann nicht weiter
        this.isMoving = false;
      }
    }
    //Wenn der Stein quer liegt
    else {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      if (this.isMoving && round(this.y) + this.hoehe < graphics.bloeckeProSpalte) {
        //Darstellung durch 4 zusammengefuegte kleine Rechtecke
        graphics.gridArray[round(this.y)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y)][this.x + 1] = this.farbCode;
        graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y + 1)][this.x - 1] = this.farbCode;
        this.lastMove = true;
      }
      else if (this.lastMove) {
        //Darstellung durch 4 zusammengefuegte kleine Rechtecke
        graphics.gridArray[round(this.y)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y)][this.x + 1] = this.farbCode;
        graphics.gridArray[round(this.y + 1)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y + 1)][this.x - 1] = this.farbCode;
        //Und das Objekt bewegt sich dann nicht weiter
        this.isMoving = true;
      }
      //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
      else {
        //Darstellung durch 4 zusammengefuegte kleine Rechtecke
        graphics.gridArray[round(this.y)][this.x] = this.platziert;
        graphics.gridArray[round(this.y)][this.x + 1] = this.platziert;
        graphics.gridArray[round(this.y + 1)][this.x] = this.platziert;
        graphics.gridArray[round(this.y + 1)][this.x - 1] = this.platziert;
        //Und das Objekt soll sich nicht weiter bewegen
        this.isMoving = false;
      }
    }
  }
  //Funktion zum Drehen
  this.drehen = function() {
    //Variable zur Hilfe, damit Hoehe und Breite vertauscht werden koennen
    var tauschen = this.hoehe;
    //Wenn es senkrecht ist, wird es quer gedreht
    if (this.senkrecht) {
      //Sicherstellen, dass das Array nicht verlassen wird
      if (this.x > 0) {
        //Dazu wird erst vorausgesetzt, dass Platz zum Drehen ist
        if (graphics.gridArray[round(this.y + 2)][this.x] == 0 && graphics.gridArray[round(this.y + 2)][this.x - 1] == 0) {
          //Wenn ausreichend Platz ist, dann wird gedreht, dazu wird Position angepasst
          this.y = this.y + 1;
          //Hoehe und Breite werden vertauscht
          this.hoehe = this.breite;
          this.breite = tauschen;
          //Und das Objekt ist nun nicht mehr senkrecht
          this.senkrecht = !this.senkrecht;
        }
      }
    }
    //Wenn es quer liegt wird es senkrecht gedreht
    else {
      //Erst sicherstellen, dass das Array nicht verlassen wird
      if (round(this.y) > 0) {
        //Wieder wird erst mal geprueft, ob ausreichend Platz vorhanden ist
        if (graphics.gridArray[round(this.y - 1)][this.x] == 0 && graphics.gridArray[round(this.y + 1)][this.x + 1] == 0) {
          //Wenn Platz ist, wird die Position angepasst
          this.y = this.y - 1;
          //Hoehe und Breite werden vertauscht
          this.hoehe = this.breite;
          this.breite = tauschen;
          //Und das Objekt ist nun wieder senkrecht
          this.senkrecht = !this.senkrecht;
        }
      }
    }
  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {
    //Ausgehend vom aktuellen y Wert (abgerundet mit floor) unter dem Stein werden alle Felder dieser Spalte durchlaufen
    for (var i = floor(this.y); i < graphics.bloeckeProSpalte; i++) {
      //wenn der Stein senkrecht steht
      if (this.senkrecht) {
        //Wenn es ein Hindernis gibt, dann fuehre dies aus
         if (graphics.gridArray[i][this.x + 1] < 0) {
           //Gibt es ein Hindernis, so wird der Stein genau darauf platziert
          this.y = i - this.hoehe;
          //bewegt sich nicht weiter
          this.isMoving = false;
          //und die Schleife bricht ab
          break;
        }
        //Sollte oben kein Hindernis festgestellt worden sein, wird hier noch mal auf ein Hindernis an der zweiten x Koordinate geprueft
        //Dazu muss der Stein aber bereits mindestens ein Feld vom oberen Rand entfernt sein, da sonst das Array verlassen werden koennte
        else if (i > 0) {
          //Auch hier wird wieder geschaut, ob es irgendwo ein Hindernis gibt
          if (graphics.gridArray[i - 1][this.x] < 0) {
            //Wenn ja, wird der Stein wieder genau darauf platziert
            this.y = i - this.hoehe;
            //Der Stein bewegt sich nicht weiter
            this.isMoving = false;
            //Und die Schleife kann abgebrochen werden
            break;
          }
          //Sollte nirgendwo ein Hindernis sein, dann
          else {
            //dann kann der Stein nach ganz unten fallen und dort platziert werden
            this.y = graphics.bloeckeProSpalte - this.hoehe;
            //und bewegt sich auch dann nicht mehr weiter
            this.isMoving = false;
          }
        }
      }
      //Wenn der Stein quer liegt
      else {
        //Wieder erst mal pruefen, ob es ein Hindernis gibt
        if (graphics.gridArray[i][this.x] < 0 || graphics.gridArray[i][this.x - 1] < 0) {
          //Wenn ja dann wird der Stein direkt darauf platziert
          this.y = i - this.hoehe;
          //bewegt sich nicht weiter
          this.isMoving = false;
          //und die Schleife wird abgebrochen
          break;
        }
        //Wenn dort kein Hindernis war, muss noch an der dritten moeglichen Stelle geprueft werden
        //Dazu erst mal sichergehen, dass das Array nicht verlassen werden kann
        else if (i > 0) {
          //Dann wieder auf Hindernisse pruefen
          if (graphics.gridArray[i - 1][this.x + 1] < 0) {
            //Wenn es eins gibt, soll der Stein darauf abgelegt werden
            this.y = i - this.hoehe;
            //Der Stein hoert auf, sich zu bewegen
            this.isMoving = false;
            //Und die Schleife muss nicht weiter durchlaufen
            break;
          }
          //Wird nirgendwo ein Hindernis gefunden, dann tue das
          else {
            //Platziere das Objekt ganz unten
            this.y = graphics.bloeckeProSpalte - this.hoehe;
            //Und das Objekt stoppt die Bewegung
            this.isMoving = false;
          }
        }
      }
    }
    this.lastMove = false;
  }
  //Funktion fuer das automatische runterfallen
  this.gravity = function() {
    this.yCounter += speed;
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      //Ist der Stein noch nicht unten angekommen, tue dies
      if (round(this.y) < graphics.bloeckeProSpalte - this.hoehe) {
        //Pruefe ob unter dem Objekt alle Felder frei sind, damit es weiter fallen kann
        if (graphics.gridArray[round(this.y + 2)][this.x] == 0 && graphics.gridArray[round(this.y + this.hoehe)][this.x + 1] == 0) {
          //Wenn dem so ist, dann lasse das Objekt weiter fallen
          this.y += speed;
        }
        //Ist der Stein bereits unten angekommen, tue dies
        else {
          //Das Objekt bewegt sich nicht weiter
          this.isMoving = false;
        }
      }
    }
    //Wenn der Stein quer liegt
    else {
      //Ist der Stein noch nicht unten angekommen, tue dies
      if (round(this.y) < graphics.bloeckeProSpalte - this.hoehe) {
        //Ueberpruefe, ob unten dem Objekt alle Felder frei sind, damit es fallen kann
        if (graphics.gridArray[round(this.y + this.hoehe)][this.x - 1] == 0 && graphics.gridArray[round(this.y + this.hoehe)][this.x] == 0 &&
        graphics.gridArray[round(this.y + 1)][this.x + 1] == 0) {
          //Wenn alle Felder frei sind, lasse das Objekt weiter fallen
          this.y += speed;
        }
        //Ist der Stein bereits unten angekommen, tue dies
        else {
          //Das Objekt bewegt sich nun nicht mehr
          this.isMoving = false;
        }
      }
    }
    if (round(this.yCounter) >= round(this.y + 1)) {
      this.lastMove = false;
    }
  }
  //Funktion zum Bewegen nach rechts
  this.bewegungRechts = function() {
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      //Sicherstellen, dass der Stein das Spielfeld nicht verlassen kann
      if (this.x < graphics.bloeckeProZeile - this.breite) {
        //Dann pruefen, ob ein Hindernis im Weg ist
        if (!(graphics.gridArray[round(this.y + 1)][this.x + this.breite] < 0) && !(graphics.gridArray[round(this.y + 2)][this.x + this.breite] < 0) && !(graphics.gridArray[round(this.y)][this.x + 1] < 0)) {
          //bei freier Bahn kann nach rechts bewegt werden
          this.x += 1;
        }
      }
    }
    //Wenn der Stein quer liegt
    else {
      //Sicherstellen, dass der Stein das Spielfeld nicht verlassen kann
      if (this.x <= graphics.bloeckeProZeile - this.breite) {
        //Dann pruefen, ob ein Hindernis im Weg ist
        if (!(graphics.gridArray[round(this.y)][this.x + 2] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + 1] < 0)) {
          //wenn kein Hindernis vorhanden ist, kann nach rechts bewegt werden
          this.x += 1;
        }
      }
    }
    if (round(this.yCounter) >= round(this.y + 1)) {
      this.lastMove = false;
    }
  }
  //Funktion zum Bewegen nach links
  this.bewegungLinks = function() {
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      //Erst sicherstellen, dass das Array nicht verlassen wird
      if (this.x > 0) {
        //Dann pruefen, ob Platz zum bewegen ist, oder ob etwas den Weg blockiert
        if (!(graphics.gridArray[round(this.y)][this.x - 1] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x - 1] < 0) &&
        !(graphics.gridArray[round(this.y + 2)][this.x] < 0)) {
          //Wenn nicht, kann bewegt werden
          this.x -= 1;
        }
      }
    }
    //Wenn der Stein quer liegt
    else {
      //Erst sicherstellen, dass das Array nicht verlassen wird
      if (this.x > 1) {
        //Dann pruefen, ob Platz zum bewegen ist, oder ob etwas den Weg blockiert
        if (!(graphics.gridArray[round(this.y + 1)][this.x - 2] < 0) && !(graphics.gridArray[round(this.y)][this.x - 1] < 0)) {
          //Wenn nicht, kann bewegt werden
          this.x -= 1;
        }
      }
    }
  }
  //Funktion zum Pruefen, ob ausreichend Platz ist, um das Objekt zu erzeugen
  this.createNewObjectIsPossible = function() {
    //Dafuer wird getestet, ob die Felder, auf denen ein neues Objekt erzeugt werden wuerde, alle frei sind
    if (!(graphics.gridArray[round(this.y)][this.x] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x] < 0) &&
    !(graphics.gridArray[round(this.y + 1)][this.x + 1] < 0) && !(graphics.gridArray[round(this.y + 2)][this.x + 1] < 0)) {
      //Wenn alle frei sind, kann ei Objekt erzeugt werden und es wird true zurueckgegeben
      return true;
    }
    //Sollten nicht alle Felder frei sein, wird dies ausgefuehrt
    else {
      //Es wird false zurueckgegeben, das bedeutet, es ist nicht ausreichend Platz, um ein Objekt zu erzeugen
      return false;
    }
  }
}
