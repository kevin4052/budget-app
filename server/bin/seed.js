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

require('../configs/db.config');

User.collection.drop();

User.create(users)
  .then((usersFromDB) => {
    setTimeout(() => {
      mongoose.disconnect();
    }, 2000);
  })
  .catch((err) => console.log({ err }));
