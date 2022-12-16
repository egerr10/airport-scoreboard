/* eslint-disable no-shadow */

import { initializeApp } from 'firebase/app';
import {
  collection, getDocs, getFirestore, query, where, orderBy, addDoc, deleteDoc, doc, setDoc, limit,
} from 'firebase/firestore';

import dayjs from 'dayjs';
import {
  GET_CITIES, GET_AIRLINES,
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
  },
};

const getters = {
  dictionary: () => state.dictionary,
};

const actions = {
  async [GET_CITIES]({ commit }, querySearch) {
    const q = query(collection(db, 'cities'), where('name', '>=', querySearch), orderBy('name'), limit(5));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const cities = [];

      querySnapshot.forEach((item) => {
        cities.push(item.data());
      });

      commit(GET_CITIES, cities);
    } else {
      commit(GET_CITIES, []);
    }
  },

  async [GET_AIRLINES]({ commit }, querySearch) {
    const q = query(collection(db, 'airlines'), where('name', '>=', querySearch), orderBy('name'), limit(5));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const airlines = [];

      querySnapshot.forEach((item) => {
        const airline = item.data();
        airline.id = item.id;
        airlines.push(airline);
      });

      commit(GET_AIRLINES, airlines);
    } else {
      commit(GET_AIRLINES, []);
    }
  },
};

const mutations = {
  [GET_CITIES]: (state, cities) => {
    state.dictionary.cities = cities.map((item) => item.name);
  },
  [GET_AIRLINES]: (state, airlines) => {
    state.dictionary.airlines = airlines;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
