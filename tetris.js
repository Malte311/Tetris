/**
 * @author Malte Luttermann
 */

//Variable zum Testen ob das Spiel laeuft oder pausiert ist
var running = false;
//Steuerungsvariable
var controller;
//Variable fuer das Blockobjekt
var blockObjekt;
//Setup Funktion, wird ein mal zu Beginn ausgefuehrt
function setup() {
  graphics = new GUI();
  graphics.fillArray();
  createCanvas(graphics.blockBreite * graphics.bloeckeProZeile, graphics.blockHoehe * graphics.bloeckeProSpalte);
  createNewObject();
}
//Draw Funktion, wird immer wieder wiederholt
function draw() {
  blockObjekt.display();
  //Sobald ein Block unten angekommt (anhaelt), wird ein neuer erstellt
  if (!blockObjekt.isMoving) {
    createNewObject();
  }
  //Die Steuerung wird jedes Mal neu erzeugt, da sich das zu steuernde Element aendern kann
  controller = new Steuerung(blockObjekt);
  background(0);
  graphics.grid();
  graphics.drawObjects();
  graphics.repaintField();
  if (running) {
    controller.gravity();
  }
  controller.reiheVoll();
}
//Funktion fuer Tastatureingaben, wird eine Taste gedrueckt, so wird die Steuerung ausgefuehrt
function keyPressed() {
  controller.steuerungLR();
}
//Funktion zum Erzeugen von neuen Objekten (Objektart per Zufall ausgewaehlt)
function createNewObject() {
  //Bedingung pruefen, ob Platz ist, um ein neues Objekt zu erzeugen
  if (!(graphics.gridArray[0][graphics.bloeckeProZeile / 2 - 1] < 0) && !(graphics.gridArray[0][graphics.bloeckeProZeile / 2] < 0) &&
  !(graphics.gridArray[1][graphics.bloeckeProZeile / 2 - 1] < 0) && !(graphics.gridArray[1][graphics.bloeckeProZeile / 2] < 0)) {
    //Randomzahl erzeugen (0 inklusive, 7 exklusive), die immer abgerundet wird
    var randomNumber = floor(random(0,7));
    //Per Zufall bestimmen, welcher Block als naechstes kommt
    // switch (randomNumber) {
    //   case 0:
    //     blockObjekt = new Square();
    //     break;
    //   case 1:
    //     blockObjekt = new GedrehtesL();
    //     break;
    //   case 2:
    //     blockObjekt = new GedrehtesZ();
    //     break;
    //   case 3:
    //     blockObjekt = new NormalesI();
    //     break;
    //   case 4:
    //     blockObjekt = new NormalesL();
    //     break;
    //   case 5:
    //     blockObjekt = new NormalesT();
    //     break;
    //   case 6:
    //     blockObjekt = new NormalesZ();
    //     break;
    // }
    blockObjekt = new Square();
  }
  else {
    running = false;
    graphics.gameOver();
  }
}
