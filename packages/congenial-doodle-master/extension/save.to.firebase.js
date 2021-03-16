// source
// Firebase console > Settings >  Project Settings > Apps Card > Nickname >  Firebase SDK snippet > Config
// Click on "Config" radio button
// Copy the config object snippet
// Paste it here
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "G-",
};
// Initialize Firebase
const CAM = firebase.initializeApp(firebaseConfig);
console.log("Project Initialed, Project Name:", CAM.name); // "[CAM]"

// Access Firebase services via the Project variable
var CAMFirestore = CAM.firestore();

console.log("Project storage", CAMFirestore);
