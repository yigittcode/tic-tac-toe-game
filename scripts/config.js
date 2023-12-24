 function openPlayerConfig(event){
    editedPlayer = +event.target.dataset.playerid; // +'1' => 1
    playerConfigOverlayElement.style.display = 'block'
    backdropElement. style.display = 'block'
}

function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none'
    backdropElement.style.display = 'none'
    formElement.firstElementChild.classList.remove('error');
    errorsOutputElement.textContent ='';
    formElement.firstElementChild.children[1].value = '';

}

function savePlayerConfig(event){
   event.preventDefault();
   const formData = new FormData(event.target); // JavaScript behind the scenes will analyze this form here
    const enteredPlayerName = formData.get('playername').trim();  //   " leo   messi   " => "leo   messi"
    if(!enteredPlayerName) /*falsy val.*/  {
        event.target.firstElementChild.classList.add('error');
        errorsOutputElement.textContent = 'Please enter a valid name!';
        return;
    }

    const updatedPlayerDataElemenet = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerDataElemenet.children[1].textContent = enteredPlayerName;
    // if(editedPlayer ===1) {
    //     players[0].name = enteredPlayerName;
    // }
    // else {
    //     players[1].name = enteredPlayerName;
    // }
    players[editedPlayer-1].name = enteredPlayerName;
    closePlayerConfig();
}