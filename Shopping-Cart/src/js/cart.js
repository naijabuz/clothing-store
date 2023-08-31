let label = document.querySelector('#label');
let shoppingCart = document.querySelector('#shopping-cart');


let basket = JSON.parse(localStorage.getItem('data')) || [];


let calculation = () => {
    let cartAmount = document.querySelector('#cart-amount');

    cartAmount.innerHTML = basket.map((x)=> x.itemQty).reduce((x,y)=>x+y,0)
}

calculation();

let generateCartItems = () => {

    if (basket.length !== 0) {
        
        return (shoppingCart.innerHTML = basket.map((x) => {

            let {id, itemQty} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            return `
            
            <div class="cart-item">
            
                <img src="${search.imageURL}" alt="item-image" width="100">

                <div class="details">

                    <div class="title-price-x">
                        <p>${search.title}</p>
                        <p class="cart-item-price">$${search.price}</p>
                        <i onclick="remove(${id})" class="fa-regular fa-x"></i>
                    </div>

                    <div class="qty-btns">
                        <i onclick="reduce(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="qty">${itemQty}</div>
                        <i onclick="increase(${id})" class="fa-solid fa-plus"></i>
                    </div>

                    <h3>$${itemQty * search.price}</h3>
                </div>
            
            
            </div>

            `
        }).join(''));
    } 
    
    else {

        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        
        <h2>Cart is empty</h2>
        <a href='index.html'>
            <button class="homebtn">Back to store page</button>
        </a>

        `
    }

}

generateCartItems();

let increase = (id) => {
    let selectedItem = id;
    let search = basket.find((f)=> f.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            itemQty: 1,
        })
    }
    else {
        search.itemQty+=1;
    }

    generateCartItems();

    update(selectedItem.id);

    localStorage.setItem('data',JSON.stringify(basket))
}


let reduce = (id) => {
    let selectedItem = id;
    let search = basket.find((f)=> f.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.itemQty === 0) return;
    else {
        search.itemQty-=1;
    }

    update(selectedItem.id);

    basket = basket.filter((f)=> f.itemQty !== 0);

    generateCartItems();

    localStorage.setItem('data',JSON.stringify(basket));
}


let update = (id)=>{

    let search = basket.find((f)=> f.id === id);

    document.getElementById(id).innerHTML = search.itemQty;

    calculation();
    totalAmount();
}


let remove = (id) => {
    let selectedItem = id;
    basket = basket.filter((x)=> x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem('data',JSON.stringify(basket));
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem('data',JSON.stringify(basket));
}


let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {itemQty, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return itemQty * search.price;
        }).reduce((x,y) => x+y,0 );
        label.innerHTML = `
        
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button> 

        `;
    }

    else return;
}

totalAmount();



