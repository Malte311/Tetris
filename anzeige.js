function Anzeige() {
  //Button fuer eine Hilfsanzeige (zum Anzeigen der Steuerung)
  this.helpButton = createButton("Help");
  //Positionieren des Buttons
  this.helpButton.position(innerWidth / 2 - graphics.bloeckeProZeile * graphics.blockBreite / 2, graphics.bloeckeProSpalte * graphics.blockHoehe + 5);
  //Funktionalitaet des Buttons, wenn man ihn drueckt
  //this.helpButton.mousePressed(showHelpMenu());
  // var displayNext = createCanvas(800,600);
  // displayNext.position(canvas.x,0);
}
