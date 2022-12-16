<template>
  <div>
    <scoreboard-table />
  </div>
</template>

<script>
import ScoreboardTable from '@/components/parts/scoreboard-table';
import { FLIGHTS_LIST_REQUEST, PATH_SET } from '@/store/actions/flights';

export default {
  name: 'scoreboard-departure',
  components: { ScoreboardTable },
  created() {
    this.$store.commit(PATH_SET, 'departure');
    this.$store.dispatch(FLIGHTS_LIST_REQUEST);
  },
};
</script>

<style scoped>

</style>
