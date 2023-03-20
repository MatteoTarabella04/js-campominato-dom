/* 
Consegna
1) L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
   Ogni cella ha un numero progressivo, da 1 a 100.
   Ci saranno quindi 10 caselle per ognuna delle 10 righe.
   Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
2) Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
   nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
   In seguito l'utente clicca su una cella:
   se il numero è presente nella lista dei numeri generati
   abbiamo calpestato una bomba
   la cella si colora di rosso e la partita termina.
   Altrimenti
   la cella cliccata si colora di azzurro
   l'utente può continuare a cliccare sulle altre celle.
   La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
   Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/


/* steps
-richiamo il bottone e il container
-creo l'evento per la generazione delle celle
-aggiungo le celle
-creo lìevento per cambiare colore alle celle
*/

// richiamo il bottone e la select dei livelli dal DOM
const playButtonElement = document.getElementById('play_btn');
const levelSelectEl = document.getElementById('level');

// richiamo il contenitore dove andranno aggiunte le celle
const containerElement = document.querySelector('.container');

// creo l'evento per il bottone che genera le celle
playButtonElement.addEventListener('click', function () {

   //prelevo il numero di celle
   const cellsNumber = setLEvelCells(levelSelectEl.value);

   // creo le celle
   generateCells(cellsNumber, containerElement);

   // genero le bombe
   const bombs = generateBombs(cellsNumber);
   console.log(bombs);

   // seleziono tutti gli elementi con calsse "cell" e assegno la classe active quando vengono cliccate
   const cellEl = document.querySelectorAll('.cell');
   selectedCell(cellEl, bombs);


})


/* FUNCTIONS */
// funzione che preleva il numero delle celle dal livello selezionato
function setLEvelCells(selectedLevel) {
   let cellNum = 100;
   switch (selectedLevel) {
      case "medium":
         cellNum = 81
         break;
      case "hard":
         cellNum = 49
         break;
   }

   return cellNum;
}

// funzione che genera le celle in base al livello
function generateCells(totCells, container) {

   // setto il container vuoto
   container.innerHTML = "";

   const cellsInARow = Math.sqrt(totCells);

   for (let i = 1; i <= totCells; i++) {
      //const markupEl = `<div class="cell">${i}</div>`
      const markupEl = document.createElement('div');
      markupEl.classList.add('cell');

      // imposto il nuumero di celle modificando lo stile
      markupEl.style.width = `calc(100% / ${cellsInARow})`;
      markupEl.innerHTML = i;

      containerElement.insertAdjacentElement('beforeend', markupEl);
      //containerElement.innerHTML += markupEl;
   }
}

// funzione che genera le bombe
function generateBombs(cellsNum) {
   // dichiaro l'array che conterrà le bombe
   const bombsArray = [];

   // ciclo che genera nemeri random da 1 al numero delle celle per 16 volte
   for (let i = 0; i < 16; i++) {
      let bomb = Math.floor(Math.random() * cellsNum) + 1;

      while (bombsArray.includes(bomb)) {
         bomb = Math.floor(Math.random() * cellsNum) + 1;

      }
      bombsArray.push(bomb);

   }

   return bombsArray;

}

// fuunzione che cambia il bg alle celle
function selectedCell(cellElements, bombsArray) {

   for (let i = 0; i < cellElements.length; i++) {

      const cell = cellElements[i];

      cell.addEventListener('click', function () {

         // se la cella contiene lo stesso numero contenuto nell'array delle bombe si colora di rosso: Esce il messaggio 'hai perso'. Altrimenti si assegna classe active e si può continuare
         if (bombsArray.includes(Number(cell.innerText))) {
            cell.style.backgroundColor = 'red';

            // imposto un timer affinche si possa vedere la casella selezionata in rosso prima che si clicchi sull'ok dell'alert che ricaricherà la pagina
            setTimeout(() => {
               alert('YOU LOSE');
               location.reload();
            }, 200);

         } else {
            cell.classList.add('active');
            console.log(Number(this.innerText));
         }

      })
   }
}