document.addEventListener("DOMContentLoaded", () => {
  // Adds all 4 grocery product items to the left side of the page
  const groceryList = document.createElement("ul");
  groceryList.id = "groceries";
  groceryList.classList.add("groceries-list");
  const grocery = document.getElementById("groceries");

  function displayGroceries() {
    fetch("http://localhost:3000/groceries")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        const groceries = data; // Rename `data` to `groceries` for clarity
        const firstProduct = groceries[0];
        // console.log(firstProduct)

        //add each title to list and add event listener
        groceries.forEach((groceries) => {
          const list = document.createElement("li");
          list.classList.add("groceries");
          list.textContent = groceries.name;
          groceryList.appendChild(list);

          list.addEventListener("click", () => {
            const groceryDetails = `
              <div class="card">
                <img src="${groceries.image}" class="card-img" alt="${groceries.name}">
                <div class="card-body">
                  <h4 id="product-name">${groceries.name}</h4>
                  <p id="veges"> Veges: ${groceries.vegetable} </p>
                  <p id="fruit"> Fruit: ${groceries.fruit} </p>
                  <p id="description">${groceries.description} </p>
                  <p id="price"> Price: ${groceries.price} </p>
                  <div id="buy-basket" class="btn btn-primary">Buy Basket
                  </div>
                </div>
              </div>
            `;
            document.getElementById("details").innerHTML = groceryDetails;

            //matata
            //add event listener for each grocery basket we have for sale once it is clicked
            document.querySelectorAll(".card").forEach((div) => {
              div.addEventListener("click", (e) => {
                let target = e.target.parentNode;
                if (target.childNodes.length < 2) {
                  let grocery1 = groceries.find(
                    (item) =>
                      item.name ===
                      target.querySelector("#product-name").textContent
                  );

                  let innercard = `
                      <div class="card">
                      <img src="${grocery1.image}" class="card-img" alt="${grocery1.name}">
                      <div class="card-body">
                        <h4 id="product-name">${grocery1.name}</h4>
                        <p id="veges">${grocery1.vegetable} </p>
                        <p id="fruit">${grocery1.fruit} </p>
                        <p id="description">${grocery1.description} </p>
                        <p id="price"> ${grocery1.price} </p>
                        <div id="buy-basket" class="btn btn-primary">Buy Basket
                        </div>
                      </div>
                    </div>
                  `;
                  target.innerHTML = innercard;
                } else {
                  target.innerHTML = " ";
                }
              });
            });
          });
        });
        grocery.appendChild(groceryList);
      });
  }

  displayGroceries();
});
