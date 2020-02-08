const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer a;lskdjf;alskdfj;aslkdfj'

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, 'MY_SECRETE_KEY', async (err, payload) => {
    // if there was error parsing jwt
    if (err) {
      return res.status(401).status({ error: "You must be logged in." });
    }

    const { userId } = payload;
    const user = await User.findById(userId);

    req.user = user;
    next();
  });
};
