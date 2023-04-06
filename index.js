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
    <div id="order-count">0</div>
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
            document.querySelector("#order-count").textContent = order;
          });
        });
      });

    const customOrderForm = document.querySelector("form");

    function getInputData(event) {
      // Prevent default form submission behavior
      event.preventDefault();
      // Get input data from form
      let name = document.getElementById("name").value;
      let order = document.getElementById("textBox").value;

      // Reset form
      document.getElementById("name").value = "";
      document.getElementById("textBox").value = "";

      // Pass order data to the placeOrder function
      placeOrder({ name: name, order: order });
    }

    customOrderForm.addEventListener("submit", getInputData);

    //POST METHOD used to add an order through the order form
    function placeOrder(order) {
      fetch("http://localhost:3000/groceries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((resp) => resp.json())
        .then((groceries) => console.log(groceries));
    }
  }

  let order = 0;
  displayGroceries();
});
