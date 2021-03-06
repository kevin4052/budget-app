const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
    },
    buckets: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Bucket' }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
