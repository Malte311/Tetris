/**
 * @author Malte Luttermann
 */

//Variablen fuer die Anzeige, benoetigt fuer Zugriff auf HTML Canvas
var c;
var ctx;
//Variable fuer Zugriffe auf das Canvas
var canvas;
//Variable zum Testen ob das Spiel laeuft oder pausiert ist
var running = false;
//Default Speed, zum zuruecksetzen der Spielgeschwindigkeit
var defaultSpeed = 0.03;
//Variable, zur Bestimmung der Spielgeschwindigkeit
var speed = 0.03;
//Steuerungsvariable
var controller;
//Variable fuer das Blockobjekt
var blockObjekt;
//Variale fuer das naechste Blockobjekt
var naechstesObjekt;
//Variable, die zufaellig Zahlen zwischen 0 und 6 generieren soll, damit Objekte zufaellig erzeugt werden koennen
var randomNumber = 0;
//Variable, die angibt, ob das Spiel vorbei ist
var gameOver = false;
//Variable fuer das Zeichnen
var linearGradient;

//Setup Funktion, wird ein mal zu Beginn ausgefuehrt
function setup() {
  //Anzeige von Text im HTML Canvas
  c = document.getElementById("anzeige");
  ctx = c.getContext("2d");
  //Erzeugen eines Objektes GUI, welches fuer visuelle Dinge zustaendig ist (Grafik)
  graphics = new GUI();
  //Zu Anfang wird ein mal das Array, welches das Spielfeld speichert, initialisiert
  graphics.fillArray();
  //Erzeugen eines Canvas Objektes (Spielfeld)
  canvas = createCanvas(graphics.blockBreite * graphics.bloeckeProZeile, graphics.blockHoehe * graphics.bloeckeProSpalte);
  //Den Canvas in einen Div packen
  canvas.parent('canvasDiv');
  canvas.id("canvasID");
  //Die Anzeige hinzufuegen
  graphics.textStyle();
  graphics.drawAnzeigeNurBeiSetup();
  //Zu Anfang wird randomNumber ein zufaelliger Wert zwischen 0 und 6 zugewiesen, um das erste Objekt per Zufall zu bestimmen
  randomNumber = floor(random(0, 7));
  //Neues Blockobjekt erzeugen
  createNewObject();
  //Steuerung hinzufuegen
  controller = new Steuerung(blockObjekt);
}
//Draw Funktion, wird immer wieder wiederholt
function draw() {
  if (!gameOver) {
    //erweitere Steuerung ausfuehren
    blockObjekt.movementPossible();
    controller.erweiterteSteuerung();
    //Anzeigen (Zeichnen) des Blockobjektes
    blockObjekt.display();
    //Hintergrund soll schwarz sein
    background(0);
    //Sobald ein Block unten angekommt (anhaelt), wird ein neuer erstellt
    if (!blockObjekt.isMoving && !blockObjekt.lastMove) {
      //Es soll geprueft werden, ob eine Reihe voll ist, wenn ja wird sie entfernt
      controller.reiheVoll();
      //Neues Blockobjekt erzeugen
      createNewObject();
      //Die Steuerung wird jedes Mal neu erzeugt, da sich das zu steuernde Element aendert
      controller = new Steuerung(blockObjekt);
    }
    //Zeichnen des Grids
    graphics.grid();
    //Wenn eben festgestellt wurde, dass Game Over ist, dann nicht mehr die Objekte zeichnen, da die Schrift sonst nicht lesbar ist
    if (!gameOver) {
      //Zeichnen der Objekte bzw. Bloecke auf dem Spielfeld
      graphics.drawObjects();
    }
    //Neuzeichnen des Spielfeldes bewirkt, dass der Stein nur dort gezeichnet wird, wo er aktuell ist
    graphics.repaintField();
    //Wenn das Spiel nicht angehalten ist, soll das Blockobjekt automatisch runter fallen (langsam)
    if (running) {
      //Automatisches Runterfallen des Blockobjektes (Gravity)
      controller.gravity();
    }
    else {
      graphics.drawAnzeige();
    }
  }
}
//Funktion fuer Tastatureingaben, wird eine Taste gedrueckt, so wird die Steuerung ausgefuehrt
function keyPressed() {
  //Steuerung in extra Datei ausgelagert (steuerung.js)
  controller.steuerungLR();
}
//Funktion zum Erzeugen von neuen Objekten (Objektart per Zufall ausgewaehlt)
function createNewObject() {
  //Aufruf der Methode zur Bestimmung, welches Objekt als naechstes kommt
  nextObject();
  //Bedingung pruefen, ob Platz ist, um ein neues Objekt zu erzeugen
  if (naechstesObjekt.createNewObjectIsPossible()) {
    //Das Objekt soll auf das naechste Objekt gesetzt werden.
    blockObjekt = naechstesObjekt;
  }
  //Sollte kein Platz sein, um ein neues Objekt zu erzeugen, hat der Spieler verloren
  else {
    //Das Spiel laeuft nicht weiter
    running = false;
    //Das GameOver Menue wird angezeigt
    graphics.gameOver();
  }
}
//Funktion zum bestimmen, welches Objekt als naechstes kommt
function nextObject() {
  //Mit der Zufallszahl bestimmen, welches Objekt erzeugt werden soll
  switch (randomNumber) {
    //Ist die Zahl 0, wird ein Square Objekt erzeugt
    case 0:
      naechstesObjekt = new Square();
      break;
    //Ist die Zahl 1, wird ein NormalesI Objekt erzeugt
    case 1:
      naechstesObjekt = new NormalesI();
      break;
    //Ist die Zahl 2, wird ein GedrehtesZ Objekt erzeugt
    case 2:
      naechstesObjekt = new GedrehtesZ();
      break;
    //Ist die Zahl 3, wird ein GedrehtesL Objekt erzeugt
    case 3:
      naechstesObjekt = new GedrehtesL();
      break;
    //Ist die Zahl 4, wird ein NormalesL Objekt erzeugt
    case 4:
      naechstesObjekt = new NormalesL();
      break;
    //Ist die Zahl 5, wird ein NormalesT Objekt erzeugt
    case 5:
      naechstesObjekt = new NormalesT();
      break;
    //Ist die Zahl 6, wird ein NormalesZ Objekt erzeugt
    case 6:
      naechstesObjekt = new NormalesZ();
      break;
  }
  //Eine Zufallszahl zwischen 0 und 6 generieren, fuer die Anzeige, welches Objekt als naechstes kommt
  randomNumber = floor(random(0, 7));
  //wenn ein neues Objekt erzeugt werden kann, gibt es eine Anzeige dafuer
  if (naechstesObjekt.createNewObjectIsPossible()) {
    //Konsolenausgabe
    //console.log("Naechstes Objekt ist " + randomNumber);
    //Fuer jedes Objekt seine eigene Anzeige
    ctx.lineWidth = 2;
    switch (randomNumber) {
      //Zahl 0 ist Square in gelb
      case 0:
        ctx.fillStyle = "#aaa";
        ctx.fillRect(25, 19, 60, 101);
        ctx.fillStyle = "#FFFF00";
        ctx.strokeStyle = "black";
        ctx.strokeRect(30, 22, 19, 19);
        ctx.fillRect(30, 22, 18, 18);
        ctx.strokeRect(50, 22, 19, 19);
        ctx.fillRect(50, 22, 18, 18);
        ctx.strokeRect(30, 42, 19, 19);
        ctx.fillRect(30, 42, 18, 18);
        ctx.strokeRect(50, 42, 19, 19);
        ctx.fillRect(50, 42, 18, 18);
        ctx.stroke();
        break;
        //Zahl 1 ist NormalesI in tuerkis
      case 1:
        ctx.fillStyle = "#aaa";
        ctx.fillRect(25, 19, 60, 101);
        ctx.fillStyle = "#00FFFF";
        ctx.strokeStyle = "black";
        ctx.strokeRect(30, 22, 19, 19);
        ctx.fillRect(30, 22, 18, 18);
        ctx.strokeRect(30, 42, 19, 19);
        ctx.fillRect(30, 42, 18, 18);
        ctx.strokeRect(30, 62, 19, 19);
        ctx.fillRect(30, 62, 18, 18);
        ctx.strokeRect(30, 82, 19, 19);
        ctx.fillRect(30, 82, 18, 18);
        ctx.stroke();
        break;
      //Ist die Zahl 2, wird ein GedrehtesZ in gruen angezeigt
      case 2:
        ctx.fillStyle = "#aaa";
        ctx.fillRect(25, 19, 60, 101);
        ctx.fillStyle = "#00FF00";
        ctx.strokeStyle = "black";
        ctx.strokeRect(30, 22, 19, 19);
        ctx.fillRect(30, 22, 18, 18);
        ctx.strokeRect(30, 42, 19, 19);
        ctx.fillRect(30, 42, 18, 18);
        ctx.strokeRect(50, 42, 19, 19);
        ctx.fillRect(50, 42, 18, 18);
        ctx.strokeRect(50, 62, 19, 19);
        ctx.fillRect(50, 62, 18, 18);
        ctx.stroke();
        break;
      //Ist die Zahl 3, wird ein GedrehtesL in blau angezeigt
      case 3:
        ctx.fillStyle = "#aaa";
        ctx.fillRect(25, 19, 60, 101);
        ctx.fillStyle = "#0000FF";
        ctx.strokeStyle = "black";
        ctx.strokeRect(50, 22, 19, 19);
        ctx.fillRect(50, 22, 18, 18);
        ctx.strokeRect(50, 42, 19, 19);
        ctx.fillRect(50, 42, 18, 18);
        ctx.strokeRect(50, 62, 19, 19);
        ctx.fillRect(50, 62, 18, 18);
        ctx.strokeRect(30, 62, 19, 19);
        ctx.fillRect(30, 62, 18, 18);
        ctx.stroke();
        break;
      //Ist die Zahl 4, wird ein NormalesL in orange angezeigt
      case 4:
        ctx.fillStyle = "#aaa";
        ctx.fillRect(25, 19, 60, 101);
        ctx.fillStyle = "#FF8000";
        ctx.strokeStyle = "black";
        ctx.strokeRect(30, 22, 19, 19);
        ctx.fillRect(30, 22, 18, 18);
        ctx.strokeRect(30, 42, 19, 19);
        ctx.fillRect(30, 42, 18, 18);
        ctx.strokeRect(30, 62, 19, 19);
        ctx.fillRect(30, 62, 18, 18);
        ctx.strokeRect(50, 62, 19, 19);
        ctx.fillRect(50, 62, 18, 18);
        ctx.stroke();
        break;
      //Ist die Zahl 5, wird ein NormalesT in lila angezeigt
      case 5:
        ctx.fillStyle = "#aaa";
        ctx.fillRect(25, 19, 60, 101);
        ctx.fillStyle = "#FF00FF";
        ctx.strokeStyle = "black";
        ctx.strokeRect(50, 22, 19, 19);
        ctx.fillRect(50, 22, 18, 18);
        ctx.strokeRect(50, 42, 19, 19);
        ctx.fillRect(50, 42, 18, 18);
        ctx.strokeRect(50, 62, 19, 19);
        ctx.fillRect(50, 62, 18, 18);
        ctx.strokeRect(30, 42, 19, 19);
        ctx.fillRect(30, 42, 18, 18);
        ctx.stroke();
        break;
      //Ist die Zahl 6, wird ein NormalesZ in rot angezeigt
      case 6:
        ctx.fillStyle = "#aaa";
        ctx.fillRect(25, 19, 60, 101);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "black";
        ctx.strokeRect(50, 22, 19, 19);
        ctx.fillRect(50, 22, 18, 18);
        ctx.strokeRect(50, 42, 19, 19);
        ctx.fillRect(50, 42, 18, 18);
        ctx.strokeRect(30, 42, 19, 19);
        ctx.fillRect(30, 42, 18, 18);
        ctx.strokeRect(30, 62, 19, 19);
        ctx.fillRect(30, 62, 18, 18);
        ctx.stroke();
        break;
    }
  }
}
