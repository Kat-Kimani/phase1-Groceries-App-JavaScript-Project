# phase1-groceries-project

Weekly Grocery Shopping Site

Grocery Shopping List App
This is a simple web application that allows users to view a list of grocery products and order them by adding to a cart. Users can also add their own custom products to the list.

Technologies Used
HTML
CSS
JavaScript
JSON DB

Getting Started
To run the application, follow these steps:

Clone the repository to your local machine.
Navigate to the project directory.
Start the server using json-server --watch db.json

Open the application in your web browser by navigating to http://localhost:3000.
Features
View a list of grocery products.
Add grocery products to a cart.
Delete grocery products from the list.
Add custom grocery products to the list.

displayGroceries(): This function retrieves grocery data from a local server using the Fetch API, creates an HTML card element for each grocery item, and adds the cards to the DOM. It also adds event listeners to the "Buy Basket" and "Delete" buttons on each card.

getInputData(event): This function is called when the user submits the custom order form. It retrieves input data from the form fields, constructs an object with the data, and passes the object to the placeOrder() function.

placeOrder(order): This function makes a POST request to the local server with the custom order data, and logs the response to the console.

updateBasket(basketObj): This function is called when the user clicks the "Update Basket" button on a grocery item card. It makes a PUT request to the server with updated data for the item, and logs the response to the console.

addOrders(item, orderCount): This function is called when the user clicks the "Buy Basket" button on a grocery item card. It makes a PATCH request to the server with updated order count data for the item, and logs the response to the console.

editBtn.forEach((btn) => {...}): This code adds event listeners to each "Update Basket" button on the grocery item cards. When a button is clicked, it retrieves the updated data from the corresponding form inputs and passes the data to the updateBasket() function.

Contributions are welcome! To contribute, follow these steps:

License
This project is licensed under the GIT License. See the LICENSE file for more information.
