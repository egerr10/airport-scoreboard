/* eslint-disable no-shadow */

import { initializeApp } from 'firebase/app';
import {
  collection, getDocs, getFirestore, query, where, orderBy, addDoc, deleteDoc, doc, setDoc,
} from 'firebase/firestore';

import dayjs from 'dayjs';
import {
  FLIGHTS_LIST_REQUEST,
  FLIGHTS_LIST_SUCCESS,
  FLIGHTS_LIST_EMPTY,
  DELETE_FLIGHT,
  EDIT_FLIGHT,
  ADD_FLIGHT,
  MANAGE_DATA_ERROR, PATH_SET,
} from '../actions/flights';

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
  flights: {
    items: [],
    path: '',
    loading: false,
  },
};

const getters = {
  flights: () => state.flights,
};

const actions = {
  async [FLIGHTS_LIST_REQUEST]({ commit }) {
    commit(FLIGHTS_LIST_REQUEST);

    const orderByVal = state.flights.path === 'arrival' ? 'arrivalAt' : 'departureAt';

    const q = query(collection(db, state.flights.path), orderBy(orderByVal));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const flights = [];

      querySnapshot.forEach((item) => {
        const flight = item.data();
        flight.id = item.id;
        flights.push(flight);
      });

      commit(FLIGHTS_LIST_SUCCESS, flights);
    } else {
      commit(FLIGHTS_LIST_SUCCESS, []);
    }
  },
  async [ADD_FLIGHT]({ dispatch }) {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    /* for (const key in arr) {
      addDoc(collection(db, 'airlines'), arr[key]);
    } */

    /* arr.forEach((item) => {
      addDoc(collection(db, 'cities'), { name: item });
    }); */

    /* await setDoc(doc(db, 'dictionary', 'cities'), {
      items: arr,
    }); */

    const flight = {
      arrivalAt: dayjs().format(),
      departureAt: dayjs().format(),
      airline: 'Победа',
      flightNumber: 'P213',
      from: 'Москва',
      to: 'Караганда',
      filter: 'P213_Москва_Караганда',
    };

    const newFlight = await addDoc(collection(db, state.flights.path), flight);
    dispatch(FLIGHTS_LIST_REQUEST);

    return newFlight;
  },
  async [DELETE_FLIGHT]({ dispatch }, flight) {
    await deleteDoc(doc(db, 'arrival', flight));
    dispatch(FLIGHTS_LIST_REQUEST);
  },
};

const mutations = {
  [FLIGHTS_LIST_REQUEST]: (state) => {
    state.flights.loading = true;
  },
  [FLIGHTS_LIST_SUCCESS]: (state, flights) => {
    state.flights.items = flights;
    state.flights.loading = false;
  },
  [PATH_SET]: (state, path) => {
    state.flights.path = path;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
