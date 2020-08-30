import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyB0jnqy7fsCPs5B4F0PqLGac03fVPf18UA",
    authDomain: "bedtime-stories-191ae.firebaseapp.com",
    databaseURL: "https://bedtime-stories-191ae.firebaseio.com",
    projectId: "bedtime-stories-191ae",
    storageBucket: "bedtime-stories-191ae.appspot.com",
    messagingSenderId: "783594738211",
    appId: "1:783594738211:web:e1ac34139fa56f77b85796"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();