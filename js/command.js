//Récuperation de lastOrder correspondant a la dernière commande
const order = JSON.parse(localStorage.getItem("lastOrder"));

//Affichage du numero de commande avec Template
const displayCommand = (order) => {


    const templateElt = document.getElementById("command__txt");
    const cloneElt = document.importNode(templateElt.content, true);

    const totalOrder = order.products.reduce((acc, teddy) => acc + teddy.price , 0)

    
    cloneElt.getElementById("command__id").textContent = order.orderId;
    cloneElt.getElementById("command__price").textContent = totalOrder + "€";

    document.getElementById("command").appendChild(cloneElt);
}

//Appel de fonction
displayCommand(order);