/* eslint-disable no-shadow */
import db from '@/plugins/firebase';
import {
  collection, getDocs, query, where, orderBy, addDoc, deleteDoc, doc, setDoc,
} from 'firebase/firestore';

import {
  FLIGHTS_LIST_REQUEST,
  FLIGHTS_LIST_SUCCESS,
  FLIGHT_ADD,
  FLIGHT_UPDATE,
  FLIGHT_DELETE,
  TYPE_SET,
} from '../actions/flights';

const state = {
  flights: {
    items: [],
    loading: false,
  },
  flightType: 'departure',
};

const getters = {
  flights: () => state.flights,
  flightType: () => state.flightType,
};

const actions = {
  async [FLIGHTS_LIST_REQUEST]({ commit }) {
    commit(FLIGHTS_LIST_REQUEST);

    const q = query(
      collection(db, 'flights'),
      where('type', '==', state.flightType),
      orderBy('dateTime'),
    );

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
  async [FLIGHT_ADD]({ dispatch }, flight) {
    const newFlight = await addDoc(collection(db, 'flights'), flight);
    dispatch(FLIGHTS_LIST_REQUEST);

    return newFlight;
  },
  async [FLIGHT_UPDATE]({ dispatch }, flight) {
    await setDoc(doc(db, 'flights', flight.id), flight);
    dispatch(FLIGHTS_LIST_REQUEST);
  },
  async [FLIGHT_DELETE]({ dispatch }, flight) {
    await deleteDoc(doc(db, 'flights', flight.id));
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
  [TYPE_SET]: (state, type) => {
    state.flightType = type;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
