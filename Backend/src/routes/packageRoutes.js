const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const router = express.Router();

const Packages = {};

router.post("/tt", async (req, res) => {
  return res.send("TEST");
});

router.get("/packages", (req, res) => {
  // do somework to get they pacakges
  const { userId } = req.body;

  // const packages = Packages.getByUserId(userId);

  // return res.send({packages: packages})

  return res.send({
    packages: [
      {
        name: "name",
        weight: "1234lbs",
        address: {
          streetName: "lane",
          number: 45,
          latitude: 456,
          longitude: 123
        },
      }
    ]
  });
});

module.exports = router;
