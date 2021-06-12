const functions = require("firebase-functions");
const firebase = require("firebase");
const axios = require('axios') ; 
const {validateEmail, validatePhone} = require('./validateInput')
// Required for side-effects
require("firebase/firestore");

// initializing the firebase console
// get the confiuration information from firebase consolde or replace 'test-43bfd' with your project id
// currently running in test env
firebase.initializeApp({
    apiKey: 'api',
    authDomain: 'test-43bfd.firebaseapp.com',
    projectId: 'test-43bfd'
  });
  
  // getting the firestore database attached to the project 
  var db = firebase.firestore();
  
  // NOTE!!!!
  // response format is normalized in all functions to {'success': 0, 'error' : 'error adding document', 'data': null}
  // if success is 0 , means the request failed 
  // upon failure error contains the message and error code if required 
  // upon success data will contain any information that is needed to be sent back 

  // NOTE : exports.addUser will be hosted on https://url:port/addUser, will be shown on cmd on execution
  // adding a the create function
  exports.addUser = functions.https.onRequest(async (req, res) => {

    // ensuring the http request type is consistent
    if (req.method !== 'POST'){
        return res.status(500).json({'success': 0, 'error' : 'Expecting a POST request', 'data': null})
    }
    // request body should contain name, email and number 
    var name = req.body.name ; 
    var email = req.body.email ; 
    var number = req.body.number ; 
    
    // checking for any empty inputs and returning error
    if (!(name && email && number)){
        return res.status(400).json({'success': 0, 'error' : 'input is null', 'data': null}) ;
    }else if (!(validateEmail(email)&&validatePhone(number))) {
            return res.status(400).json({'success': 0, 'error' : 'input format invalid', 'data': null}) ;
    } else {
        // adding the user information to the database
    
        db.collection("users").add({
            name: name,
            email: email,
            number: number
        }).catch((error) => {
            // looking out for any errors
            // sending a response with status 400 if any error
            res.status(400).json({'success': 0, 'error' : 'error adding document', 'data': null}) ;
            throw new Error('No such document!');

        })
        .then((result) => {
            // upon successufl write send a response
            console.log("Document written with ID: ", result.id);
            res.json({'success': 1, 'error' : null, 'data': {'id' : result.id}}) ; 
    
        })
       ;
    }

  });

  // returns all the users 
  exports.getAllUsers = functions.https.onRequest(async (req, res)=>{

    // ensuring the http request type is consistent
    if (req.method !== 'GET'){
        return res.status(500).json({'success': 0, 'error' : 'Expecting a GET request', 'data': null})
    }


    // retrieving information from the database and storing all the user-ids in ids.
    var ids = [] ; 
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            ids.push(doc.data())
            console.log(`${doc.id} => ${doc.data()}`);
        });
        // upon successufl write send a response
        res.json({'success': 1, 'error' : null, 'data': ids}) ;
    }).catch((error)=>{
        // looking out for any errors
            // sending a response with status 400 if any error
        res.status(400).json({'success': 0, 'error' : 'database error', 'data': null}) ; 
    }) ;  
  }) ; 

 exports.getUserByID = functions.https.onRequest(async (req, res)=>{

    // ensuring the http request type is consistent
    if (req.method !== 'GET'){
        return res.status(500).json({'success': 0, 'error' : 'Expecting a GET request', 'data': null})
    }

    var id = req.body.id ; 
    db.collection('users').doc(id).get().then((result)=>{
        console.log(result.data())
        if (!result.exists){
            // looking out for non existent user id errors
            // sending a response with status 400 if any error
            res.status(400).json({'success': 0, 'error' : 'user not found', 'data': null}) ; 
        } else {
            // upon successufl get send a response
            res.json({'success': 1, 'error' : null, 'data': result.data()}) ; 
        }
    }).catch((error)=>{
        // looking out for any errors
        // sending a response with status 400 if any error
        res.status(400).json({'success': 0, 'error' : 'database error', 'data': null}) ; 
    }) ;  
 }) ; 

