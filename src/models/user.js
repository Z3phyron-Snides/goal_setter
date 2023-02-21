const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash and salt the password before saving the user document
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash and salt the password only if it has been modified or is new
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt with 10 rounds of hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hash = await bcrypt.hash(user.password, salt);
    // Set the hashed password as the new password
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare a plain-text password with the hashed and salted password stored in the database
userSchema.methods.comparePassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (error) {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
