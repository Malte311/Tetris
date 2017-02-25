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
}

function draw() {
  controller = new Steuerung(blockObjekt);
  blockObjekt.display();
  background(0);
  graphics.grid();
  graphics.drawObjects();
  graphics.fillArray();
  if(running){
    controller.gravity();
  }
  //controller.reiheVoll(); scheint vorne und hinten nicht zu funktionieren
}

function keyPressed() {
  controller.steuerungLR();
}
