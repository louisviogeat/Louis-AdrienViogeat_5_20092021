// Mettre ici la fonction addToCart à appeler page produit et panier
// Ajouter et retirer un élément du panier

function addToCart(id) {
    console.log('id', id);
    console.log('addToCart', this.productAdded);
    if (this.productAdded) {
        console.log('a');           
        const index = this.productAdded
            .findIndex(product => product.id === id);
        if (index >= 0) {
            console.log('ici');
            this.productAdded[index].count++; 
            console.log('b');           
        } else {
            console.log('c');           
            this.productAdded.push({id, count: 1 });
        }
        console.log('d');           

        localStorage.setItem('id', JSON.stringify(this.productAdded));
        console.log(localStorage.getItem('id'));        
    } else {
        console.log('e');           

        localStorage.setItem('id', JSON.stringify([{id, count: 1 }]));
    }
    location.reload();
}

function removeFromCart(id) {
    if (this.productAdded) {
        const index = this.productAdded
            .findIndex(product => product.id === id);
            console.log(this.productAdded[index]);
        if (this.productAdded[index].count > 1) {
            this.productAdded[index].count--;

        } else {
            this.productAdded.splice(index, 1);
        }        
    }
    localStorage.setItem('id', JSON.stringify(this.productAdded));
    location.reload();
}

function removeAllLocalStorage() {
    localStorage.removeItem('id');
}