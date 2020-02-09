const express = require("express");
const request = require("request");

// var dbFunctions = require("../../../db/index");

const mongoose = require("mongoose");

require("../models/Packages");
const Package = mongoose.model("Package");
const User = mongoose.model("User");

const router = express.Router();
// let userID = "02";
// let packageID = "pack1";
// let friend = "Andrew";

router.post(`/`, async (req, res) => {
  return res.send("Welcome to PackageHub");
});

/*
  creates new routes
*/

const getShippingAddress = () => {
  return {
    name: "Amazon Depot",
    city: "Edmonton",
    province: "Alberta",
    country: "Canada",
    postalCode: "0j1 332"
  };
};

const clientHelper = {
  make_API_call: function(url) {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, body) => {
        if (err) reject(err);
        resolve(body);
      });
    });
  }
};

const getUserDestinations = async (user, packgeLocation) => {
  const friend = await User.findOne({ userId: user.friends[0] });
  // const user = await User.findOne({ email });

  let addresses = [];
  addresses.push(user.address);
  addresses.push(friend.address);

  console.log(user.userId);

  const url = `https://uottawahack3.appspot.com/nearest_chiller/${user.userId}/`;
  const res = await clientHelper.make_API_call(url);
  const url2 = `https://uottawahack3.appspot.com/find_lon_lat/${res.id}/`;
  const res2 = await clientHelper.make_API_call(url2);
  addresses.push({ ...res, res2 });

  return addresses;
};
// create New Package
router.post("/addPackage", async (req, res) => {
  const { recepient, name, weight, packageLocation } = req.body;
  const user = await User.findOne({ userId: recepient }, (err, docs) => {});
  console.log(user.userId);
  if (!user) {
    return res.send({ user });
  }

  const status = "Transit";
  currentLocation = getShippingAddress();
  possibleDestinations = await getUserDestinations(user, packageLocation);
  const destinationAddress = possibleDestinations[0];
  const package = new Package({
    name,
    status,
    weight,
    possibleDestinations,
    currentLocation,
    recepient,
    destinationAddress
  });

  await package.save();
  user.packages.push(package);
  user.save();
  res.send({ package });
});

router.post("/getUserData", async (req, res) => {
  const { userId } = req.body;
  const user = await User.findOne({ userId: userId });
  const packages = await Package.find({ recepient: userId });

  return res.send({ user, packages });
});
// updateLocation
router.post(`/packages/updateLocation/`, (req, res) => {
  const { name } = req.body;
  const package = new Package.findOneAndDelete({ recepientId: packageId });

  packageId;
});

router.post("/updatePackageLocation", async (req, res) => {
  const { name, reason, newLocation } = req.body;
  const package = await Package.find({ name: name });
  // console.log(package);
  // const posDest = [...package.possibleDestinations];
  const posDest = [];
  console.log(package);
  // for (var i = 0; i < package.possibleDestinations.length; i++) {
  //   posDest.push(package.possibleDestinations[i]);
  // }
  // res.send({ posDest });

  // package.currentLocation;
  if (reason === "country") {
    package.currentLocation.country = newLocation;
  } else if (reason === "province") {
    package.currentLocation.province = newLocation;
  } else {
    package.currentLocation.city = newLocation;
  }
  package.save;


  // let newDest = [];

  // for (let i = 0; i < posDest.length; i++) {
  //   if (!posDest[i].city) continue;

  //   if (reason === "country") {
  //     if (posDest[i].country === newLocation) {
  //       newDest.push(posDest[i]);
  //     }
  //   } else if (reason === "province") {
  //     if (posDest[i].province === newLocation) {
  //       newDest.push(posDest[i]);
  //     }
  //   } else {
  //     if (posDest[i].city === newLocation) {
  //       newDest.push(posDest[i]);
  //     }
  //   }
  // }

  return res.send({ package });
  // package.possibleDestinations;
});
// router.get(`/packages/${packageID}/`, async (req, res) => {
//   // let packages = await dbFunctions.getPackageById(`${packageID}`);
//   packageName
//   console.log(packages);
//   return res.send({ packages: packages });
// });

// router.post(`/packages/${packageID}/`, async (req, res) => {});

// router.get(`/user/${userID}`, async (req, res) => {
//   // let users = await dbFunctions.getUserByName(`${userID}`);
//   return res.send({ users: users });
// });

// router.get(`/user/${userID}/chiller`, async (req, res) => {
//   // await dbFunctions.setChiller(`${userID}`);
//   return res.send();
// });

// router.get(`/user/${userID}/notChiller`, async (req, res) => {
//   // await dbFunctions.setNotChiller(`${userID}`);
//   return res.send();
// });

// router.get(`/packages/${packageID}/delivered`, async (req, res) => {
//   // await dbFunctions.packageDelivered(`${packageID}`);
//   return res.send();
// });

// router.get(`/packages/${packageID}/atChillers`, async (req, res) => {
//   // await dbFunctions.packageAtChillers(`${packageID}`);
//   return res.send();
// });

// router.get(`/user/${userID}/addPack/${packageID}`, async (req, res) => {
//   // await dbFunctions.addPackagetoProfile(`${userID}`, `${packageID}`);
//   return res.send();
// });

// router.get(`/user/${userID}/removePack/${packageID}`, async (req, res) => {
//   // await dbFunctions.removePackageFromProfile(`${userID}`, `${packageID}`);
//   return res.send();
// });

// router.get(`/user/${userID}/packages`, async (req, res) => {
//   let packages = await dbFunctions.getPackagesFromProfile(`${userID}`);
//   if (packages.length === 0) {
//     return res.send("No packages");
//   } else {
//     var i;
//     for (i = 0; i < packages.length; i++) {
//       console.log(await dbFunctions.getPackageById(packages[i]));
//       // await dbFunctions.getPackageById(packages[i]);
//     }
//     return res.send({ packages });
//   }
// });

// router.get(`/user/${userID}/addFriend/${friend}`, async (req, res) => {
//   // await dbFunctions.addFriend(`${userID}`, `${friend}`);
//   return res.send();
// });

// router.get(`/user/${userID}/removeFriend/${friend}`, async (req, res) => {
//   // await dbFunctions.removeFriend(`${userID}`, `${friend}`);
//   return res.send();
// });

module.exports = router;
