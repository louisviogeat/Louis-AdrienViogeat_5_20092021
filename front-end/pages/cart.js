
// Faire le formulaire sur la page panier
// récupérer les données dans le local storage
// Utiliser des regex
// Les récupérer dans la page confirmation de paiement

// Revoir le design du site


urlApi = 'http://127.0.0.1:3000/api/cameras';

productAdded = JSON.parse(localStorage.getItem('id'));


const productString = localStorage.getItem('id');
const products = JSON.parse(productString);

console.log('localStorage', products);
console.log('productAdded', productAdded);

for (const product of products) {
    getOneProduct(product).then(function(value) {
            const tbody = document.getElementById('tableOfProduct');
            const productLine = displayProductLine(value, product.count);
            tbody.appendChild(productLine);
        /*            

        */
        }).catch(function(err) {
            
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

function displayProductLine(product, quantity) {
    console.log('displayProductLine', product);
    console.log('displayProductLine', quantity);

    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = product.name;

    const td1 = document.createElement('td');
    td1.textContent = quantity.toLocaleString();

    const td2 = document.createElement('td');
    td2.textContent = (product.price/100).toLocaleString() + '€';

    const td3 = document.createElement('td');
    td3.textContent = (quantity * (product.price/100)).toLocaleString() + '€';

    const addButton = document.createElement('button');
    addButton.classList.add('btn');
    addButton.classList.add('btn-light');
    addButton.setAttribute('type', 'button');
    addButton.onclick = function(){addToCart(product._id);}

    const iPlus = document.createElement('i');
    iPlus.classList.add('fas');
    iPlus.classList.add('fa-plus');

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn');
    removeButton.classList.add('btn-light');
    removeButton.setAttribute('type', 'button');
    removeButton.onclick = function(){removeFromCart(product._id);};

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
            totalUnitPrice = totalUnitPrice + res.price/100;
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

function getUserData() {

    let user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    };
    const fieldNotFilled = Object.keys(user).some((e) => user[e] === ''); 
    if (fieldNotFilled) {
        alert('Tous les champs doivent être complétés')
    } else {
        validatorField(user);
        if (validatorField(user)) {
            console.log('zé barti');
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
    console.log(user);
}

function validatorField(user) {
    if (!user.firstName.match(/^([a-zA-Z-]+)$/i)) {
        alert('Le champ prénom ne doit comporter que des lettres')
        return false;
    } else {
        if (!user.lastName.match(/^([a-zA-Z-]+)$/i)) {
            alert('Le champ nom ne doit comporter que des lettres')
            return false;
        } else {
            if (!user.address.match(/^([0-9a-zA-Z- ]+)$/i)) {
                alert('Le champ adresse ne doit comporter que des chiffres et des lettres')
                return false;
            } else {
                if (!user.city.match(/^([a-zA-Z-]+)$/i)) {
                    alert('Le champ ville ne doit comporter que des lettres')
                    return false;
                } else {
                    if (!user.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
                        alert('Le champ email doit être au bon format')
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    }
}

document.getElementById('commandButton')
.addEventListener(
    'click',
    function(event){
        event.preventDefault();
        getUserData();
    }
);


// pseudo.match(/^([0-9a-zA-Z_]){6,20}$/)


