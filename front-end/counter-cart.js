function displayCart() {
    
    const span = document.createElement('span');
    span.setAttribute('id', 'count');
    span.classList.add('badge');
    span.classList.add('bg-secondary');
    span.textContent = 0 ;
        //mettre le counter();

    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.textContent = 'Panier '

    button.appendChild(span);

    const cart = document.getElementById('cart');
    cart.appendChild(button);

    return cart

}

function counter() {
    // compter la somme des count de l'objet avec map
}

displayCart();

