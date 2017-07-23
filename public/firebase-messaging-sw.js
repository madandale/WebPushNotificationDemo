// Retrieve Firebase Messaging object.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
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



messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
