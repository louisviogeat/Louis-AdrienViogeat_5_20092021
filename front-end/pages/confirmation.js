retriveLocalStorageData();

function retriveLocalStorageData() {
    const orderId = localStorage.getItem('orderId');
    const totalPrice = JSON.parse(localStorage.getItem('totalAllPrice'));
    const command = document.getElementById('command');
    const jsCommand = displayCommand(orderId, totalPrice);

    command.appendChild(jsCommand);
}

function displayCommand(orderId, totalPrice) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const divCardHeader = document.createElement('div');
    divCardHeader.classList.add('card-header');
    divCardHeader.textContent = 'Commande n°' + orderId;

    const divCardBody = document.createElement('div');
    divCardBody.classList.add('card-body');

    const blockquote = document.createElement('blockquote');
    blockquote.classList.add('blockquote');
    blockquote.classList.add('mb-0');

    const p = document.createElement('p');
    p.textContent = 'Prix total : ' + totalPrice + ' €';

    const footer = document.createElement('footer');
    footer.classList.add('blockquote-footer');
    footer.textContent = 'Merci pour votre commande !';

    blockquote.appendChild(p);
    blockquote.appendChild(footer);
    divCardBody.appendChild(blockquote);
    divCard.appendChild(divCardHeader);
    divCard.appendChild(divCardBody);

    return divCard;
}