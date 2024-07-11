import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4EwwYyOHTV4RpBu64EmP5Yoz62r2yAWQ",
    authDomain: "test-viso-429107.firebaseapp.com",
    projectId: "test-viso-429107",
    storageBucket: "test-viso-429107.appspot.com",
    messagingSenderId: "1053471332220",
    appId: "1:1053471332220:web:845a9d988adc8e4673f6f9",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);