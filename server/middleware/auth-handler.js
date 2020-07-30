const User = require("./../models/user");

const MOCK_USERNAME = "alex";

async function getUser() {
  const user = await User.findOne({ username: MOCK_USERNAME });
  return user;
}

async function addUser(req, res, next) {
  req.user = await getUser();
  next();
}

module.exports = { addUser };
