$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyCfOFTf4as4yb3kxUSr5gDyjtPbcGH54rU',
    authDomain: 'tv-app-ed734.firebaseapp.com',
    databaseURL: 'https://tv-app-ed734.firebaseio.com',
    projectId: 'tv-app-ed734',
    storageBucket: 'tv-app-ed734.appspot.com',
    messagingSenderId: '754759581231'
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $('#userlogin').text(user.ba.displayName);

      console.log(user);
    } else {
      // No user is signed in.
      $('#userlogin').text('anonymous');
    }
  });
});
