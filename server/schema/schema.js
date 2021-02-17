const graphql = require('graphql');
const User = require('../models/User.model');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: GraphQLString,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return User.findById(args.id);
        console.log('user was queried');
        return User.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
