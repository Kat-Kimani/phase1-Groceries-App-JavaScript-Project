document.addEventListener("DOMContentLoaded", () => {
  // Adds all 4 grocery product items to the left side of the page
  const groceryList = document.createElement("ul");
  groceryList.id = "groceries";
  groceryList.classList.add("groceries-list");

  function displayGroceries() {
    fetch("http://localhost:3000/groceries")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        const groceries = data;
        const grocery = document.getElementById("groceries");
        //adding some code here

        let card = document.createElement("li");
        card.className = "card";
        card.innerHTML = `
  <img src="${groceries.image}" class="card-img" alt="${groceries.name}">
  <div class="card-body">
  <h4 id="product-name">${groceries.name}</h4>
  <p id="veges"> Veges: ${groceries.vegetable} </p>
  <p id="fruit"> Fruit: ${groceries.fruit} </p>
   <p id="description">${groceries.description} </p>
  <p id="price"> Price: ${groceries.price} </p>
  <button id="buy-basket${groceries.id}" class="btn btn-primary">Buy Basket
  </button>
  </div>
                                
  `;
        //add baskets to DOM
        document.querySelector("#groceries").appendChild(card);

        //add event listener to buy button
        const buyBtn = document.getElementById(`buy-basket${groceries.id}`);

        //add event listener to buy button
        buyBtn.addEventListener("click", (event) => {
          event.preventDefault();
          //console.log("clicked")
          order++;
          console.log(`Orders: ${order}`);
        });
      });
  }
  let order = 0;
  displayGroceries();
});
