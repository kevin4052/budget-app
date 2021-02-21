const { Schema, model } = require('mongoose');

const transaction = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'username is required'],
    },
    amount: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Bucket', transaction);
