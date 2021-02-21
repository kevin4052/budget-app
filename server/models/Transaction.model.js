const { Schema, model } = require('mongoose');

const transactionSchema = new Schema(
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

module.exports = model('Transaction', transactionSchema);
