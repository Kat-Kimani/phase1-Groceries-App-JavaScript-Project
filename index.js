document.addEventListener("DOMContentLoaded", () => {
  // Adds all 4 grocery product items to the left side of the page
  const groceryList = document.createElement("ul");
  groceryList.id = "groceries";
  groceryList.classList.add("groceries-list");

  function displayGroceries() {
    fetch("http://localhost:3000/groceries")
      .then((res) => res.json())
      .then((groceries) => {
        groceries.forEach((item) => {
          // console.log(data)

          //adding some code here

          let card = document.createElement("li");
          card.className = "card";
          card.innerHTML = `
    <img src="${item.image}" class="card-img" alt="${item.name}">
    <div class="card-body">
    <h4 id="product-name">${item.name}</h4>
    <p id="veges"> Veges: ${item.vegetable} </p>
    <p id="fruit"> Fruit: ${item.fruit} </p>
     <p id="description">${item.description} </p>
    <p id="price"> Price: ${item.price} </p>
    <button id="buy-basket${item.id}" class="btn btn-primary">Buy Basket
    </button>
    </div>
                                  
    `;
          //add baskets to DOM
          document.querySelector("#groceries").appendChild(card);

          //add event listener to buy button
          const buyBtn = document.getElementById(`buy-basket${item.id}`);

          //add event listener to buy button
          buyBtn.addEventListener("click", (event) => {
            event.preventDefault();
            //console.log("clicked")
            order++;
            console.log(`Orders: ${order}`);
          });
        });
      });
  }
  let order = 0;
  displayGroceries();
});
