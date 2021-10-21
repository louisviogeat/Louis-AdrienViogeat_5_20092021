function displayCart(productAdded) {
    
    const span = document.createElement('span');
    span.setAttribute('id', 'count');
    span.classList.add('badge');
    span.classList.add('bg-secondary');
    span.textContent = counter(productAdded);
        //mettre le counter();

    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.textContent = 'Panier '



    const a = document.createElement('a');
    a.classList.add('text-muted');
    a.classList.add('text-decoration-none');
    a.setAttribute('href', '/front-end/pages/cart.html');

    const cart = document.getElementById('cart');

    button.appendChild(span);
    a.appendChild(button);
    cart.appendChild(a);

    return cart

}

function counter(productAdded) {
    // compter la somme des count de l'objet avec map
    return productAdded.map(
        product => product.count
        ).reduce((prev, next) => prev + next);
}

function sum(prev, next){
    return prev + next;
  }
  




