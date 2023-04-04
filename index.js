document.addEventListener("DOMContentLoaded", () => {
  function displayGroceries() {
    fetch("http://localhost:3000/groceries")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        const firstProduct = data[0];

        // console.log(firstProduct)

        // Adds all 4 grocery product items to the left side of the page

        const groceryList = document.createElement("ul");
        groceryList.id = "groceries";
        groceryList.classList.add("groceries-list");
        const grocery = document.getElementById("groceries");

        // add each title to list and add event listener
        groceries.forEach((item) => {
          const list = document.createElement("li");
          list.classList.add("item");
          list.textContent = data.name;
          groceryList.appendChild(li);

          list.addEventListener("click", () => {
            const groceryDetails = `
              <div class="card">
                <img src="${data.image}" class="card-img" alt="${data.name}">
                <div class="card-body">
                  <h5 id="product-name">${data.name}</h5>
                  <p id="veges">${data.vegetables} </p>
                  <p id="fruit">${data.fruit} </p>
                  <p id="description">${data.description} </p>
                  <p id="price"> ${data.price} </p>
                  <div id="buy-basket" class="btn btn-primary">Buy Basket
                  </div>
                </div>
              </div>
            `;
            document.getElementById("details").innerHTML = groceryDetails;
          });
        });
      });
  }

  displayGroceries();
});
