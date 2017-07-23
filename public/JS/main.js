


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAmC1foudHLchFDQhJk20DlsprWqW96Ve0",
  authDomain: "webpushnotificationpoc.firebaseapp.com",
  databaseURL: "https://webpushnotificationpoc.firebaseio.com",
  projectId: "webpushnotificationpoc",
  storageBucket: "webpushnotificationpoc.appspot.com",
  messagingSenderId: "532440062346"
};

firebase.initializeApp(config);


const messaging = firebase.messaging();


messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

messaging.onMessage(function(payload) {
    console.log("You have received new token. ", payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    //appendMessage(payload);
    // [END_EXCLUDE]
    // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Hi there!");
          }
        });
      }


  });
// Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken()
  .then(function(currentToken) {
    if (currentToken) {
      console.log('Current token is',currentToken);
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })
  .catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    //showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });


// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    console.log('The Token has been refereshed',refreshedToken);

    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    // ...
  })
  .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});


function updateUIForPushPermissionRequired() {

}


function updateUIForPushEnabled() {
  console.log('updatename ');

}

//server  helping methods
function setTokenSentToServer (Status){

}

function sendTokenToServer (currentToken){

}
