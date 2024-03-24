const functions = require("firebase/functions");
const admin = require("firebase/admin");
admin.initialzeApp();

exports.createUserDocument = functions.auth.user().onCreate((user) => {
  const userData = {
    displayName: user.displayName,
    email: user.email,
  };
  return admin.firestore().collection("users").doc(user.uid).set(userData);
});
