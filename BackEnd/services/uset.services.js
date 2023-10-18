const User = require("../models/๊user.models");

async function registerUser(email, password) {
  try {
    const user = new User({ email, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function checkUser(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, checkUser };
