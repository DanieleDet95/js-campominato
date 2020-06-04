/* Il computer deve generare 16 numeri casuali tra 1 e 100.
In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100.
Se il numero è presente nella lista dei numeri generati, la partita termina,
altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge
il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero
di volte che l’utente ha inserito un numero consentito.
BONUS: all’inizio il software richiede anche una difficoltà all’utente che cambia
il range di numeri casuali.
Con difficoltà 0=> tra 1 e 100, con difficoltà 1 => tra 1 e 80, con difficoltà 2=> tra 1 e 50 */

// Dichiarazioni variabili globali
var arrayBombe = [];
var numeriInseriti = [];
var messaggio = 'In aggiornamento';
var tentativi = 0;
var numeroBombe = 16;
var inserimentoDoppio = false;

// Inserimento difficoltá con range da 1 a 3 BONUS
do {
  var difficolta = parseInt(prompt('Inserisci la difficoltá da 1 a 3'));
} while (difficolta < 1 || difficolta > 3 || isNaN(difficolta));

// Ciclo ripetuto 16 volte
var i = 0;
while (i < numeroBombe) {

  // Generazione numeri in base alla difficoltá con rangeMax
  switch (difficolta) {
    case 1:
    var rangeMax = 100;
      var numeroCasualeComputer = generaNumeriCasuali(rangeMax);   // Da 1 a 100
      break;
    case 2:
      var rangeMax = 80;
      var numeroCasualeComputer = generaNumeriCasuali(rangeMax);    // Da 1 a 80
      break;
    case 3:
      var rangeMax = 50;
      var numeroCasualeComputer = generaNumeriCasuali(rangeMax);    // Da 1 a 50
      break;
  }

  // Controllo numero ripetuto con inserimento nell'array se valido
  controlloRipetizioneConInserimento(arrayBombe, numeroCasualeComputer);
  i++;
}
console.log(arrayBombe);

// Richiesta numero all'utente con validazione e contatore tentativi
do{
  var numeroUtente = numeroInseritoValido();
  numeriInseriti.push(numeroUtente);

  tentativi++;
  console.log(numeroUtente);

  // Se il numero inserito é presente nell'array
  for (var i = 0; i < arrayBombe.length; i++) {
    if (numeroUtente == arrayBombe[i]) {
      messaggio = 'Hai perso';
      tentativi--;
    }
  }

  // Se i numeri inseriti sono tutti quelli possibili
  var tentativiMax = rangeMax - arrayBombe.length;
  if(tentativi == tentativiMax){
    messaggio = 'Hai vinto';
  }
} while (messaggio == 'In aggiornamento' );

// Messaggio di output
document.getElementById('risultato').innerHTML = messaggio;
document.getElementById('tentativi').innerHTML = 'Il tuo punteggio é ' + tentativi;


// ----------------------------- FUNCTIONS -------------------------------------
// Funzione per generare numeri casuali da 1 a range max
function generaNumeriCasuali(rangeMax) {
  var valore = Math.floor(Math.random() * rangeMax + 1);
  return valore;
}

// Funzione se il numero casuale esiste giá
function controlloRipetizione(array, numero) {
  var numeroRipetuto = false;
  if (arrayBombe.includes(numeroCasualeComputer)) {
      numeroRipetuto = true;    //se giá presente nell'array
    };

  // Inserimento numero se non ripetuto
  if(numeroRipetuto){ i--; }
  else{ arrayBombe.push(numeroCasualeComputer);}

  arrayBombe.sort(function(a, b){return a-b});  //Ordine array crescente
}

// Funzione per far inserire all'utente un valore valido senza doppioni
function numeroInseritoValido() {
  do{
    do{
      var numeroUtente = prompt('Inserisci numero da 1 a ' + rangeMax);
    // Condizione numero compreso tra 1 e range max e non alfabetico
    }while(numeroUtente < 1 || numeroUtente > rangeMax || isNaN(numeroUtente));

    for (var i = 0; i < numeriInseriti.length; i++) {
      if (numeriInseriti[i] == numeroUtente) {
        inserimentoDoppio = true;   //Se il numero é gia presente nei numeri inseriti in precedenza
      }else{
        inserimentoDoppio = false;   //Se il numero non é gia presente nei numeri inseriti in precedenza
      }
    }
  }while(inserimentoDoppio)

  return numeroUtente;
}
