const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const router = express.Router();

router.post('/tt', async (req, res) => {
  return  res.send('TEST') ;
});

router.get('/tt', async (req, res) => {
  return res.send('TEkjh;khkjhST');
})

router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  console.log('Username: ', username);
  try {
    const user = new User({ email, password, username });
    await user.save();

    console.log('userSaved');
    const token = jwt.sign({ userId: user._id }, "MY_SECRETE_KEY");
    res.send({ token });
  } catch (err) {
     return res.status(422).send( 'error: ' + err.messsage);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ erro: "Email not found" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id}, 'MY_SECRETE_KEY');

    res.send({ token });
  }
  catch(err) {
    return res.status(422).send({ error: 'Invalid password or email'});
  }
});

module.exports = router;
