require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const time = require('../../helpers/time');

const userSchema = mongoose.Schema({
  isDeleted: {
    type: Boolean,
    required: true,
    unique: false,
    trim: false,
    default: false
  },
  firstName: {
    type: String,
    required: [true, 'Please Include your name']
  },
  lastName: {
    type: String
  },
  contact: {
    phone: {
      type: String
    }
  },
  email: {
    type: String,
    required: [true, 'Please Include your email'],
    unique: false
  },
  password: {
    type: String,
    required: [true, 'Please Include your password']
  },
  company: {
    type: String
  },
  lastLogin: {
    type: String
  },
  roles: [
    {
      role: {
        type: String
      }
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true
      },
      createdAt: {
        type: String
      },
      lastUsed: {
        type: String
      }
    }
  ]
});

//this method will hash the password before saving the user model
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 15);
  }
  next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function () {

  const user = this;
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email },
    process.env.ACCESS_TOKEN_SECRET);
  user.tokens = user.tokens.concat({
    token: token,
    createdAt: time.now(),
    lastUsed: time.now()
  });
  await user.save();
  return token;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await users.findOne({ email });

  if (!user) {
    console.log('no user');
    return false
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log(password, user.password);

  if (!isPasswordMatch) {
    console.log('invalid login details');

    throw new Error({ error: 'Invalid login details' });
  }
  return user;
};

const users = mongoose.model('users', userSchema);

module.exports = users;
