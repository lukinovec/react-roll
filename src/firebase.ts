import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAzD2mItOINdMVlQ77wJ366iBZLW3rc6ak",
    authDomain: "roll-fad51.firebaseapp.com",
    projectId: "roll-fad51",
    storageBucket: "roll-fad51.appspot.com",
    messagingSenderId: "92501852288",
    appId: "1:92501852288:web:bc9b6b2ff5c83079cba665",
    measurementId: "G-SXSPPJY7SV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;