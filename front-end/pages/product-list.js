
urlApi = 'http://127.0.0.1:3000/api/cameras';

fetch(urlApi).then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    const products = value
    console.log('products', products);
    const main = document.getElementById('main')
    for (let i = 0; i < products.length; i++) {

      const product = displayProducts(products[i]);
      console.log('product', product);
      console.log(products[i]._id);
      main.appendChild(product);

    }
})
  .catch(function(err) {
    // Une erreur est survenue
    // rediriger vers une page d'erreur
  });

  function displayProducts(product) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.style.width = '18rem';

    const a = document.createElement('a');
    a.classList.add('text-muted');
    a.classList.add('text-decoration-none');
    a.setAttribute('href', '/front-end/pages/product-detail.html?id=' + product._id);

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
    a.appendChild(img);
    a.appendChild(divBody);
    divCard.appendChild(a);

    return divCard;

  }

