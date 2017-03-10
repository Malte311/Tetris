/**
 * @author Malte Luttermann
 */

//Variablen fuer die Anzeige, benoetigt fuer Zugriff auf HTML-Canvas (Canvas zur Anzeige)
var c;
var ctx;
//Variable fuer Zugriffe auf das Canvas (Canvas, welches das Spielfeld bildet)
var canvas;
//Variable zum Testen ob das Spiel laeuft oder pausiert ist
var running = false;
//Default Speed, zum Zuruecksetzen der Spielgeschwindigkeit
var defaultSpeed = 0.03;
//Variable zur Bestimmung der Spielgeschwindigkeit
var speed = 0.03;
//Steuerungsvariable, erzeugt in setup ein neues Objekt von steuerung.js
var controller;
//Variable fuer das Blockobjekt
var blockObjekt;
//Variable fuer das naechste Blockobjekt
var naechstesObjekt;
//Variable, die zufaellig Zahlen zwischen 0 und 6 generieren soll, damit Objekte zufaellig erzeugt werden koennen
var randomNumber = 0;
//Variable, die angibt, ob das Spiel vorbei ist
var gameOver = false;
//Variable fuer das Zeichnen in regenbogenfarbiger Schrift
var linearGradient;
//Variable fuer dynamischen Button
var playPauseButton;
//Variable fuer das aktuelle Level (beginnt bei 1)
var level = 1;
//Variable, die angibt, ob ein Dialog geoeffnet ist
var dialogOffen = false;

//Setup Funktion, wird ein mal zu Beginn ausgefuehrt
function setup() {
  //Anzeige von Text im HTML-Canvas, dafuer muss man auf den Canvas zugreifen koennen
  c = document.getElementById('anzeige');
  ctx = c.getContext('2d');
  //Zugriff auf den Button, der seinen Inhalt aendern soll (Zeigt Play an, wenn pausiert ist und pause, wenn das Spiel laeuft)
  playPauseButton = document.getElementById('playbutton');
  //Erzeugen eines Objektes GUI, welches fuer visuelle Dinge zustaendig ist (Grafik)
  graphics = new GUI();
  //Zu Anfang wird ein Mal das Array, welches das Spielfeld speichert, initialisiert (ueberall der Wert 0 gespeichert, damit nirgens null steht)
  graphics.fillArray();
  //Erzeugen eines Canvas Objektes (Spielfeld)
  canvas = createCanvas(graphics.blockBreite * graphics.bloeckeProZeile, graphics.blockHoehe * graphics.bloeckeProSpalte);
  //Den Canvas in einen Div packen
  canvas.parent('canvasDiv');
  //Dem Canvas eine ID zuweisen
  canvas.id('canvasID');
  //Die Anzeige hinzufuegen
  graphics.textStyle();
  //Die Anzeige wird gezeichnet
  graphics.drawAnzeigeNurBeiSetup();
  //Pruefen, ob der Browser local storage unterstuetzt
  if (typeof(Storage) !== "undefined") {
    //Wenn ja, dann zeige die Scores an
    addScore();
    showScores(bubbleSort(HolEintraege()));
  }
  //Wenn nicht, dann alert
  else {
    // Sorry! No Web Storage support..
    var p = createP("Your browser doesn't support the local storage of your score.");
    p.parent('localscores');
  }
  //Zu Anfang wird randomNumber ein zufaelliger Wert zwischen 0 und 6 zugewiesen, um das erste Objekt per Zufall zu bestimmen
  randomNumber = floor(random(0, 7));
  //Neues Blockobjekt erzeugen
  createNewObject();
  //Steuerung hinzufuegen
  controller = new Steuerung(blockObjekt);
}
//Draw Funktion, wird immer wieder wiederholt
function draw() {
  //Nur ausfuehren, wenn das Spiel nicht vorbei ist
  if (!gameOver) {
    //erweitere Steuerung ausfuehren (Tasten gedrueckt halten zum Bewegen)
    //Dafuer erst pruefen, ob das Objekt bewegt werden kann
    blockObjekt.movementPossible();
    controller.erweiterteSteuerung();
    //Anzeigen (Zeichnen) des Blockobjektes
    blockObjekt.display();
    //Hintergrund vom Spielfeld soll schwarz sein
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
    //Die Schrift hat teilweise die gleichen Farben wie die Objekte und waere dann nicht zu sehen
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
      //Zudem wird auf dem Button das Pause Symbol angezeigt
      playPauseButton.innerHTML = '&#10074;&#10074;';
    }
    //Ist das Spiel pausiert
    else {
      //Die Anzeige wird aktualisiert (Schriftzug, der anzeigt, dass pausiert ist)
      graphics.drawAnzeige();
      //Es wird das Play Symbol auf dem Button angezeigt
      playPauseButton.innerHTML = '&#9658;';
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
