<template>
  <el-dialog
    title="Tips"
    :visible.sync="dialogVisible"
    width="800px"
    @open="init"
    @closed="closed"
  >
    <div v-if="flightEdit">
      <el-select
        v-model="flightEdit.airlineId"
        remote
        :remote-method="getAirlines"
        filterable
        placeholder="Выбрать"
        @change="setAirline"
      >
        <el-option
          v-for="item in airlines"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import { GET_AIRLINES } from '@/store/actions/dictionary';

class Flight {
  constructor(flight) {
    this.departureAt = flight?.departureAt;
    this.arrivalAt = flight?.arrivalAt;
    this.airline = flight?.airline;
    this.airlineId = flight?.airlineId;
    this.flightNumber = flight?.flightNumber;
    this.from = flight?.from;
    this.to = flight?.to;
    this.filter = null;
  }

  getFilter() {
    return `${this.airline?.name}_${this.flightNumber}_${this.from}_${this.to}`;
  }
}

export default {
  name: 'flight-edit-form',
  props: ['formVisible', 'flight'],
  data() {
    return {
      dialogVisible: false,
      flightEdit: null,
    };
  },
  watch: {
    formVisible(val) {
      this.dialogVisible = val;
    },
  },
  computed: {
    ...mapGetters(['dictionary']),
    airlines() {
      let airlines = [];

      if (this.dictionary.airlines.length) {
        airlines = this.dictionary.airlines;
      } else if (this.flightEdit?.airline) {
        airlines = [this.flightEdit.airline];
      }

      return airlines;
    },
  },
  methods: {
    init() {
      this.flightEdit = this.flight ? new Flight(this.flight) : new Flight();
    },
    getAirlines(query) { // запрашивает список авиакомпаний для селекта
      this.$store.dispatch(GET_AIRLINES, query);
    },
    setAirline(e) { // селект работает c примитивами, но ввиду того, что нам надо сразу сохранить объект авикомпании, делаем это тут.
      this.flightEdit.airline = this.dictionary.airlines.find((item) => item.id === e);
      console.log(this.flightEdit);
    },
    closed() {
      this.$emit('update:formVisible', false);
      this.$emit('update:flight', null);
    },
  },
};
</script>

<style scoped>

</style>
