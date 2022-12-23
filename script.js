const calendar = document.querySelector(".calendar");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector(".modal-content");
const modalButton = document.querySelector(".modal-button");

// Prepariamo un elenco con gli indici delle finestre aperte vvvg
let openenedIndexes = [];

// ! Controliamo subito e c'erramo degli indici salvata
const previouslyOpenedIndexes = localStorage.getItem('my-list');
//Se c'e
if(previouslyOpenedIndexes){
    openenedIndexes = JSON.parse(previouslyOpenedIndexes);   
}


/*------------------------------
OPERAZION DI AVVIO
--------------------------------*/

for (let i = 0; i < source.length; i++) {
    calendar.innerHTML += createBox(i);
}



/*------------------------------
EVENTI DINAMICI
--------------------------------*/

// Rendere cliccabili le finestrelle
const boxes = document.querySelectorAll(".box");
for(let i= 0; i < boxes.length; i++){
    // Prendo ad ogni giro il box corrente
    const box = boxes[i];

    // Rendo cliccabile il box
    box.addEventListener("click", function() {
        // 1. FAi apparire questo box come se fosse aperto
        box.classList.add("box-opened");

        // 2. Riempiri la modale
        inserModalContent(i);

        // 3. Apri la modale
        openModal();

        addToOpenendIndexes(i);
    })
}

modalButton.addEventListener("click", function(){
    closeModal();
});

/**--------------------------------**
 * 
 *  FUNZIONI
 --------------------------------*/

 
function createBox(i) {
    const date = i+1;
    const icon = source[i].icon;
    let classes = "box";

    // ! Controlla se sono state aperte
    if(openenedIndexes.includes(i)){
        classes = "box box-opened"; 
        }

    return `  <div class="${classes}">
    <img class="box-icon" src="images/icons/${icon}.png" alt="icon" />
    <div class="box-date">${date}</div>
</div> `;
}

function openModal(){
    modal.classList.remove("modal-hidden");
}
function closeModal(){
    modal.classList.add("modal-hidden");
}

// funzione per riempire la modale
function inserModalContent(i){
    const surprise = source[i];
    if(surprise.type == 'image'){
        modalContent.innerHTML = `<img src="${surprise.url}" alt="${surprise.title}">`;
    }
    else if(surprise.type == 'text'){
        modalContent.innerHTML = `<p>${surprise.text}</p>`;
    }
}

// funzione per aggiungere l'indice alla lista
function addToOpenendIndexes(i){
    //Se dentro openedIndexes NON c'é già la i
    if(!openenedIndexes.includes(i)){
        //La aggiungamo alla lista
        openenedIndexes.push(i);

        //La aggiungamo nel Storage
        localStorage.setItem('my-list', JSON.stringify(openenedIndexes));
    }
    console.log(openenedIndexes)
}