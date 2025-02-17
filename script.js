let AllItems = [];
let CartItems = [];
AllItems.push(["Дерево", "223"]);
AllItems.push(["Кирпичи", "8"]);
AllItems.push(["Ліноліум", "80"]);
AllItems.push(["Труба", "108"]);
AllItems.push(["Кран", "157"]);
AllItems.push(["Шпалери", "45"]);


function CreateCartItem(element, count){
    let cart = document.getElementById("MagCartGrid");
    if (cart){
        console.log("Avaliable");
    }
    let div = document.createElement("div");
    let Name = document.createElement("h1");
    let Cost = document.createElement("p");
    let Count = document.createElement("p");
    let Button = document.createElement("button");
    let BuyButton = document.createElement("button");
    Name.textContent = element[0];
    Cost.textContent = element[1] + " грн за шт.";
    Button.textContent = "Delete one"
    BuyButton.textContent = "Buy"
    Count.textContent = count;
    Button.onclick = function(){
        AllItems.forEach((elementa, i) => {
            if (elementa[0] == element[0]){
                CartItems[i]--;
                ReloadCart();
            }
        });
    };
    BuyButton.onclick = function(){
        soldLog = document.getElementById("soldLog");
        count = this.parentElement.querySelector("#count").textContent;
        PName = this.parentElement.id;
        cost = 0;
        AllItems.forEach((elementa, i) => {
            if (elementa[0] == PName){
                cost = element[1];
            }
        });
        
        let log = document.createElement("p");
        log.textContent+=`Куплено ${count} шт. ${PName} за ${cost * count} грн`;
        soldLog.prepend(log);
        AllItems.forEach((elementa, i) => {
            if (elementa[0] == element[0]){
                CartItems[i] = 0;
                ReloadCart();
            }
        });
    }
    div.className = "MagCartItem";
    div.appendChild(Name);
    div.appendChild(Cost);
    div.appendChild(Count);
    div.appendChild(Button);
    div.appendChild(BuyButton);
    div.id = element[0];
    Count.id = "count";
    cart.appendChild(div);
}

function ReloadCart(){
    console.log("c1");
    let cart = document.getElementById("MagCartGrid");
    CartItems.forEach((val, i) => {
        console.log("aboba " + val);
        console.log("c2");
        let Item = cart.querySelector(`#${AllItems[i][0]}`);
        console.log(AllItems[i][0]);
        if (val > 0){
            if (Item == null){
                CreateCartItem(AllItems[i], CartItems[i]);
                console.log("c3");
            } else {
                counter = Item.querySelector("#count");
                counter.textContent = CartItems[i];
                console.log("c4");
            }
        } else {
            if (Item != null){
                Item.remove();
                console.log("c5");
            }
            console.log("c51");
        }
    });
}


let AddToCart = function(){
    console.log(this.value);
    let i = this.value;
    if (CartItems[i] == null){
        CartItems[i] = 0;
    }
    CartItems[i]++;
    ReloadCart();
}

onload = function() {
    AllItems.forEach((element, i) => {
        let grid = this.document.getElementById("MagGrid");
        let div = this.document.createElement("div");
        let Name = this.document.createElement("h1");
        let Cost = this.document.createElement("p");
        //let Debug = this.document.createElement("p");
        let Button = this.document.createElement("button");
        Name.textContent = element[0];
        Cost.textContent = element[1] + " грн за шт.";
        //Debug.textContent = i;
        Button.textContent = "Add to Cart"
        Button.value = i;
        Button.onclick = AddToCart;
        div.className = "MagItem";
        //div.appendChild(Debug);
        div.appendChild(Name);
        div.appendChild(Cost);
        div.appendChild(Button);
        div.id = element[0];
        grid.appendChild(div);
    });
    //let search = document.getElementById("search");
    /*search.addEventListener("input", (event) => {
        let val = event.target.value.toLowerCase();

        Array.from(document.getElementsByClassName("MagCartItem")).forEach(element => {
            let itemName = element.id.toLowerCase();

            if (val === "" || itemName.includes(val)) {
                element.hidden = false;
            } else {
                element.hidden = true;
            }
        });
    });*/
}