urlApi = 'http://127.0.0.1:3000/api/cameras';

totalAllPrice = 0;

let numberOfLines = 0;
const productAdded = JSON.parse(localStorage.getItem('id'));

for (const product of productAdded) {
    getOneProduct(product).then(function (productData) {
        const tbody = document.getElementById('tableOfProduct');
        const productLine = displayProductLine(productData, product.count, productAdded);
        tbody.appendChild(productLine);
        totalAllPrice += (productData.price / 100 * product.count)
        numberOfLines++;
        addFooter(numberOfLines, productAdded);
    }).catch(function (err) {
        alert(err);
    })
}

async function getOneProduct(product) {
    // Récupérer un produit de l'API
    const res = await fetch(urlApi + '/' + product.id);
    if (res.ok) {
        return res.json();
    }
}

async function addFooter(numberOfLines, productAdded) {
    // Ajouter une ligne total au tableau
    if (numberOfLines === productAdded.length) {
        const tfoot = document.getElementById('footerWithTotal');
        const total = await displayFooterTotal();
        tfoot.appendChild(total);
    }
}

function displayProductLine(product, quantity, productAdded) {
    // Afficher une ligne produit du tableau
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = product.name;

    const td1 = document.createElement('td');
    td1.textContent = quantity.toLocaleString();

    const td2 = document.createElement('td');
    td2.textContent = (product.price / 100).toLocaleString() + '€';

    const td3 = document.createElement('td');
    const td3Span = document.createElement('span');
    const totalPrice = quantity * (product.price / 100);
    td3Span.textContent = totalPrice.toLocaleString();

    td3.appendChild(td3Span);
    td3.textContent += '€'

    const addButton = document.createElement('button');
    addButton.classList.add('btn');
    addButton.classList.add('btn-light');
    addButton.setAttribute('type', 'button');
    addButton.onclick = function () { addToCart(product._id, productAdded); }

    const iPlus = document.createElement('i');
    iPlus.classList.add('fas');
    iPlus.classList.add('fa-plus');

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn');
    removeButton.classList.add('btn-light');
    removeButton.setAttribute('type', 'button');
    removeButton.onclick = function () { removeFromCart(product._id, productAdded); };

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

async function displayFooterTotal() {
    // Afficher la ligne total du tableau
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = 'Total';

    const td1 = document.createElement('td');

    const td2 = document.createElement('td');

    const td3 = document.createElement('td');
    const td3Span = document.createElement('span');
    td3Span.textContent = this.totalAllPrice.toString();
    td3.appendChild(td3Span);
    td3.textContent += '€';

    const tr = document.createElement('tr');

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    return tr;
}

function orderProduct(productAdded, contact, totalAllPrice) {
    // Commander un produit
    const products = [];
    productAdded.forEach(product => {
        products.push(product.id);
    });
    const order = {
        'contact': contact,
        'products': products
    }
    fetch(('http://127.0.0.1:3000/api/cameras/order'), {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-type": "application/json"
        },
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then((confirmation) => {
        localStorage.setItem('orderId', confirmation.orderId);
        localStorage.setItem('totalAllPrice', JSON.stringify(totalAllPrice));
    })
}

function getContactData() {
    // Récupérer les données du formulaire de contact
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
            const productAdded = JSON.parse(localStorage.getItem('id'));
            orderProduct(productAdded, contact, this.totalAllPrice);
            window.location.href = '/front-end/pages/confirmation.html';
        }
    }
}

function validatorField(contact) {
    // Vérifier le format des champs
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
        firstName.style.display = 'block';
        verif = false;
    }
    if (!contact.city.match(/^([a-zA-Z- ]+)$/i)) {
        const city = document.getElementById('errorCity');
        city.textContent = 'Le champ Ville ne doit comporter que des lettres';
        firstName.style.display = 'block';
        verif = false;
    }
    if (!contact.email.match(/^([a-zA-Z0-9_\-.]{1,}[@]{1}[a-zA-Z0-9_\-.]{1,})$/i)) {
        const email = document.getElementById('errorEmail');
        email.textContent = 'Le champ Email doit être au bon format';
        firstName.style.display = 'block';
        verif = false;
    }
    return verif;
}

function resetAlert() {
    // Retirer les messages d'alerte du formulaire
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