//  exports.getUserByName = functions.https.onRequest(async (req, res)=>{
//     // get request
//     // doesn't work yet
//     // error body 
//    var name = req.body.name ; 
//    console.log('name', name)
//    db.collection('users').where('name', '==', name).get().then((result)=>{
//        console.log(result.exits)
//        if (!result.exists){
//            res.json({'sucess': 'DNE' }) ; 
//        } else {
//            console.log(result.data()) ; 
//            res.json({'success': 1}) ; 
//        }
//    }).catch((error)=>{
//        res.json('error') ; 
//        console.log(error) ; 
//    }) ; 
// }) ; 
 

 exports.updateUserData = functions.https.onRequest(async (req, res)=>{
        // ensuring the http request type is consistent
        if (req.method !== 'PUT'){
            return res.status(500).json({'success': 0, 'error' : 'Expecting a PUT request', 'data': null})
        }
    

    var id = req.body.id ; 
    var updates = req.body.updates ; 
    console.log(id, updates) ; 
    if ((id && updates)) {
        db.collection('users').doc(id).update(updates).then((result)=>{
            // upon successufl update send a response, no additional data is sent
            res.json({'success': 1, 'error' : null, 'data': null}) ; 
        }).catch((error)=>{
            // looking out for any errors
            // sending a response with status 400 if any error
            res.status(400).json({'success': 0, 'error' : 'database error', 'data': null}) ; 
        }) ; 
    } else {
        // looking out for empty inputs
        // sending a response with status 400 if any error
        res.status(400).json({'success': 0, 'error' : 'params error', 'data': null}) ; 
    }

  }) ; 

  exports.deleteUserByID =  functions.https.onRequest(async (req, res)=>{
        // ensuring the http request type is consistent
    if (req.method !== 'DELETE'){
        return res.status(500).json({'success': 0, 'error' : 'Expecting a DELETE request', 'data': null})
    }
    // delete method 
    var id = req.body.id ; 
    if (!id) { 
        // looking out for any empty input
        // sending a response with status 400 if any error
        res.status(400).json({'success': 0, 'error' : 'empty input', 'data': null}) ; 
    }else {
        db.collection('users').doc(id).delete().then((result)=>{
            res.json({'success': 1, 'error' : null, 'data': null}) ; 
        }).catch((error)=>{
            // looking out for any errors
            // sending a response with status 400 if any error
            res.status(400).json({'success': 0, 'error' : 'database error', 'data': null}) ; 
        }) ; 
    }

  }) ; 




  // part 2 here

  exports.books = functions.https.onRequest(async (req, res)=> {
    // ensuring the http request type is consistent
    if (req.method !== 'POST'){
        return res.status(500).json({'success': 0, 'error' : 'Expecting a POST request', 'data': null})
    }


    // missed a % encoding for url 
    
    // request body needs to contains a valid user id, tags - a json of tags, and url- that you want to encode
    var url = 'http://api.linkpreview.net/?key=84df0b90bc83eda77779df6ce42b8aa5&q=' + req.body.url ; 
    var id = req.body.id ; 
    var tags =  req.body.tags ; 
    var updates = {status : 'unread', created_at : firebase.firestore.Timestamp.now()}

    // storing the added in content id for updating 
    var learn_content_id  ; 

    if (req.body.url && id && tags){
        // check if user exists and only then proceed 
        db.collection('users').doc(id).get().then((result)=>{
            if (!result.exists){
                res.status(400).json({'success': 0, 'error' : 'user not found', 'data': null}) ; 
            } else { 
                // after the user id is verified. 
                // add in the new collection under 'learn_content' and update its data
                db.collection('users').doc(id).collection('learn_content').add(updates)
                .then((result)=>{
                    learn_content_id  = result.id ; 
                    // sending the get request to the url
                    axios.get(url,{})
                        .then((result)=>{
                            console.log('here', learn_content_id) ; 
                            // posting into database
                            db.collection('users').doc(id).collection('learn_content').doc(learn_content_id ).update(result.data)
                            .catch((error)=>{
                                res.status(400).json({'success': 0, 'error' : 'invalid id', 'data': null}) ;  
                            })
                            .then((result2)=>{
                                db.collection('users').doc(id).collection('learn_content').doc(learn_content_id).collection('tags').add(tags)
                                    .then((result3)=>{
                                        // upon successufl write send a response
                                        res.json({'success': 1, 'error' : null, 'data': null})  ; 
                                    }) 
                                });  
                            });
                }).catch((error)=>{
                    // looking out for any errors
                     // sending a response with status 400 if any error
                    res.status(400).json({'success': 0, 'error' : 'database error', 'data': null}) ;  
                }) ;
                
            }
        }).catch((error)=>{
            // looking out for any errors
            // sending a response with status 400 if any error
            res.status(400).json({'success': 0, 'error' : 'database error', 'data': null}) ; 
        }) ;  

    } else {
        // looking out for any empty inputs
        // sending a response with status 400 if any error
        res.status(400).json({'success': 0, 'error' : 'empty inputs', 'data': null}) ;
    }

    
  }) ; 