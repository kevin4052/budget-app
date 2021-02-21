const graphql = require('graphql');

const User = require('../models/User.model');
const Bucket = require('../models/Bucket.model');
const Transaction = require('../models/Transaction.model');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    passwordHash: { type: GraphQLString },
    buckets: {
      type: new GraphQLList(bucketType),
      resolve(parent, args) {
        // console.log({ parent });
        return Bucket.find({ _id: { $in: parent.buckets } });
      },
    },
  }),
});

const bucketType = new GraphQLObjectType({
  name: 'Bucket',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
    transactions: {
      type: new GraphQLList(transactionType),
      resolve(parent, args) {
        return Transaction.find({ _id: { $in: parent.transactions } });
      },
    },
  }),
});

const transactionType = new GraphQLObjectType({
  name: 'Transcation',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        // console.log('users was queried');
        return User.find({});
      },
    },
    user: {
      type: userType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        // console.log('user', args.email);
        return User.findOne({ email: args.email });
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: userType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        passwordHash: { type: GraphQLString },
      },
      resolve(parent, args) {
        const { username, email, passwordHash } = args;
        let user = new User({
          username,
          email,
          passwordHash,
        });
        return user.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
