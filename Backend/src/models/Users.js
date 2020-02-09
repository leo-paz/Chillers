const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Address = require('./Address');
// const packageSchema = require ('./Packages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  packages: {
    type: Array
  },
  // packages: packageSchema,
  friends: {
    type: Array
  },
  userId: {
    type: String
  },
  address: Address,
  isChiller: {
    type: Boolean
  }
});

// add pre-save Hook
userSchema.pre("save", function(next) {
  const user = this; // Using funciton here because this refers to user object

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
}

mongoose.model("User", userSchema);
