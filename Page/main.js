let Items = [];
let Cart = [];
fetch("./Page/data.json")
  .then(response => response.json())
  .then(data => {
    Items = data;
    renderProducts();
  });

const productList = document.querySelector(".product-list");

function createProductCard(item){
    const li = document.createElement("li");
    li.classList.add("card");
    const div = document.createElement("div");
    div.classList.add("container_img");
    const main_img = document.createElement("img");
    main_img.classList.add("img_item");
    main_img.src=item.image.desktop;

    const btn_div = document.createElement("div");
    btn_div.classList.add("hidden", "add_item", "add_item_active");
    const increment = document.createElement("button");
    increment.classList.add("increment");
    const increment_img = document.createElement("img");
    increment_img.src = "./assets/images/icon-increment-quantity.svg";
    increment.append(increment_img);
    const decrement = document.createElement("button");
    decrement.classList.add("decrement");
    const decrement_img = document.createElement("img");
    decrement_img.src = "./assets/images/icon-decrement-quantity.svg";
    decrement.append(decrement_img);
    const quantity_for_one = document.createElement("span");
    quantity_for_one.classList.add("quantity_for_one");
    btn_div.append(decrement,quantity_for_one,increment);
    const button = document.createElement("button");
    button.classList.add("add_item");
    const btn_img = document.createElement("img");
    btn_img.classList.add("add_to_cart");
    btn_img.src = "./assets/images/icon-add-to-cart.svg";
    button.append(btn_img, "Add to cart");

    button.addEventListener("click", () => {
        main_img.classList.add("img_item_active");
        button.classList.add("hidden");
        btn_div.classList.remove("hidden");
        const existingItem = Cart.find(cart_item=>cart_item.name===item.name);
        if (!existingItem){
        Cart.push
          ({
          name: item.name,
          price: item.price,
          quantity: 1
          })
          renderCart();
          console.log(item.price.toFixed(2))
          quantity_for_one.textContent = 1;
        ;}
        updateCartUI()
    });
    increment.addEventListener("click",()=>{
      increaseQuantity(item);
    })
    decrement.addEventListener("click",()=>{
      decreaseQuantity(item);
    })
    function increaseQuantity(item){
const existingItem = Cart.find(cart_item=>cart_item.name===item.name);
        if (existingItem){
          existingItem.quantity++;
        }
        quantity_for_one.textContent = existingItem.quantity;
        updateCartUI();
        renderCart();
    }
    function decreaseQuantity(item){
const existingItem = Cart.find(cart_item=>cart_item.name===item.name);
        if (existingItem.quantity>1){
          existingItem.quantity--;
        }
        else{
          main_img.classList.remove("img_item_active");
          button.classList.remove("hidden");
          btn_div.classList.add("hidden");
          Cart=Cart.filter(cart_item=>cart_item.name!==item.name);
          };
        quantity_for_one.textContent = existingItem.quantity;
        updateCartUI();
        renderCart();


      }
    div.append(main_img, btn_div, button);
    const category = document.createElement("span");
    category.classList.add("type");
    category.textContent = item.category;
    const third_header = document.createElement("h3");
    third_header.textContent = item.name;
    const price_for_one = document.createElement("span");
    price_for_one.classList.add("price");
    price_for_one.textContent = item.price.toFixed(2);/* .toFixed(2) делает числа аля 7.00 вместо 7 */
    li.append(div,category, third_header, price_for_one);
    return li;
}
function renderCart() {
  const Basket = document.querySelector(".basket");
  Basket.innerHTML = ""
  Cart.forEach(item => {
  const basketItem = document.createElement("div");
  basketItem.classList.add("item");
  const itemName = document.createElement("span");
  itemName.classList.add("name_item");
  itemName.textContent=item.name;
  
  const orderLeft = document.createElement("div");
  orderLeft.classList.add("order_left");

  const bottom = document.createElement("div");
  bottom.classList.add("bottom_item")
  const itemQuantity = document.createElement("span");
  itemQuantity.classList.add("quantity");
  itemQuantity.textContent=item.quantity;
  const itemPrice1 = document.createElement("span");
  itemPrice1.classList.add("price_for_one");
  itemPrice1.textContent=item.price.toFixed(2);
  const itemPriceAll = document.createElement("span");
  itemPriceAll.classList.add("price_for_all");
  const summ_one_item=(item.price * item.quantity);
  console.log(summ_one_item.toFixed(2));
  itemPriceAll.textContent=summ_one_item.toFixed(2);

  bottom.append(itemQuantity,itemPrice1,itemPriceAll)
  orderLeft.append(itemName,bottom);

  const eraseBtn = document.createElement("button");
  eraseBtn.classList.add("erase_item");
  const eraseBtn_img = document.createElement("img");
  eraseBtn_img.src = "./assets/images/icon-remove-item.svg";
  eraseBtn.append(eraseBtn_img);
  eraseBtn.addEventListener("click",()=>{
    Cart=Cart.filter(cart_item=>cart_item.name!==item.name);
    
    renderCart();
    updateCartUI();
  })
  const hr = document.createElement("hr");
  basketItem.append(orderLeft,eraseBtn,hr);
  Basket.append(basketItem);
  });
  
  console.log(Cart);

}
function updateCartUI(){
  const quantity_all=document.querySelector("#quantity_all");
  const totalQuantity = Cart.reduce(
    (sum, item) => sum + item.quantity, 0);
  quantity_all.textContent=totalQuantity;
  const confirmOrder = document.querySelector("#confirmOrder");
  const noItemBasket = document.querySelector("#noItemBasket");
  if (Cart.length===0){
    confirmOrder.classList.add("hidden");
    noItemBasket.classList.remove("hidden");
    
  }
  else{
    confirmOrder.classList.remove("hidden");
    noItemBasket.classList.add("hidden");
  }
  const final_price=document.querySelector(".final_price");
  const fPrice = Cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0);
  final_price.textContent=fPrice.toFixed(2);
}

function renderProducts() {
  Items.forEach(item => {
    const card = createProductCard(item);
    productList.append(card);
  });
}