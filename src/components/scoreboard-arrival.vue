<template>
  <scoreboard-table />
</template>

<script>
import { FLIGHTS_LIST_REQUEST, TYPE_SET } from '@/store/actions/flights';
import ScoreboardTable from '@/components/parts/scoreboard-table';

export default {
  name: 'scoreboard-arrival',
  components: { ScoreboardTable },
  created() {
    this.$store.commit(TYPE_SET, 'arrival');
    this.$store.dispatch(FLIGHTS_LIST_REQUEST, 'arrival');
  },
};
</script>

<style scoped>

</style>
