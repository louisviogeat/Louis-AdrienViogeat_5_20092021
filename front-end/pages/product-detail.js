urlApi = 'http://127.0.0.1:3000/api/cameras';

function getUrl() {
    const currentUrl = document.location.href;
    const url = new URL(currentUrl);
    const id = url.searchParams.get("id");

    return id;
}

fetch(urlApi + '/' + getUrl())
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then(function (value) {
        const main = document.getElementById('detail');
        const product = displayProduct(value);
        const lenses = displayLenses(value.lenses);
        main.appendChild(product);
    }).catch(function (err) {
        alert(err);
    });

function displayProduct(product) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.style.width = '18rem';

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt', product.name);

    const divBody = document.createElement('div');
    divBody.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = product.name;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = product.description;

    const lenses = displayLenses(product.lenses);

    const price = document.createElement('p');
    price.classList.add('card-text');
    price.textContent = (product.price / 100).toLocaleString() + '€';

    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-outline-success');
    button.textContent = 'Ajouter au panier';
    button.onclick = function () {
        const productAdded = JSON.parse(localStorage.getItem('id'));
        addToCart(product._id, productAdded);
    };

    divBody.appendChild(h5);
    divBody.appendChild(description);
    divBody.appendChild(lenses);
    divBody.appendChild(price);
    divBody.appendChild(button);
    divCard.appendChild(img);
    divCard.appendChild(divBody);

    return divCard;
}

function displayLenses(lenses) {

    const div = document.createElement('div');

    const h2 = document.createElement('h2');
    h2.classList.add('ui');
    h2.classList.add('sub');
    h2.classList.add('header');
    h2.textContent = 'Lentilles';

    const select = document.createElement('select');
    select.classList.add('ui');
    select.classList.add('fluid');
    select.classList.add('search');
    select.classList.add('dropdown');
    select.setAttribute('name', 'lenses');

    for (let i = 0; i < lenses.length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', lenses[i]);
        option.textContent = lenses[i];
        select.appendChild(option);
    }

    div.appendChild(h2);
    div.appendChild(select);

    return div;
}
