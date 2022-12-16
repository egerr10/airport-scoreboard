<template>
  <div>
    <div class="blue-wrap">
      <div class="container">
        <h1 class="text_60 text_white mb_40">Онлайн-табло</h1>

        <el-button @click="addFlight">test</el-button>

        <el-radio-group v-model="component">
          <el-radio-button label="ScoreboardDeparture" border>Вылет</el-radio-button>
          <el-radio-button label="ScoreboardArrival" border>Прилёт</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="container mt_40">
      <component :is="component" />
    </div>
  </div>
</template>

<script>
import { ADD_FLIGHT, FLIGHTS_LIST_REQUEST } from '@/store/actions/flights';
import ScoreboardArrival from '@/components/scoreboard-arrival';
import ScoreboardDeparture from '@/components/scoreboard-departure';
import { GET_AIRLINES, GET_CITIES } from '@/store/actions/dictionary';

export default {
  name: 'ScoreboardView',
  components: { ScoreboardDeparture, ScoreboardArrival },
  data() {
    return {
      component: 'ScoreboardDeparture',
    };
  },
  mounted() {
    this.$store.dispatch(GET_CITIES, 'Омск');
    this.$store.dispatch(GET_AIRLINES, 'аааааа');
  },
  methods: {
    addFlight() {
      this.$store.dispatch(ADD_FLIGHT, this.arr);
    },
  },
};
</script>
