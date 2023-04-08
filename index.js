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
    <div id="order-count${item.id}">0</div>
    <button id="buy-basket${item.id}" class="btn btn-primary">Buy Basket
    </button>
    <button id="delete" class="btn btn-primary">Delete
    </button>
    </div>
                                  
    `;

          //add baskets to DOM
          document.querySelector("#groceries").appendChild(card);

          //add event listener to buy button
          const buyBtn = document.getElementById(`buy-basket${item.id}`);

          //add event listener to buy button and increment orders
          buyBtn.addEventListener("click", (event) => {
            event.preventDefault();
            //console.log("clicked")
            order++;
            console.log(`Orders: ${order}`);
            const orderCount = document.querySelector(`#order-count${item.id}`);
            orderCount.textContent = parseInt(orderCount.textContent) + 1;
            console.log(orderCount);
            addOrders(item.id, orderCount);
          });

          //delete item from DOM and Server
          card.querySelector("#delete").addEventListener("click", () => {
            console.log("test");
            card.remove();

            deleteBasket(item.id);
          });
        });
      });
  }

  let order = 0;
  displayGroceries();
});

const customOrderForm = document.querySelector("#create-form");

function getInputData(event) {
  console.log("getInputData called");
  event.preventDefault(); // Prevent default form submission behavior
  console.log(document.getElementById("product-name").value);

  // Get input data from form
  const addImage = document.getElementById("image-url").value;
  const addName = document.getElementById("product-names").value;
  const addVeges = document.getElementById("vegez").value;
  const addFruit = document.getElementById("fruits").value;
  const addPrice = document.getElementById("prices").value;
  const addDescription = document.getElementById("descriptions").value;

  // Pass order data to the placeOrder function
  placeOrder({
    image: addImage,
    name: addName,
    vegetable: addVeges,
    fruit: addFruit,
    price: addPrice,
    description: addDescription,
  });

  // Reset form
  document.getElementById("image-url").value = " ";
  document.getElementById("product-names").value = " ";
  document.getElementById("vegez").value = "";
  document.getElementById("fruits").value = "";
  document.getElementById("prices").value = "";
  document.getElementById("descriptions").value = "";
}

customOrderForm.addEventListener("submit", getInputData);

//POST METHOD used to add an order through the order form
function placeOrder(order) {
  console.log("order:", order);
  fetch("http://localhost:3000/groceries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(order),
  })
    .then((resp) => resp.json())
    .then((grocery) => console.log(grocery));
}

// Define updateBasket function to edit
function updateBasket(basketObj) {
  fetch(`http://localhost:3000/groceries/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ basketObj }),
  })
    .then((resp) => resp.json())
    .then((grocery) => console.log(grocery));
}

function addOrders(item, orderCount) {
  console.log(item);
  fetch(`http://localhost:3000/groceries/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderCount }),
  })
    .then((resp) => resp.json())
    .then((orderCount) => console.log(orderCount));
}

// Add event listener for each "Update Basket" button
const editBtn = document.querySelectorAll("#edit-button");
editBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    // Retrieve the item ID and form inputs and update basket

    const imageUrl = document.querySelector("#image-url").value;
    const productName = document.querySelector("#product-names").value;
    const vegetables = document.querySelector("#vegez").value;
    const fruits = document.querySelector("#fruits").value;
    const price = document.querySelector("#prices").value;
    const description = document.querySelector("#descriptions").value;

    // Construct the updated basket object
    const basketObj = {
      imageUrl,
      productName,
      vegetables,
      fruits,
      price,
      description,
    };

    updateBasket(basketObj);
  });
});

function deleteBasket(id) {
  fetch(`http://localhost:3000/groceries/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((item) => console.log(item));
}

function searchItems() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const name = card.querySelector("#product-name").textContent.toLowerCase();
    const vegetable = card.querySelector("#veges").textContent.toLowerCase();
    const fruit = card.querySelector("#fruit").textContent.toLowerCase();

    if (
      name.includes(searchValue) ||
      vegetable.includes(searchValue) ||
      fruit.includes(searchValue)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", searchItems);
