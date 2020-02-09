
// export GOOGLE_APPLICATION_CREDENTIALS = "/home/user/Desktop/service-account-file.json"
var serviceAccount = require("./service-account-file.json");
const { Firestore } = require('@google-cloud/firestore');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
let usersRef = db.collection('users');
let packageRef = db.collection('packages');


module.exports = {

  getUserByName: async (id) => {
    let query = usersRef.where('id', '==', id);
    const response = await query.get();
    if (response.empty) {
      console.log('No matching users.');
      return;
    }
    let resp = [];
    response.forEach(doc => {
      resp.push(doc.data());
    });
    return resp;
  },

  getPackageById: async (id) => {
    let query = packageRef.where('ID', '==', id);
    const response = await query.get();
    if (response.empty) {
      console.log('No matching packages.');
      return;
    }
    let resp = [];
    response.forEach(doc => {
      resp.push(doc.data());
    });
    return resp;
  },

  getPackagesFromProfile: async (userId) => {
    let packages;
    let getDoc = await usersRef.doc(userId).get()
      .then(doc => {
        packages = doc.data().packages;
      })
    return packages;
  },
  

  packageDelivered: async (id) => {
    packageRef.doc(id).update({
      "deliveryStatus": "Delivered"
    });
    return;
  },

  packageAtChillers: async (id) => {
    packageRef.doc(id).update({
      "deliveryStatus": "At Chillers"
    });
    return;
  },

  addPackagetoProfile: async (userId, packId) => {
    usersRef.doc(userId).update({
      packages: admin.firestore.FieldValue.arrayUnion(packId)
    });
  },

  removePackageFromProfile: async (userId, packId) => {
    usersRef.doc(userId).update({
      packages: admin.firestore.FieldValue.arrayRemove(packId)
    });
  },

  setChiller: async (id) => {
    usersRef.doc(id).update({
      "isChiller": true
    });
    return;
  },

  setNotChiller: async (id) => {
    usersRef.doc(id).update({
      "isChiller": false
    });
    return;
  },
  
  addFriend: async (user, friend) => {
    usersRef.doc(user).update({
      friends: admin.firestore.FieldPath.arrayUnion(friend)
    });
  },

  removeFriend: async (user, friend) => {
    usersRef.doc(user).update({
      friends: admin.firestore.FieldValue.arrayRemove(friend)
    });
  },
  // updateAddress: async (id, address) => {
  //   usersRef.doc(id).update({
  //     "address": address
  //   });
  //   return;
  // },

};