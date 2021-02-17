const graphql = require('graphql');
const User = require('../models/User.model');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    passwordHash: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        console.log('users was queried');
        return User.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
