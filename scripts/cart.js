import { getLoggedUser } from "./user.js";

let userid = getLoggedUser();
// console.log(userid);
let items = getItems();
let total = 0;
if (userid !== null) {
    // user is logged in
} else {
    // user is not logged in
}

// handle cart logic, display items, route to checkout


// appends an item/quantity
export function addItem(bookisbn, bookquantity) {

    let currcart = localStorage.getItem("cart");
    // console.log(currcart);
    
    let item = {
        isbn: bookisbn,
        quantity: bookquantity
    }

    if (currcart === null) {
        currcart = [];
    } else {
        currcart = JSON.parse(currcart);
    }
    currcart.push(item);
    // console.log(getItems());
    localStorage.setItem("cart", JSON.stringify(currcart));

};

// returns an array of items
export function getItems() {

    let cartdata = localStorage.getItem("cart");
    return JSON.parse(cartdata);

};

// removes all items from the cart
export function emptyCart() {

    localStorage.removeItem("cart");

};


function generateItem(isbn, node, bookquantity) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status === 200) {  
            var data = this.response;
            var item = JSON.parse(data)[0];

            var newItem = document.createElement("div");
            newItem.classList.add("List-Item");
            // console.log(item);

            var p1 = document.createElement("a");
            p1.classList.add("List-Item-title");
            p1.href = "./book.html?" + item.ISBN;
            var titleText = document.createTextNode(item.Title);
            p1.appendChild(titleText);
            newItem.appendChild(p1);

            var p2 = document.createElement("p");
            p2.classList.add("List-Item-author");
            var authorText = document.createTextNode(item.Name);
            p2.appendChild(authorText);
            newItem.appendChild(p2);

            var p3 = document.createElement("p");
            p3.classList.add("List-Item-price");
            var priceText = document.createTextNode("$" + item.SellingPrice * bookquantity);
            p3.appendChild(priceText);
            newItem.appendChild(p3);

            var p4 = document.createElement("p");
            p4.classList.add("List-Item-quantity");
            var quantity = document.createTextNode("Quantity: " + bookquantity);
            p4.appendChild(quantity);
            newItem.appendChild(p4);

            node.appendChild(newItem);

            document.getElementById("cart-total").innerHTML = item.SellingPrice * bookquantity + Number(document.getElementById("cart-total").innerHTML);
        }

    }
    xhttp.open("GET", "../scripts/get_book_info.php?isbn=" + isbn, true);
    xhttp.send();
};

export function displayItems(itemlist) {

    var node = document.getElementById("Item-List");
    // console.log(itemlist);
    if (itemlist === null) {
        return
    }

    for (let i = 0; i < itemlist.length; i++) {
        generateItem(itemlist[i].isbn, node, itemlist[i].quantity);
    }


};