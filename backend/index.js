const express = require('express')
const cors = require('cors')
const {ApolloServer} = require('@apollo/server')
const typeDefs = require('./graphql/schema');
const userResolvers = require('./resolvers/userResolver');
const itemsResolvers = require('./resolvers/itemResolver')
const orderResolvers = require('./resolvers/orderResolver')
const {startStandaloneServer} = require('@apollo/server/standalone')
// const User = require('./models/user.model')

var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://subham235:subham1234@cluster0.wuy84.mongodb.net/o2oassignment?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const resolvers = {
    Query: {
      ...userResolvers.Query,
      ...itemsResolvers.Query,
      ...orderResolvers.Query
      // Add other Query resolvers as needed
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...itemsResolvers.Mutation,
      ...orderResolvers.Mutation
      // Add other Mutation resolvers as needed
    },
  };



async function startApp(){
    const server = new ApolloServer({
        typeDefs , 
        resolvers
    })
    
    const {url} = await startStandaloneServer(server , {
        listen: {port: 5000}
    })
    
    console.log('listening at port ' + url);


}

startApp();



