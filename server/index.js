require(`dotenv`).config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const cors = require('cors');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const app = express();

// require database config
// require('./configs/db.config');

// middleware setup

// --------use cors--------
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_POINT],
//     credentials: true,
//   })
// );

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {},
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;
