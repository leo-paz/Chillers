const express = require("express");
var dbFunctions = require("../../../db/index");

const router = express.Router();
let userID = "02";
let packageID = "pack1";
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

module.exports = router;
