
const {ApolloServer} = require('@apollo/server')
const typeDefs = require('./graphql/schema');
const userResolvers = require('./resolvers/userResolver');
const itemsResolvers = require('./resolvers/itemResolver')
const orderResolvers = require('./resolvers/orderResolver')
const {startStandaloneServer} = require('@apollo/server/standalone')
// const User = require('./models/user.model')

var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://dev098:dev098@youtubeclone.lhvkqpv.mongodb.net/o2oassignment?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const resolvers = {
    Query: {
      ...userResolvers.Query,
      ...itemsResolvers.Query,
      ...orderResolvers.Query

    },
    Mutation: {
      ...userResolvers.Mutation,
      ...itemsResolvers.Mutation,
      ...orderResolvers.Mutation
     
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



