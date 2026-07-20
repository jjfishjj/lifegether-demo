import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import {addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore';

const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID};
export const firebaseReady=Boolean(config.apiKey&&config.authDomain&&config.projectId&&config.appId);
const app=firebaseReady?initializeApp(config):null;
const auth=app?getAuth(app):null;
const db=app?getFirestore(app):null;
const provider=new GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const observeUser=callback=>auth?onAuthStateChanged(auth,callback):()=>{};
export const signInGoogle=()=>{if(!auth)throw new Error('尚未設定 Firebase');return signInWithPopup(auth,provider)};
export const signOutUser=()=>auth?signOut(auth):Promise.resolve();
export const saveCloudEvent=event=>addDoc(collection(db,'events'),{...event,createdAt:serverTimestamp()});
export const subscribeCloudEvents=callback=>onSnapshot(query(collection(db,'events'),orderBy('createdAt','desc')),snapshot=>callback(snapshot.docs.map(doc=>({...doc.data(),id:doc.id}))));
