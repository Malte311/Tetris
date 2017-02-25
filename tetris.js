/**
 * @author Malte Luttermann
 */

//Variable zum Testen ob das Spiel laeuft oder pausiert ist
var running = false;
//Steuerungsvariable
var controller;

var blockObjekt;

function setup() {
  graphics = new GUI();
  graphics.fillArray();
  createCanvas(graphics.blockBreite * graphics.bloeckeProZeile, graphics.blockHoehe * graphics.bloeckeProSpalte);
  blockObjekt = new Square();
  background(0);
  graphics.grid();
}

function draw() {
  controller = new Steuerung(blockObjekt);
  controller.reiheVoll();
  //graphics.anzeige();
  blockObjekt.display();
  graphics.drawObjects();
  if(running){
    controller.gravity();
  }

}

function keyPressed() {
  controller.steuerungLR();
}

//Funktion, die ein zufaelliges neues Objekt erstellt
function newRandomObject() {

}
