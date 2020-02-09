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
  

};



//TODO: var barcondScan = event()
// function getData(barcodeScan){
// function getUserByName(){
//   let query = usersRef.where('name', '==', 'Andrew');
//   query.get()
//     .then(snapshot => {
//       if (snapshot.empty) {
//         console.log('No matching users.');
//         return;
//       }
//       snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//       });
//     })
//     .catch(err => {
//       console.log('Error getting documents', err);
//     });
//   }


// function setChiller(name){
//   usersRef.doc(name).update({
//     "isChiller": true
//   })
// }

// function setNotChiller(name) {
//   usersRef.doc(name).update({
//     "isChiller": false
//   })
// }



// //TODO: ID input
// function getPackageById() {
//   let query = packageRef.where('ID', '==', '0');
//   query.get()
//     .then(snapshot => {
//       if (snapshot.empty) {
//         console.log('No matching packages.');
//         return;
//       }
//       snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//       });
//     })
//     .catch(err => {
//       console.log('Error getting documents', err);
//     });
// }

