function addToCart(id, productAdded) {
    if (!productAdded) {
        localStorage.setItem('id', JSON.stringify([{ id, count: 1 }]));
    } else {
        const index = productAdded
            .findIndex(product => product.id === id);
        if (index >= 0) {
            productAdded[index].count++;
        } else {
            productAdded.push({ id, count: 1 });
        }
        localStorage.setItem('id', JSON.stringify(productAdded));
    }
    location.reload();
}

function removeFromCart(id, productAdded) {

    const index = productAdded
        .findIndex(product => product.id === id);
    if (productAdded[index].count > 1) {
        productAdded[index].count--;
    } else {
        productAdded.splice(index, 1);
    }
    localStorage.setItem('id', JSON.stringify(productAdded));
    location.reload();
}
