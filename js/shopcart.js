"use strict";


// Affichage avec Template

const displayCart = (teddy) => {
    const templateElt = document.getElementById("cart__template");
    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById("teddy__name").textContent = teddy.name;
    cloneElt.getElementById("teddy__img").src = teddy.imageUrl;
    cloneElt.getElementById("teddy__price").textContent = teddy.price + "€";


    document.getElementById("cart__tbody").appendChild(cloneElt);

}
// Affichage du total de cart avec l'utilisation de "reducer"
const displayTotal = (cart) => {

    const templateElt = document.getElementById("cart__totalrow");
    const cloneElt = document.importNode(templateElt.content, true);
    //const reducer = (accumulator, teddy) => accumulator + teddy.price;
    //const totalCart = cart.reduce(reducer, 0)
    const totalCart = cart.reduce((acc, teddy) => acc + teddy.price , 0)

    
    cloneElt.getElementById("cart__total").textContent = totalCart + "€";

    document.getElementById("cart__tbody").appendChild(cloneElt);
}



const cart = JSON.parse(window.localStorage.getItem("cart") || '[]');

for (const teddy of cart) {
    displayCart(teddy);
};

displayTotal(cart);

// REQUETE POST

const post = () => {
    const cartIds = cart.map(teddy => teddy._id)
    const data = {
        contact: {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
        },
        products: cartIds
    };

    // console.log(data)

    fetch("http://localhost:3000/api/teddies/order",{
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode: 'cors',
    })
    .then (res => res.json())

    .then (order => {
        localStorage.clear()
        localStorage.setItem("lastOrder", JSON.stringify(order))
        window.location = "command.html"
    });
}

//Isoler l'event "e" onsubmit pour désactiver ses paramètres par défaut.
//Verifie si le panier est vide + alert si vide
//Sinon execute post
let form = document.getElementById('cartform');
form.onsubmit = (e) => {
    e.preventDefault()
    if(cart.length === 0){
        alert("Vous devez choisir au moins un article !")
    }
    else{
        post()
    }  
}


// Informations pour la requete POST _______________________________ //
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */