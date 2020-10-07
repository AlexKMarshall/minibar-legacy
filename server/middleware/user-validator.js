const User = require("../models/user");

const nullUser = {
  username: "null",
  favDrinks: [],
  savedIngredients: [],
};

async function createUser(username) {
  const user = new User({ username });
  await user.save();
  return user;
}

async function getUser(username) {
  const user = await User.findOne({ username });
  return user;
}

async function appendUser(req, res, next) {
  if (!req.auth) {
    req.user = nullUser;
    next();
  } else {
    const username = req.auth.sub;
    const maybeUser = await getUser(username);
    const user = maybeUser || (await createUser(username));
    req.user = user;
    next();
  }
}

module.exports = { appendUser };
