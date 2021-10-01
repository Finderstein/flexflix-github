import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA23oi34fhfK27SE0oov_3b4yMqfzKv62s",
	authDomain: "flexflix-b3814.firebaseapp.com",
	projectId: "flexflix-b3814",
	storageBucket: "flexflix-b3814.appspot.com",
	messagingSenderId: "632698382417",
	appId: "1:632698382417:web:43e154cdbb431b22217070",
	measurementId: "G-SXCM7QZ2BK",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const dbFirestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, dbFirestore, auth, storage };
