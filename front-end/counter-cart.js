displayCart();

function displayCart() {
    // Afficher une carte produit
    if (!localStorage.getItem('id')) {
        return;
    }
    const productAdded = JSON.parse(localStorage.getItem('id'));
    const span = document.createElement('span');
    span.setAttribute('id', 'count');
    span.classList.add('badge');
    span.classList.add('bg-secondary');
    span.textContent = counter(productAdded);

    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.textContent = 'Panier '

    const a = document.createElement('a');
    a.setAttribute('id', 'cart-button')
    a.classList.add('text-muted');
    a.classList.add('text-decoration-none');
    a.setAttribute('href', '/front-end/pages/cart.html');

    const cart = document.getElementById('cart');

    button.appendChild(span);
    a.appendChild(button);
    if (document.getElementById('cart-button')) {
        cart.replaceChild(a, document.getElementById('cart-button'));
    } else {
        cart.appendChild(a);
    }

    return cart
}

function counter() {
    // Compter le nombre de produits ajoutés
    const productAdded = JSON.parse(localStorage.getItem('id'));
    if (!productAdded) {
        return;
    }
    return productAdded.map(
        product => product.count
    ).reduce((prev, next) => prev + next);
}
