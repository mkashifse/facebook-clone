// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBRIhktOrUYQk7aW1o-gzHj_te7cUhyuQI",
    authDomain: "facebook-clone-91821.firebaseapp.com",
    projectId: "facebook-clone-91821",
    storageBucket: "facebook-clone-91821.appspot.com",
    messagingSenderId: "820936364428",
    appId: "1:820936364428:web:999e4f93d371dafbe5c6a9",
    measurementId: "G-T9HSXN6L9R"
  };
   const firebaseApp = firebase.initializeApp(firebaseConfig);
   const db= firebase.firestore(firebaseApp);
   const auth=firebase.auth();
   const provider= new firebase.auth.GoogleAuthProvider();
   export {auth,provider};
   export default db;

  