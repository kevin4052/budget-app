const { Schema, model } = require('mongoose');

const bucketSchema = new Schema(
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
    transactions: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Bucket', bucketSchema);
