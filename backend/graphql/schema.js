const typeDefs = `#graphql
  type User{
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
  }

`

module.exports = typeDefs