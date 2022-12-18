/* eslint-disable no-shadow */

import { initializeApp } from 'firebase/app';
import {
  collection, getDocs, getFirestore, query, where, orderBy, addDoc, deleteDoc, doc, setDoc, limit,
} from 'firebase/firestore';

import {
  CITIES_GET, AIRLINES_GET, USER_ROLE_CHANGE,
} from '../actions/dictionary';

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

const state = {
  dictionary: {
    cities: [],
    airlines: [],
    isAdmin: false,
  },
};

const getters = {
  dictionary: () => state.dictionary,
};

const actions = {
  async [CITIES_GET]({ commit }, querySearch) {
    const q = query(
      collection(db, 'cities'),
      where('name', '>=', querySearch),
      orderBy('name'),
      limit(10),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const cities = [];

      querySnapshot.forEach((item) => {
        cities.push(item.data());
      });

      commit(CITIES_GET, cities);
    } else {
      commit(CITIES_GET, []);
    }
  },

  async [AIRLINES_GET]({ commit }, querySearch) {
    const q = query(
      collection(db, 'airlines'),
      where('name', '>=', querySearch),
      orderBy('name'),
      limit(10),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const airlines = [];

      querySnapshot.forEach((item) => {
        const airline = item.data();
        airline.id = item.id;
        airlines.push(airline);
      });

      commit(AIRLINES_GET, airlines);
    } else {
      commit(AIRLINES_GET, []);
    }
  },
};

const mutations = {
  [CITIES_GET]: (state, cities) => {
    state.dictionary.cities = cities.map((item) => item.name);
  },
  [AIRLINES_GET]: (state, airlines) => {
    state.dictionary.airlines = airlines;
  },
  [USER_ROLE_CHANGE]: (state) => {
    state.dictionary.isAdmin = !state.dictionary.isAdmin;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
