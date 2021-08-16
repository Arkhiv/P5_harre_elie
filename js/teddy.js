"use strict";

// Stocker l'ID du Teddy ____________________
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Récuperation d'un "Teddy" via l'API, en utilisant l'ID via Fetch

const getTeddy = (id) => {
    return fetch(`http://localhost:3000/api/teddies/${id}`)
        .then((httpBodyResponse) => {
            return httpBodyResponse.json()
        })
        .then((teddy) => {
            return teddy
        })
        .catch((error) => {
            alert(error)
        });
}

// Affichage de Teddy et ses informations

const displayTeddy = (teddy) => {
    const templateElt = document.getElementById("tp_teddy_product");
    const cloneElt = document.importNode(templateElt.content, true);
    const select = cloneElt.getElementById("teddy__colors")

    // Parcours le paramètre COLORS de Teddy et le place en Value et Content.
    teddy.colors.forEach(color => {
        const option = document.createElement("option");
        option.textContent = color;
        option.value = color;
        select.appendChild(option);

    })

    //Affichage des différents éléments de Teddy + onclick sur le button
    cloneElt.getElementById("cart__button").onclick = () => addToCart(teddy)
    cloneElt.getElementById("teddy__name").textContent = teddy.name;
    cloneElt.getElementById("teddy__price").textContent = teddy.price + "€";
    cloneElt.getElementById("teddy__img").src = teddy.imageUrl;
    cloneElt.getElementById("teddy__txt").textContent = teddy.description;

    document.getElementById("teddy_product_main").appendChild(cloneElt);
};

//Ajouter au panier, récupère les informations string puis formate en array
//Récupère Cart dans le Localstorage ou [] si il est vide
//Push "cart": Les informations de Teddy correpondantes la suite dans le tableau
//Ajoute au localStorage les informations du tableau (le Teddy)
const addToCart = (teddy) => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || '[]');
    cart.push(teddy);
    window.localStorage.setItem("cart", JSON.stringify(cart));
}

//Appelle de la fonction
(async () => {
    const currentTeddy = await getTeddy(id);
    displayTeddy(currentTeddy);
})();