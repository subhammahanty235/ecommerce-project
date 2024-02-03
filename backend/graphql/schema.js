const typeDefs = `#graphql
  type User{
    id:String,
    name:String!,
    email:String!,
    password:String!
  },
  type Query{
    getUser: [User],
    getSingleUser(email: String!): User

  },
  type AuthResponse{
    token:String,
    user:User,
  },
  type Mutation{
    signup(user: SignUpInput!): AuthResponse
  },
  input SignUpInput{
    name:String!,
    email:String!,
    password:String!
  },

  # for items
  type Item{
    id:String,
    itemName:String,
    itemDescription:String,
    price:Int,
    totalsales:Int,
    totalStocks:Int,
  },
  type Query{
    getAllItems: [Item]
    getSingleItem(id:String!):Item, 
  },

  type Mutation{
    addItem(item:ItemInput!):Item,
    updateItem(item:ItemInput!):Item,
    deleteItem(itemId:String):Item,
  },

  input ItemInput{
    id:String,
    itemName:String,
    itemDescription:String,
    price:Int,
    totalStocks:Int,
  },

  # for Order
  type Order{
    item:Item,
    user:User,
    orderDate:String,
    orderStatus:Int,
  },

  type Query{
    getAllOrders: [Order],
    getUsersOrders(userId:String):[Order],
  },
  type Mutation{
    orderItem(order: OrderItemInput!):Order,
    changeOrderStatus(orderId:String!):Order,

  },

  input OrderItemInput{
    userId:String!,
    itemId:String,
  }

`







module.exports = typeDefs