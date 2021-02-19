import firebase from 'firebase'
const config = {
    // apiKey: "AIzaSyCCAxW-9ug31oq5m0L1VC3Rh0LZI0TugzY",
    // databaseURL: "https://work-dock.firebaseio.com",
    // storageBucket: "work-dock.appspot.com",
    apiKey: "AIzaSyC8Dyr_9ezgHfZ0Aw96FhE1eZ_0g-uBDoo",
    authDomain: "work-dock.firebaseapp.com",
    databaseURL: "https://work-dock.firebaseio.com",
    projectId: "work-dock",
    storageBucket: "work-dock-macos",
    messagingSenderId: "560984109576",
    appId: "1:560984109576:web:22f18b7878727a8a21d7bd",
    measurementId: "G-C1R8RMD55V"
};
firebase.initializeApp(config);
export default firebase;