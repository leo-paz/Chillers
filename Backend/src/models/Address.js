var mongoose = require('mongoose')


const Address = new mongoose.Schema({
  name: String,
  city: String,
  province: String,
  country: String,
  postalCode: String,
});

module.exports = Address;
