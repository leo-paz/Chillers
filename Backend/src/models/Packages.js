const mongoose = require("mongoose");
const Address = require('./Address');

// const Address = new mongoose.Schema({
//   name: String,
//   city: String,
//   province: String,
//   country: String,
//   postalCode: String,
// });

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  status: {
    type: String
  },
  weight: {
    type: Number
  },
  recepient: {
    type: String,
    require: true
  },
  possibleDestinations: {
    type: Array,
  },
  currentLocation: Address,
  destinationAddress: Address
});

mongoose.model("Package", packageSchema);

// module.exports = packageSchema;
