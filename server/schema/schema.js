const graphql = require('graphql');

const User = require('../models/User.model');
const Bucket = require('../models/Bucket.model');
const Transaction = require('../models/Transaction.model');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
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
    buckets: {
      type: new GraphQLList(bucketType),
      resolve(parent, args) {
        // console.log('users was queried');
        return Bucket.find({});
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
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        passwordHash: { type: new GraphQLNonNull(GraphQLString) },
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
    addBucket: {
      type: bucketType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, amount, userID } = args;
        // let bucket = new Bucket({ name, amount });
        // return bucket.save();

        let bucket = { name, amount };
        return Bucket.create(bucket)
          .then((bucketFromDB) => {
            User.findByIdAndUpdate(
              userID,
              { $addToSet: { buckets: bucketFromDB._id } },
              { new: true }
            )
              .then(() => bucketFromDB)
              .catch((err) => console.log({ err }));
          })
          .catch((err) => console.log({ err }));
      },
    },
    addTransaction: {
      type: transactionType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        bucketID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, amount, bucketID } = args;
        // let bucket = new Bucket({ name, amount });
        // return bucket.save();

        let transaction = { name, amount };
        return Transaction.create(transaction)
          .then((transactionFromDB) => {
            Bucket.findByIdAndUpdate(
              bucketID,
              { $addToSet: { transactions: transactionFromDB._id } },
              { new: true }
            )
              .then(() => transactionFromDB)
              .catch((err) => console.log({ err }));
          })
          .catch((err) => console.log({ err }));
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
