require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');

const users = [
  {
    username: 'kevin',
    email: 'kevin@kevin.com',
    passwordHash: 'hasssssssssssh',
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(async (x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    await User.collection.drop();

    User.create(users)
      .then((usersFromDB) => {
        setTimeout(() => {
          mongoose.disconnect();
        }, 2000);
      })
      .catch((err) => console.log({ err }));
  })
  .catch((err) => console.error(`Error connecting to mongo: ${err}`));
