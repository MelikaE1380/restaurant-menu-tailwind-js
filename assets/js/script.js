

const productBox = document.getElementById("products-box");

const cartBox = document.getElementById("cart-box");

const modalArea = document.getElementById("modal_area");

let foodImageModal = document.getElementById("food_image_modal");

let foodNameModal = document.getElementById("name_food_modal");

let foodPriceModal = document.getElementById("food_price");

let foodScoreModal = document.getElementById("food_score");

let numEachFoodModal = document.getElementById("num_each_food");

let priceBeforeDiscount = document.getElementById("price_before_discount");

let taxPrice = document.getElementById("tax_price");

let discountCodeInput = document.getElementById("discount_code_input");

let submitDiscount = document.getElementById("submit_discount");

let discountPriceTag = document.getElementById("discount_price");

let totalAfterDiscountTax = document.getElementById("total_after_discount_tax");

let submitButton = document.getElementById("submit_button");

let submitModal = document.getElementById("submit_modal");

let placeOrder = document.getElementById("place_order");

let totalModal = document.getElementById("total_modal");

let totalPriceModal = document.getElementById("total_price_modal");

let discountCodes = [
    {
        code: "golden",
        percent: 60
    },

    {
        code: "silver",
        percent: 50
    }

];

let productList = [];

let cart = [];



let currentFoodId;




function syncCartToLocalStorage() {   //هرجایی که سبد خرید تغییر میکنه باید صدا زده بشه

    localStorage.setItem('cart', JSON.stringify(cart));
}


function syncLocalStorageToCart() {  //لحظه ای که سایت باز میشه نیازه که اجرا بشه
    const temp = localStorage.getItem('cart');

    if (temp) {
        cart = JSON.parse(temp);
    }
}



syncLocalStorageToCart();
getProductList();



async function getProductList() {
    try {
        const response = await fetch('https://67024fa4bd7c8c1ccd3e809a.mockapi.io/api/v1/foodMenu');
        const result = await response.json();
        productList = await result;
        renderProductList();
        renderCartBox();
    }
    catch (e) {
        console.log(e);
    }
}





function renderProductList() {    //function 2

    productBox.innerHTML = "";

    productList.forEach((item, index) => {

        productBox.innerHTML += `<div class="foodDiv" onclick="openModalBox(${index})">
                <div class="foodDiv-left">
                <div class="score-div"><p>${item.score}</p><svg width="25px" height="25px" viewBox="0 0 24 24" fill="#FFF068" xmlns="http://www.w3.org/2000/svg">
<path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#FFF068" stroke-width="1.5"/>
</svg></div>
                <div class="food-name-div"><p>${item.name}</p></div>

                </div>
                <div class="foodDiv-right" >
                
                <div class="foodImage-div flex flex-col gap-[70px]" >
                <div><img class="foodImage" src="${item.image}"></div>
               <div class="count-food-list" id="count-food-${item.id}"></div>
              <div class="food-countt" class="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#FBD460]"> <span id="countt-${item.id}">0</span> </div>
                </div>
                 
                
                <div><span class="dollar-tag">$</span><span class="price-tag">${item.price}</span></div>
                
                </div>
                
                `
        renderCountFood();

    })

}


function renderCountFood() {
    productList.forEach(item => {
        let countElement = document.getElementById(`countt-${item.id}`);
        let cartItem = cart.find(food => food.id === item.id);
        if (countElement) {
            countElement.innerHTML = cartItem ? cartItem.count : 0;
        }
    });
}



function renderTotalInModal(foodId) {
    let total = 0;
    const cartItem = cart.find(item => item.id === foodId);
    const productData = productList.find(prod => prod.id === foodId);

    if (cartItem && productData) {
        total = productData.price * cartItem.count;
    }

    totalPriceModal.innerHTML = `<div class="food-total"><span>${total.toFixed(2)} </span></div>`;
}


