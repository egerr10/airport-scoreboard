/* eslint-disable no-shadow */

import db from '@/plugins/firebase';
import {
  collection, getDocs, query, where, orderBy, limit,
} from 'firebase/firestore';

import {
  CITIES_GET, AIRLINES_GET, USER_ROLE_CHANGE,
} from '../actions/dictionary';

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
        if (airline.logoLink) {
          airline.id = item.id;
          airlines.push(airline);
        }
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
