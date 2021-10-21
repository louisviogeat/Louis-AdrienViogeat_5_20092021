
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
            const product = displayProduct(value);
            main.appendChild(product);
        }).catch(function(err) {
            
        });
}

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

    const p = document.createElement('p');
    p.classList.add('card-text');
    p.textContent = product.price/100 + '€';

    divBody.appendChild(h5);
    divBody.appendChild(p);
    divCard.appendChild(img);
    divCard.appendChild(divBody);

    return divCard;
}