function openModalBox(index) {     // اینجا باید اطلاعات محصول رو در باکس مدال وارد کنیم

    const element = productList[index];

    currentFoodId = element.id;


    modalArea.style.display = "flex";
    modalArea.style.zIndex = 50;

    foodImageModal.src = element.image;

    foodNameModal.innerHTML = element.name;

    foodPriceModal.innerHTML = element.price;

    foodScoreModal.innerHTML = element.score;


    renderFoodNumbersToModalBox(`${currentFoodId}`);

    renderTotalInModal(currentFoodId);

}
function addFoodToCart() {  // اضافه کردن از طریق مدال

    if (cart.some(item => item.id === currentFoodId)) {
        const finder = cart.find(item => item.id === currentFoodId);

        finder.count += 1;

    }
    else {

        cart.push({ id: currentFoodId, count: 1 });

    }

    syncCartToLocalStorage();
    renderFoodNumbersToModalBox(`${currentFoodId}`);
    renderCartBox();
    renderCountFood();
    renderTotalInModal(currentFoodId);

}

function removeFoodFromCart() {

    let finder = cart.find(item => item.id === currentFoodId);

    if (finder?.count > 1) {
        finder.count -= 1;
    }

    else {
        cart = cart.filter(item => item.id !== currentFoodId);
    }

    syncCartToLocalStorage();
    renderFoodNumbersToModalBox(`${currentFoodId}`);
    renderCartBox();
    renderSumProducts();
    renderCountFood();
    renderTotalInModal();
    renderTotalInModal(currentFoodId);



}

function closeModal() {
    modalArea.style.display = "none";
}


function renderFoodNumbersToModalBox(currentFoodId) {   // currentFoodId: زمانی ساخته میشه که روی هر کارت کلیک میکنیم و مدال باز میشه
    let elem = cart.find(item => item.id === currentFoodId);
    if (elem) {
        numEachFoodModal.innerHTML = elem.count;
    } else {
        numEachFoodModal.innerHTML = 0;
    }
}

function renderCartBox() {

    if (cart.length > 0) {

        cartBox.innerHTML = "";
        cart.forEach(cartItem => {  // توی سبد خرید فقط ایدی و تعداد هر محصول هست ولی اسم و قیمتشو هم باید داشته باشیم


            const productData = productList.find(prod => prod.id === cartItem.id);


            cartBox.innerHTML += `

        <div id="cart" class="w-full text-[#403379] font-bold px-[20px]"> 
        
        <div class="flex justify-between items-center">
            <p>${productData.name}</p>
            <svg onclick="renderDeleteFoodFromCartCompletely(${cartItem.id})" fill="#403379" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 512 512"
                enable-background="new 0 0 512 512" xml:space="preserve">
                <polygon points="335.188,154.188 256,233.375 176.812,154.188 154.188,176.812 233.375,256 154.188,335.188 176.812,357.812 
256,278.625 335.188,357.812 357.812,335.188 278.625,256 357.812,176.812 " />
                <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z" />
            </svg>
        </div>
        <div class="flex justify-between items-center">
            <div class="flex gap-[5px] items-center">
                <div><svg onclick="removeFoodViaCartBox(${cartItem.id})" width="20px" height="20px" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 10L1 6L15 6V10L1 10Z" fill="#403379" />
                    </svg></div>
                <div> <span class="text-[20px]">${cartItem.count}</span></div>
                <div><svg onclick="addFoodViaCartBox(${cartItem.id})" width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z" fill="#403379" />
                    </svg></div>
            </div>
            <div>
                <span>${(productData.price * cartItem.count).toFixed(2)}</span>
            </div>

        </div>
        <hr class="w-full h-[3px]">
    </div>
        `;


        })

        renderSumProducts();
        renderDiscountCode();



    }

    else {
        cartBox.innerHTML = `<div class="flex justify-center items-center"><svg width="50" height="50 " viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 1H15V10H4.60087L4.17982 12H12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14H6C6 15.1046 5.10457 16 4 16C2.89543 16 2 15.1046 2 14V12.6459L2.98262 7.97846L2.15287 3H0V1Z"
                            fill="#402F88" />
                    </svg></div>

                <div class="flex flex-row justify-center items-center">
                    <p class="text-[#402F88] font-bold text-[16px]">Your shopping cart is empty!</p>
                </div>
`;
    }
}

