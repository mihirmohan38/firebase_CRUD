const firebase = require('firebase') ; 

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
apiKey: "apiKey",
authDomain: "test-43bfd.firebaseapp.com",
// For databases not in the us-central1 location, databaseURL will be of the
// form https://[databaseName].[region].firebasedatabase.app.
// For example, https://your-database-123.europe-west1.firebasedatabase.app
databaseURL: "https://test-43bfd-default-rtdb.asia-southeast1.firebasedatabase.app/",
storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(userId, name, pass) {
database.ref('users/' + userId).set({
    username: name,
    password: pass      
});
}

  const dbRef = firebase.database().ref();

dbRef.child("users").child(3).get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

writeUserData(3, 'user30', 'pass3')
  //console.log(database) ; 