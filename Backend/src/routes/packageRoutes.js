const express = require("express");
var dbFunctions = require("../../../db/index");

const router = express.Router();
let userID = "02";
let packageID = "pack1";
let friend = "Andrew";

router.post(`/`, async (req, res) => {
  return res.send("Welcome to PackageHub");
});

router.get(`/packages/${packageID}/`, async (req, res) => {
  let packages = await dbFunctions.getPackageById(`${packageID}`);
  return res.send({packages: packages});
});

router.get(`/user/${userID}`, async (req, res) => {
  let users = await dbFunctions.getUserByName(`${userID}`);
  return res.send({ users: users });
});

router.get(`/user/${userID}/chiller`, async (req, res) => {
  await dbFunctions.setChiller(`${userID}`);
  return res.send();
});

router.get(`/user/${userID}/notChiller`, async (req, res) => {
  await dbFunctions.setNotChiller(`${userID}`);
  return res.send();
});

router.get(`/packages/${packageID}/delivered`, async (req, res) => {
  await dbFunctions.packageDelivered(`${packageID}`);
  return res.send();
});

router.get(`/packages/${packageID}/atChillers`, async (req, res) => {
  await dbFunctions.packageAtChillers(`${packageID}`);
  return res.send();
});

router.get(`/user/${userID}/addPack/${packageID}`, async (req, res) => {
  await dbFunctions.addPackagetoProfile(`${userID}`,`${packageID}`);
  return res.send();
});

router.get(`/user/${userID}/removePack/${packageID}`, async (req, res) => {
  await dbFunctions.removePackageFromProfile(`${userID}`, `${packageID}`);
  return res.send();
});

router.get(`/user/${userID}/packages`, async (req, res) => {
  let packages = await dbFunctions.getPackagesFromProfile(`${userID}`);
  if (packages.length === 0){
    return res.send("No packages");
  } else {
    var i;
    for (i = 0; i < packages.length; i++){
      console.log(await dbFunctions.getPackageById(packages[i]));
      // await dbFunctions.getPackageById(packages[i]);
    }
    return res.send({ packages });
  }
});

router.get(`/user/${userID}/addFriend/${friend}`, async (req, res) => {
  await dbFunctions.addFriend(`${userID}`, `${friend}`);
  return res.send();
});

router.get(`/user/${userID}/removeFriend/${friend}`, async (req, res) => {
  await dbFunctions.removeFriend(`${userID}`, `${friend}`);
  return res.send();
});



// router.get(`/user/${userID}/changeAddress/${address}`, async (req, res) => {
//   await dbFunctions.updateAddress(`${userID}`, address);
//   return res.send();
// });

module.exports = router;
