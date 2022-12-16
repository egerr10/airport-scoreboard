<template>
  <el-dialog
    title="Tips"
    :visible.sync="dialogVisible"
    width="800px"
    @closed="$emit('update:formVisible', false)"
  >

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';

class Flight {
  constructor(flight) {
    this.departureAt = flight?.departureAt;
    this.arrivalAt = flight?.arrivalAt;
    this.airline = flight?.airline;
    this.flightNumber = flight?.flightNumber;
    this.from = flight?.from;
    this.to = flight?.to;
    this.filter = flight?.filter;
  }
}

export default {
  name: 'flight-edit-form',
  props: ['formVisible', 'flight'],
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    const test = new Flight();
    console.log(typeof test, test);
  },
  watch: {
    formVisible(val) {
      this.dialogVisible = val;
    },
  },
  computed: {
    ...mapGetters(['dictionary']),
    /* test() {
      return this.dictionary.airlines.length ? this.dictionary.airlines : this.savedAirline;
    }, */
  },
};
</script>

<style scoped>

</style>
