require(`dotenv`).config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const cors = require('cors');

const app = express();

// require database config
require('./configs/db.config');

// middleware setup

// --------use cors--------
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_POINT],
//     credentials: true,
//   })
// );

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;
