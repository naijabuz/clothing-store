let shop = document.querySelector('#shop');

let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = ()=>{
    return (shop.innerHTML = shopItemsData
        .map((x)=>{
        let {id, imageURL, title, desc, price} = x;
        let search = basket.find((x)=> x.id === id) || [];
        return `
    
        <div id=product-id-${id} class="item">
            <img src="${imageURL}" alt="store-item" width="1920" height="1920" loading="lazy">

            <div class="details">
                <h2>${title}</h2>
                <p>${desc}</p>

                <div class="price-qty">
                    <h3>$ ${price}</h3>

                    <div class="qty-btns">
                        <i onclick="reduce(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="qty">
                         ${search.itemQty === undefined ? 0 : search.itemQty}

                        </div>
                        <i onclick="increase(${id})" class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        
        `;
    })
    .join(''));
};

generateShop();

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

    localStorage.setItem('data',JSON.stringify(basket));
}


let update = (id)=>{

    let search = basket.find((f)=> f.id === id);

    document.getElementById(id).innerHTML = search.itemQty;

    calculation();
}

let calculation = () => {
    let cartAmount = document.querySelector('#cart-amount');

    cartAmount.innerHTML = basket.map((x)=> x.itemQty).reduce((x,y)=>x+y,0)
}

calculation();