require(`dotenv`).config();
const { ApolloServer } = require(`apollo-server`);
const gql = require(`graphql-tag`);

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

server.listen(process.env.PORT || 5000).then((res) => {
  console.log(`Server listening on Port ${res.url}`);
});
