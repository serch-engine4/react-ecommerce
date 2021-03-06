import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDgiUEq62595fl5IGmiQxK69B3G-GoFA_8",
    authDomain: "crwn-db-1ce9e.firebaseapp.com",
    databaseURL: "https://crwn-db-1ce9e.firebaseio.com",
    projectId: "crwn-db-1ce9e",
    storageBucket: "crwn-db-1ce9e.appspot.com",
    messagingSenderId: "141638595434",
    appId: "1:141638595434:web:a7956f3d9dfcdca09cab13",
    measurementId: "G-DGLGT0MZG4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            }
            )
        } catch(error){
            console.log('error creting user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account'});
export const signInWithGoogleMethod = () => auth.signInWithPopup(provider);

export default firebase;