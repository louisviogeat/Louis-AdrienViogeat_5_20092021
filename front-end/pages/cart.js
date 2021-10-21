
urlApi = 'http://127.0.0.1:3000/api/cameras';

getProduct();

function getProduct() {
    const productString = localStorage.getItem('id');
    const product = JSON.parse(productString);
    console.log(product);
    fetch(urlApi + '/' + product[0].id)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then(function(value) {
            console.log(value);
            const main = document.getElementById('main');
            const product = displayProduct();
            main.appendChild(product);
        }).catch(function(err) {
            
        });
}

function displayProduct() {
// afficher le nom du produit, le compteur, le prix unitaire et le prix total

    const th0 = document.createElement('th');
    th0.setAttribute('scope', 'col');
    th0.textContent = '#';

    const th1 = document.createElement('th');
    th1.setAttribute('scope', 'col');
    th1.textContent = 'Nom du produit';

    const th2 = document.createElement('th');
    th2.setAttribute('scope', 'col');
    th2.textContent = 'Quantité';

    const th3 = document.createElement('th');
    th3.setAttribute('scope', 'col');
    th3.textContent = 'Prix unitaire';

    const th4 = document.createElement('th');
    th4.setAttribute('scope', 'col');
    th4.textContent = 'Prix total';

    const th5 = document.createElement('th');
    th5.setAttribute('scope', 'col');
    th5.textContent = '';

    const trCol = document.createElement('tr');

    const thead = document.createElement('thead');

    // boucle for pour les td (lignes)
/*
    const thRow1 = document.createElement('th');
    thRow1.setAttribute('scope', 'row');
    thRow1.textContent = '1';

    const td1 = document.createElement('td');
    td1.textContent = 'Nom produit';

    const td2 = document.createElement('td');
    td2.textContent = 'Quantité';

    const td3 = document.createElement('td');
    td3.textContent = 'PU';

    const td4 = document.createElement('td');
    td4.textContent = 'Px total';

    const trRow1 = document.createElement('tr');

    const tbody = document.createElement('tbody');
*/
    const table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-striped');


    trCol.appendChild(th0);
    trCol.appendChild(th1);
    trCol.appendChild(th2);
    trCol.appendChild(th3);
    trCol.appendChild(th4);
    trCol.appendChild(th5);
    thead.appendChild(tr);
/*
    trRow1.appendChild(thRow1);
    trRow1.appendChild(td1);
    trRow1.appendChild(td2);
    trRow1.appendChild(td3);
    trRow1.appendChild(td4);
    tbody.appendChild(trRow1);
*/
    table.appendChild(thead);
//    table.appendChild(tbody);

    return table;
}


