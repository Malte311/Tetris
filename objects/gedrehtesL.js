//Konstruktor Funktion
function GedrehtesL() {
  //Position bestehend aus x Wert und y Wert
  this.x = graphics.bloeckeProZeile / 2 - 1;
  this.y = 0;
  this.farbCode = 4;
  this.platziert = -4;
  this.isMoving = true;
  this.senkrecht = true;
  this.senkrechtGedreht = false;
  this.quer = false;
  this.querGedreht = false;
  //Groesse eines Objektes in Bloecken gemessen
  this.hoehe =  3;
  this.breite = 2;
  //Funktion zum Anzeigen
  this.display = function() {
    if (this.senkrecht) {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      if (this.isMoving && this.y + this.hoehe < graphics.bloeckeProSpalte) {
        graphics.gridArray[round(this.y)][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 1][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 2][this.x] = this.farbCode;
        graphics.gridArray[round(this.y) + 2][this.x + 1] = this.farbCode;
      }
      //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
      else {
        graphics.gridArray[round(this.y)][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 1][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 2][this.x] = this.platziert;
        graphics.gridArray[round(this.y) + 2][this.x + 1] = this.platziert;
        this.isMoving = false;
      }
    }
    else if (this.senkrechtGedreht) {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      if (this.isMoving && this.y + this.hoehe < graphics.bloeckeProSpalte) {
        graphics.gridArray[floor(this.y)][this.x] = this.farbCode;
        graphics.gridArray[floor(this.y)][this.x + 1] = this.farbCode;
        graphics.gridArray[floor(this.y + 1)][this.x + 1] = this.farbCode;
        graphics.gridArray[floor(this.y + 2)][this.x + 1] = this.farbCode;
      }
      else {
        //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
        graphics.gridArray[floor(this.y)][this.x] = this.platziert;
        graphics.gridArray[floor(this.y)][this.x + 1] = this.platziert;
        graphics.gridArray[floor(this.y + 1)][this.x + 1] = this.platziert;
        graphics.gridArray[floor(this.y + 2)][this.x + 1] = this.platziert;
        this.isMoving = false;
      }
    }
    //Wenn der Stein quer liegt
    else if (this.quer) {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      if (this.isMoving && this.y + this.hoehe < graphics.bloeckeProSpalte) {
        graphics.gridArray[floor(this.y)][this.x] = this.farbCode;
        graphics.gridArray[floor(this.y + 1)][this.x] = this.farbCode;
        graphics.gridArray[floor(this.y)][this.x + 1] = this.farbCode;
        graphics.gridArray[floor(this.y)][this.x + 2] = this.farbCode;
      }
      else {
        //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
        graphics.gridArray[floor(this.y)][this.x] = this.platziert;
        graphics.gridArray[floor(this.y) + 1][this.x] = this.platziert;
        graphics.gridArray[floor(this.y)][this.x + 1] = this.platziert;
        graphics.gridArray[floor(this.y)][this.x + 2] = this.platziert;
        this.isMoving = false;
      }
    }
    else if (this.querGedreht) {
      //bewegt sich der Block noch, wird dies ausgefuehrt
      if (this.isMoving && this.y + this.hoehe < graphics.bloeckeProSpalte) {
        graphics.gridArray[floor(this.y)][this.x] = this.farbCode;
        graphics.gridArray[floor(this.y + 1)][this.x] = this.farbCode;
        graphics.gridArray[floor(this.y + 1)][this.x - 1] = this.farbCode;
        graphics.gridArray[floor(this.y + 1)][this.x - 2] = this.farbCode;
      }
      else {
        //bewegt sich der Block nicht mehr oder kommt ganz unten an wird dies ausgefuehrt
        graphics.gridArray[floor(this.y)][this.x] = this.platziert;
        graphics.gridArray[floor(this.y + 1)][this.x] = this.platziert;
        graphics.gridArray[floor(this.y + 1)][this.x - 1] = this.platziert;
        graphics.gridArray[floor(this.y + 1)][this.x - 2] = this.platziert;
        this.isMoving = false;
      }
    }
  }
  //Funktion zum Drehen
  this.drehen = function() {
    var tauschen = this.hoehe;
    //Wenn es senkrecht ist, wird es quer gedreht
    if (this.senkrecht) {
      if (!(graphics.gridArray[floor(this.y + 1)][this.x + 1] < 0) && !(graphics.gridArray[floor(this.y - 1)][this.x + 1] < 0) && !(graphics.gridArray[floor(this.y - 1)][this.x + 2] < 0)) {
        this.x = this.x - 1;
        this.y = this.y + 1;
        this.hoehe = this.breite;
        this.breite = tauschen;
        this.senkrecht = !this.senkrecht;
        this.quer = !this.quer;
      }
    }
    //Wenn es quer liegt, wird es senkrecht gedreht
    else if (this.quer) {
      if (this.y > 0 && this.y < graphics.bloeckeProSpalte){
        if (!(graphics.gridArray[floor(this.y - 1)][this.x] < 0) && !(graphics.gridArray[floor(this.y - 1)][this.x + 1] < 0) &&
        !(graphics.gridArray[floor(this.y + 1)][this.x + 1] < 0)) {
          this.y = this.y - 1;
          this.hoehe = this.breite;
          this.breite = tauschen;
          this.quer = !this.quer;
          this.senkrechtGedreht = !this.senkrechtGedreht;
        }
      }
    }
    else if (this.senkrechtGedreht) {
      if (!(graphics.gridArray[floor(this.y + 1)][this.x] < 0) && !(graphics.gridArray[floor(this.y)][this.x + 2] < 0) &&
      !(graphics.gridArray[floor(this.y + 1)][this.x + 2] < 0) && this.x + this.breite < graphics.bloeckeProZeile) {
        this.x = this.x + 2;
        this.hoehe = this.breite;
        this.breite = tauschen;
        this.senkrechtGedreht = !this.senkrechtGedreht;
        this.querGedreht = !this.querGedreht;
      }
    }
    else if (this.querGedreht) {
      if (!(graphics.gridArray[floor(this.y)][this.x - 1] < 0) && !(graphics.gridArray[floor(this.y + 2)][this.x] < 0) && !(graphics.gridArray[floor(this.y + 2)][this.x - 1] < 0)) {
        this.x = this.x - 1;
        this.hoehe = this.breite;
        this.breite = tauschen;
        this.querGedreht = !this.querGedreht;
        this.senkrecht = !this.senkrecht;
      }
    }
  }
  //Funktion zum schnellen Fallenlassen eines Objektes
  this.freierFall = function() {

  }
  //Funktion fuer das automatische runterfallen
  this.gravity = function() {
    //Wenn der Stein senkrecht ist
    if (this.senkrecht) {
      if (this.y < graphics.bloeckeProSpalte - this.hoehe) {
        if (graphics.gridArray[round(this.y + this.hoehe)][this.x] == 0 && graphics.gridArray[round(this.y + this.hoehe)][this.x + 1] == 0) {
          this.y += speed;
        }
        else {
          this.isMoving = false;
        }
      }
    }
    else if (this.senkrechtGedreht) {
      if (this.y < graphics.bloeckeProSpalte - this.hoehe) {
        if (graphics.gridArray[floor(this.y + 1)][this.x] == 0 && graphics.gridArray[floor(this.y + this.hoehe)][this.x + 1] == 0) {
          this.y += speed;
        }
        else {
          this.isMoving = false;
        }
      }
    }
    //Wenn der Stein quer liegt
    else if (this.quer) {
      if (this.y < graphics.bloeckeProSpalte - this.hoehe) {
        if (graphics.gridArray[floor(this.y + 2)][this.x] == 0 && graphics.gridArray[floor(this.y + 1)][this.x + 1] == 0 &&
        graphics.gridArray[floor(this.y + 1)][this.x + 2] == 0) {
          this.y += speed;
        }
        else {
          this.isMoving = false;
        }
      }
    }
    else if (this.querGedreht) {
      if (this.y < graphics.bloeckeProSpalte - this.hoehe) {
        if (graphics.gridArray[floor(this.y + 2)][this.x] == 0 && graphics.gridArray[floor(this.y + 1)][this.x - 1] == 0 &&
        graphics.gridArray[floor(this.y + 1)][this.x - 2] == 0) {
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
      if (this.x + 1 <= graphics.bloeckeProZeile - this.breite) {
        if (!(graphics.gridArray[round(this.y)][this.x + 1] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + 1] < 0) && !(graphics.gridArray[round(this.y + 2)][this.x + 2] < 0)) {
          this.x += 1;
        }
      }
    }
    else if (this.senkrechtGedreht) {
      if (this.x < graphics.bloeckeProZeile - this.breite) {
        if (!(graphics.gridArray[round(this.y)][this.x + 2] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + 2] < 0) && !(graphics.gridArray[round(this.y + 2)][this.x + 2] < 0)) {
          this.x += 1;
        }
      }
    }
    //Wenn der Stein quer liegt
    else if (this.quer) {
      if (this.x < graphics.bloeckeProZeile - this.breite) {
        if (!(graphics.gridArray[round(this.y + 1)][this.x + 1] < 0) && !(graphics.gridArray[round(this.y)][this.x + 3] < 0)) {
          this.x += 1;
        }
      }
    }
    else if (this.querGedreht) {
      if (this.x < graphics.bloeckeProZeile - this.breite) {
        if (!(graphics.gridArray[round(this.y)][this.x + 1] < 0) && !(graphics.gridArray[round(this.y + 1)][this.x + 1] < 0)) {
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
        !(graphics.gridArray[round(this.y + 2)][this.x - 1] < 0)) {
          this.x -= 1;
        }
      }
    }
    else if (this.senkrechtGedreht) {
      if (this.x > 1) {
        if (!(graphics.gridArray[floor(this.y)][this.x - 1] < 0) && !(graphics.gridArray[floor(this.y + 1)][this.x] < 0) && !(graphics.gridArray[floor(this.y + 2)][this.x] < 0)) {
          this.x -= 1;
        }
      }
    }
    //Wenn der Stein quer liegt
    else if (this.quer) {
      if (this.x > 1) {
        if (!(graphics.gridArray[floor(this.y)][this.x - 1] < 0) && !(graphics.gridArray[floor(this.y + 1)][this.x - 1] < 0)) {
          this.x -= 1;
        }
      }
    }
    else if (this.querGedreht) {
      if (this.x > 1) {
        if (!(graphics.gridArray[floor(this.y)][this.x - 1] < 0) && !(graphics.gridArray[floor(this.y + 1)][this.x - 3] < 0)) {
          this.x -= 1;
        }
      }
    }
  }
  //Funktion zum Pruefen, ob ausreichend Platz ist, um das Objekt zu erzeugen
  this.createNewObjectIsPossible = function() {
    return true;
  }
}
