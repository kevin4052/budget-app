require(`dotenv`).config();
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

const typeDefs = gql`
  type Query {
    sayHi: String
    getUser: String
  }
`;

const resolvers = {
  Query: {
    sayHi: () => `Hello World`,
    getUser: () => `getting user`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphql: true,
  })
);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on Port 5000`);
});
