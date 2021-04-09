import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAY7J0cwSf-3iubNWROSZ2BgPAnLwEJyQE",
  authDomain: "catch-of-the-day-jharrington.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jharrington-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
