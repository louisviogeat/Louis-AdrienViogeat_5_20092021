
furniture = [{}]


urlApi = 'http://127.0.0.1:3000/api/furniture';

fetch(urlApi).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    this.furniture = value
    console.log(this.furniture);
    const lines = document.getElementsByClassName('list-group-item');
    for (let i = 0; i < this.furniture.length; i++) {
        console.log(this.furniture);
        lines[i].innerHTML = 
            '<div class="card"style="width: 18rem;">' +
                '<img src="' +
                this.furniture[i].imageUrl + 
                '" class="card-img-top" alt="...">' +
                '<div class="card-body">' +
                    '<h5 class="card-title">' + 
                    this.furniture[i].name + 
                    '</h5>' +
                    '<p class="card-text">' +
                    this.furniture[i].price + 
                    ' €</p>' +
                '</div>' +
            '</div>'
    }
})
  .catch(function(err) {
    // Une erreur est survenue
  });