function renderDeleteFoodFromCartCompletely(cartItemId) {

    console.log(cartItemId);
    cart = cart.filter(item => +item.id !== +cartItemId);

    renderCartBox();
    syncCartToLocalStorage();
    renderSumProducts();
    renderCountFood();

    renderTotalInModal(currentFoodId);
    discountPriceTag.innerHTML = `0.00 $`;


}



function addFoodViaCartBox(cartItemId) {
    discountPriceTag.innerHTML = `0.00$`;

    let finder = cart.find(item => item.id == cartItemId);


    if (finder) {
        finder.count += 1;
        syncCartToLocalStorage();
        renderCartBox();
        renderCountFood();
     
        renderTotalInModal(currentFoodId);
    } else {
        console.error('Item not found in cart:', cartItemId);
    }
    console.log(finder);
}

function removeFoodViaCartBox(cartItemId) {
    discountPriceTag.innerHTML = `0.00$`;
    let finder = cart.find(item => item.id == cartItemId);

    if (finder) {
        if (finder.count > 1) {
            finder.count -= 1;
            syncCartToLocalStorage();
            renderCartBox();
            renderCountFood();
        } else {
            cart = cart.filter(item => item.id !== cartItemId);
            syncCartToLocalStorage();
            renderCartBox();
            renderCountFood();
            renderTotalInModal(currentFoodId);
        }
    } else {
        console.error('Item not found in cart:', cartItemId);
    }
}



function calcSumPrice() {
    let price = 0;

    cart.forEach(finalItem => {
        const productFinal = productList.find(prodFinal => prodFinal.id === finalItem.id);

        price += parseFloat(`${productFinal.price * finalItem.count}`);

    })

    return price;

}

function renderSumProducts() {
    const price = calcSumPrice();

    priceBeforeDiscount.innerHTML = `${price} $`;

    taxPrice.innerHTML = `${(price * 0.09).toFixed(2)} $`;



    totalAfterDiscountTax.innerHTML = `${(price * 1.09).toFixed(2)}`;
}


function renderDiscountCode() {

    const price = calcSumPrice();

    discountCodes.forEach(item => {

        if (discountCodeInput.value == item.code) {

            discountPriceTag.innerHTML = "";
            console.log(item.code);


            let taxPrice = (price * 0.09).toFixed(2);  // محاسبه مالیات
            let discountPrice = price * ((item.percent) / 100); // محاسبه تخفیف  
            // console.log(discountPrice);

            discountPriceTag.innerHTML += `${discountPrice.toFixed(2)} $`;

            totalAfterDiscountTax.innerHTML = "";

            totalAfterDiscountTax.innerHTML = `${(+(price - discountPrice) + (+taxPrice)).toFixed(2)}$ `;

            discountCodeInput.value = "";
        }
        else {
            discountCodeInput.value = "";
        }

    })
    syncCartToLocalStorage();
}



function submitOrder() {

    if (cart.length > 0) {
        cart = [];
        localStorage.clear();
        submitButton.style.backgroundColor = "#76FF71";
        placeOrder.innerHTML = "Order submitted";


        setTimeout(function () {
            placeOrder.innerHTML = "Place Order";
            submitButton.style.backgroundColor = "#FFA600";
        }, 4000);

        submitModal.style.display = "flex";

        setTimeout(function () {
            submitModal.style.display = "none";
        }, 4000);

        renderCartBox();
        renderSumProducts();
        renderCountFood();
        renderTotalInModal();
        renderTotalInModal(currentFoodId);
    }

}




