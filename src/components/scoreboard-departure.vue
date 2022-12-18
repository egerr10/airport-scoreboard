<template>
  <scoreboard-table />
</template>

<script>
import ScoreboardTable from '@/components/parts/scoreboard-table';
import { FLIGHTS_LIST_REQUEST, TYPE_SET } from '@/store/actions/flights';

export default {
  name: 'scoreboard-departure',
  components: { ScoreboardTable },
  created() {
    this.$store.commit(TYPE_SET, 'departure');
    this.$store.dispatch(FLIGHTS_LIST_REQUEST);
  },
};
</script>

<style scoped>

</style>
