//Array, worin Scores gespeichert werden
var highscores;
//Variable, die angibt, wie viele Scores angezeigt werden sollen
var anzahlScores = 10;
//Funktion, damit Scores auf der Seite angezeigt werden
//Bekommt als Parameter das Array, das die Scores enthaelt
function showScores(array) {
  //Alte Eintraege entfernen
  document.getElementById('localscores').innerHTML = '<b>Local:</b>';
  //Platzierung startet bei 1
  var platz = 1;
  //Da Array aufsteigend sortiert ist, durchlaufen wir rueckwaerts
  for (var i = array.length - 1; i >= 0; i--) {
    //Platzierung in String umwandeln
    var platzierung = platz.toString();
    //Neuen Paragraphen erstellen
    createP(platzierung + '.' + ' ' + array[i]).parent('localscores');
    //Platzierung hochzaehlen
    platz++;
  }
  //Konsolenausgabe
  //console.log(highscores);
}
//Funktion zum lokalen Speichern des Scorewertes
function storeScore() {
  //aktuellen Score hinzufuegen
  addScore();
  //Sofern es Eintraege im Array gibt
  if (highscores.length > 0) {
    //Bubblesort Algorithmus ausfuehren
    bubbleSort(highscores);
    //Dann sollen die neuen Scorewerte auch angezeigt werden
    //Dies geschieht bereits in setup()
  }
}
//Funktion zum Eintraege einlesen
function HolEintraege() {
  //Die bisher gespeicherten Werte holen
  var eintraegeArray = localStorage.getItem('eintraegeArray');
  //Wenn es kein Array gibt, dann erstelle eines (wenn es keine Eintraege gibt)
	if (!eintraegeArray) {
		eintraegeArray = [];
    eintraegeArray.push(graphics.score.toString());
		localStorage.setItem('eintraegeArray', JSON.stringify(eintraegeArray));
	}
  //Gibt es Eintraege, dann speichere sie im Array
  else {
		eintraegeArray = JSON.parse(eintraegeArray);
	}
  //Gib die Eintraege zurueck
	return eintraegeArray;
}
//Funktion zum Score hinzufuegen
function addScore() {
  //Die bisher gespeicherten Werte in dieser Variablen speichern
  var eintraegeArray = HolEintraege();
  //Der erreichte Score Wert als String
	var value = graphics.score.toString();
  //Erst pruefen, ob bereits 10 Scorewerte gespeichert wurden
  //Wenn nicht, kann der Score immer gespeichert werden
  if (eintraegeArray.length < anzahlScores) {
    //Neuen Wert ins Array packen
    eintraegeArray.push(value);
    //Im lokalen Speicher ablegen
    localStorage.setItem('eintraegeArray', JSON.stringify(eintraegeArray));
  }
  //Wenn es bereits 10 Eintraege gibt
  else {
    //Nur wenn Score besser ist, als der schlechteste, soll gespeichert werden
    if (graphics.score > eintraegeArray[eintraegeArray.length - 1]) {
      //Den schlechtesten Score entfernen
      eintraegeArray.shift();
      //Den erreichten reinschreiben
      eintraegeArray.push(value);
      //Im lokalen Speicher ablegen
      localStorage.setItem('eintraegeArray', JSON.stringify(eintraegeArray));
    }
  }
  //Das Array mit den Eintraegen in highscores speichern
  highscores = eintraegeArray;
}
//Funktion zum Sortieren (source: http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/)
//bekommt das zur sortierende Array als Parameter uebergeben
function bubbleSort(array) {
  var swapped;
  do {
    swapped = false;
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  //Gib das sortierte Array zurueck
  return array;
}
//Funktion zum Loeschen von dem gesamten lokalen Speicher
//Wird fuer das Spiel nicht benoetigt, ist aber implementiert, falls man als User den lokalen Speicher leeren moechte
function clearStorage() {
  localStorage.clear();
}
//Funktion, fuer Echtzeit Anzeige
function realTimeScore() {
  //Der erreichte Score Wert als String
  var value = graphics.score.toString();
  //Erst pruefen, ob bereits 10 Scorewerte gespeichert wurden
  //Wenn nicht, kann der Score immer gespeichert werden
  if (highscores.length < anzahlScores) {
    //Neuen Wert ins Array packen
    highscores[highscores.length - 1] = value;
    //Im lokalen Speicher ablegen
    localStorage.setItem('eintraegeArray', JSON.stringify(highscores));
  }
  //Wenn es bereits 10 Eintraege gibt
  else {
    //Nur wenn Score besser ist, als der schlechteste, soll gespeichert werden
    if (graphics.score > highscores[highscores.length - 1]) {
      //Den schlechtesten Score entfernen
      highscores[highscores.length - 1] = value;
      //Im lokalen Speicher ablegen
      localStorage.setItem('eintraegeArray', JSON.stringify(highscores));
    }
  }
}
