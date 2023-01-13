import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyANC3ujkVpixUF_ctmn15n0KESNVpmmGIA',
  authDomain: 'airport-scoreboard.firebaseapp.com',
  databaseURL: 'https://airport-scoreboard-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'airport-scoreboard',
  storageBucket: 'airport-scoreboard.appspot.com',
  messagingSenderId: '810866443431',
  appId: '1:810866443431:web:b4d060fdf74ac8b0a8c782',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
