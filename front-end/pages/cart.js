


// envoyer les données de l'utilisateur dans le back-end (patch ou put voir specif)
// le résultat du patch/post est le n° de confirmation
// Dans la page confirmation de paiement, afficher le n° de confirmation

// Faire le plan de test

// Revoir le design du site


urlApi = 'http://127.0.0.1:3000/api/cameras';

productAdded = JSON.parse(localStorage.getItem('id'));


const productString = localStorage.getItem('id');
const products = JSON.parse(productString);

for (const product of products) {
    getOneProduct(product).then(function (value) {
        const tbody = document.getElementById('tableOfProduct');
        const productLine = displayProductLine(value, product.count);
        tbody.appendChild(productLine);
        /*            

        */
    }).catch(function (err) {

    });
}

async function addFooter() {
    const tfoot = document.getElementById('footerWithTotal');
    const total = await displayFooterTotal(this.productAdded);
    tfoot.appendChild(total);
}

addFooter();


function getOneProduct(product) {
    return fetch(urlApi + '/' + product.id)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        });
}

function orderProduct(productAdded, contact) {
    console.log(productAdded);
    console.log(contact);
    const products = [];
    productAdded.forEach(product => {
        products.push(product.id);
    });
    const order = {
        contact,
        products
    }
    console.log(order);
    return fetch((urlApi + '/order'), {
        method: 'post',
        body: order
    }).then((res) => {
        if (res.ok) {
            console.log(res.json());
        } else {
            console.log(res);
        }
    })
}

function displayProductLine(product, quantity) {

    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = product.name;

    const td1 = document.createElement('td');
    td1.textContent = quantity.toLocaleString();

    const td2 = document.createElement('td');
    td2.textContent = (product.price / 100).toLocaleString() + '€';

    const td3 = document.createElement('td');
    td3.textContent = (quantity * (product.price / 100)).toLocaleString() + '€';

    const addButton = document.createElement('button');
    addButton.classList.add('btn');
    addButton.classList.add('btn-light');
    addButton.setAttribute('type', 'button');
    addButton.onclick = function () { addToCart(product._id); }

    const iPlus = document.createElement('i');
    iPlus.classList.add('fas');
    iPlus.classList.add('fa-plus');

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn');
    removeButton.classList.add('btn-light');
    removeButton.setAttribute('type', 'button');
    removeButton.onclick = function () { removeFromCart(product._id); };

    const iMinus = document.createElement('i');
    iMinus.classList.add('fas');
    iMinus.classList.add('fa-minus');

    const td4 = document.createElement('td');

    const tr = document.createElement('tr');

    addButton.appendChild(iPlus);
    removeButton.appendChild(iMinus);
    td4.appendChild(addButton);
    td4.appendChild(removeButton);
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    return tr;
}

async function displayFooterTotal(listOfProductAdded) {
    let totalQuantity = 0;
    let totalUnitPrice = 0;

    for (const product of listOfProductAdded) {
        totalQuantity = totalQuantity + product.count;
        await getOneProduct(product).then((res) => {
            totalUnitPrice = totalUnitPrice + res.price / 100;
        });
    }

    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = 'Total';

    const td1 = document.createElement('td');
    td1.textContent = totalQuantity.toLocaleString();

    const td2 = document.createElement('td');
    td2.textContent = totalUnitPrice.toLocaleString() + '€';

    const td3 = document.createElement('td');
    td3.textContent = (totalQuantity * totalUnitPrice).toLocaleString() + '€';


    const tr = document.createElement('tr');

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    return tr;
}

function getContactData() {

    let contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    };
    const fieldNotFilled = Object.keys(contact).some((e) => contact[e] === '');
    if (fieldNotFilled) {
        alert('Tous les champs doivent être complétés')
    } else {
        validatorField(contact);
        if (validatorField(contact)) {
            orderProduct(this.productAdded, contact);
            //window.location.href = '/front-end/pages/confirmation.html';
        }
    }
}

function validatorField(contact) {
    let verif = true
    resetAlert();
    if (!contact.lastName.match(/^([a-zA-Z-' ]+)$/i)) {
        const lastName = document.getElementById('errorLastName');
        lastName.textContent = 'Le champ Nom ne doit comporter que des lettres';
        lastName.style.display = 'block';
        verif = false;
    }
    if (!contact.firstName.match(/^([a-zA-Z-' ]+)$/i)) {
        const firstName = document.getElementById('errorFirstName');
        firstName.textContent = 'Le champ Prénom ne doit comporter que des lettres';
        firstName.style.display = 'block';
        verif = false;
    }
    if (!contact.address.match(/^([0-9a-zA-Z-' ]+)$/i)) {
        const address = document.getElementById('errorAddress');
        address.textContent = 'Le champ Adresse ne doit comporter que des chiffres et des lettres';
        verif = false;
    }
    if (!contact.city.match(/^([a-zA-Z- ]+)$/i)) {
        const city = document.getElementById('errorCity');
        city.textContent = 'Le champ Ville ne doit comporter que des lettres';
        verif = false;
    }
    if (!contact.email.match(/^([a-zA-Z0-9_\-.]{1,}[@]{1}[a-zA-Z0-9_\-.]{1,})$/i)) {
        const email = document.getElementById('errorEmail');
        email.textContent = 'Le champ Email doit être au bon format';
        verif = false;
    }
    return verif;
}

function resetAlert() {
    const errorForm = document.getElementsByClassName('errorForm');
    for (const error of errorForm) {
        error.textContent = '';
        error.style.display = 'none';
    }
}

document.getElementById('commandButton')
    .addEventListener(
        'click',
        function (event) {
            event.preventDefault();
            getContactData();
        }
    );


// pseudo.match(/^([0-9a-zA-Z_]){6,20}$/)


