
# Assignment (Node+graphQL+ Apollo Server , React + Apollo Client)

This backend serves as the foundation for an e-commerce platform with inventory management. It provides GraphQL APIs for both buyers and sellers, utilizing MongoDB as the database and Node.js with Apollo Server for the server implementation.

## Currently only signup, fetch items and Order items apis are exposed to the client applications, for using other apis or CRUD inventory apis use the apollo playground. 


## Project setup

server: 
1. npm install
2. npm start
3. go to localhost:5000
4. Run the queries or apis in the Apollo Playground

client:
1. npm install
2. npm run dev
3. signup or create a new account
4. Buy an item from the table



# APIs
## Buyer Side

Fetch All Items:

Fetch all available items (available in the client app).

query GetAllItems {
  getAllItems 

    id,
    itemName,
    itemDescription,
    price,
    totalStocks 
  }
}

Signup:

Create a new user account.

Mutation:
mutation Signup($user: SignUpInput!) {
  signup(user: $user) {

    token,
    user {
      id
      name,
      email,
    }

  }
}

Variables: 
{
  "user": {

    "name":"Mahanty",
    "email": "mahanty@hhh.eo",
    "password": "subham"
  }
}

Buy Item:

Purchase an item and add it to the user's order history (Also available in the client app).

Mutation:

mutation OrderItem($order: OrderItemInput!) {
  orderItem(order: $order) {

    user {
      email
    }
    item {
      itemName
    } 
  }
}

Variables: (Id of variables might be different)

{
  "order": {

    "userId": "65be1a2c2454adb36ca4a40f",
    "itemId":"65be2d32324aab98ac3b849b"
  }
}

Seller Side
Manage Inventory:

Perform CRUD operations on inventory.

Queries:

Fetch All Inventory:

query GetAllItems {
  getAllItems {

    id,
    itemName,
    itemDescription,
    price,
    totalStocks  ,
    totalsales
  }
}

Fetch Single Item:

Query:
query GetSingleItem($getSingleItemId: String!) {
  getSingleItem(id: $getSingleItemId) {

    itemName,
    itemDescription,
    price,
    totalStocks
  }
}

Variable:
{

  "getSingleItemId": "65be2bc6a9439e35f5696f1d" //itemId might be different
}

Add a new Item:

Mutation:
mutation AddItem($item: ItemInput!) {

  addItem(item: $item) {

    id,
    itemDescription,
    itemName
  }
}

Variables:
{
  "item": {

    "itemName":"Blue Jeans",
    "itemDescription":"Blue Jeans with slim fit",
    "price":699,
    "totalStocks":10,
  }
}

Update all orders:

mutation UpdateItem($item: ItemInput!) {
  updateItem(item: $item) {
    itemDescription
    itemName
    totalStocks
    price
  }
}

variables: (Id of variables might be different)

{
  "item": {
    "id": "65be2bc6ae35f5696f1d",
    "itemDescription": "Black and blue Shirt",
    "itemName": "Shirt"
  }
}

##  Get All Orders

query GetAllOrders {
  getAllOrders {

  user {
    name,
    email
  }  
  item {
    itemName,
    price,
    totalsales,
    totalStocks
  }
  }
}

## Get all orders of a user
query GetUsersOrders($userId: String) {

  getUsersOrders(userId: $userId) {

  user {
    name,email
  }  
  item {
    itemName,
    price
  }
  }
}

variables: (Id of variables might be different)
{
  "userId": "65be1a2c2454adb36ca4a40f"
}


























