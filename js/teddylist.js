"use strict";

//Appel vers l'API pour récupérer les informations, via fetch
const getTeddies = () => {
    return fetch("http://localhost:3000/api/teddies")
        .then((httpBodyResponse) => {
            return httpBodyResponse.json()
        })
        .then((teddies) => {
            return teddies
        })
        .catch((error) => {
            alert(error)
        });
}


//Affichage des Teddies avec l'utilisation de <Template></Template>.
const displayTeddies = (teddy) => {
    const templateElt = document.getElementById("tp_teddy_list");
    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById("teddy__name").textContent = teddy.name;
    cloneElt.getElementById("teddy__price").textContent = teddy.price + "€";
    cloneElt.getElementById("teddy__img").src = teddy.imageUrl;
    cloneElt.getElementById("teddy__link").href = `product.html?id=${teddy._id}`;

    document.getElementById("teddy_list_main").appendChild(cloneElt);
};


//Appel de la fonction / En parcourant la liste de Teddy de l'API
(async () => {
    const teddies = await getTeddies();

    for (const teddy of teddies) {
        displayTeddies(teddy);
    };
})();