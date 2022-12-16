import Vue from 'vue';
import Vuex from 'vuex';
import Flights from '@/store/modules/flights';
import Dictionary from '@/store/modules/dictionary';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Flights,
    Dictionary,
  },
});
