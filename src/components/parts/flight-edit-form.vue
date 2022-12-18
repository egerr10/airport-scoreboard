<template>
  <el-dialog
    :title="titles.dialogTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="600px"
    @open="init"
    @closed="closed"
  >

    <el-form
      v-if="flightEdit"
      :model="flightEdit"
      :rules="rules"
      label-position="top"
      ref="flightForm"
      @submit.native.prevent
    >
      <div class="flex">
        <el-form-item class="mr_32" :label="titles.direction" prop="direction">
          <el-autocomplete
            style="width: 220px"
            v-model="flightEdit.direction"
            :fetch-suggestions="citySuggestion"
            @select="cityHandleSelect"
            clearable
          >
            <template slot-scope="{ item }">
              <div class="value">{{ item }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>

        <el-form-item :label="titles.dateTime" prop="dateTime">
          <el-date-picker type="datetime" :picker-options=pickerOptions placeholder="Выберите дату и время" v-model="flightEdit.dateTime" />
        </el-form-item>
      </div>

      <div class="flex">
        <el-form-item class="mr_32" label="Авиакомпания" prop="airlineId">
          <el-select
            style="width: 220px"
            label="Выбор авиакомпании"
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
        </el-form-item>

        <el-form-item label="Номер рейса" prop="flightNumber">
          <el-input style="width: 220px" v-model="flightEdit.flightNumber"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Отмена</el-button>
      <el-button type="primary" @click="submitForm">{{titles.saveButton}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import { AIRLINES_GET, CITIES_GET } from '@/store/actions/dictionary';
import { FLIGHT_ADD, FLIGHT_UPDATE } from '@/store/actions/flights';

class Flight {
  constructor(flight, type) {
    this.id = flight?.id;
    this.airline = flight?.airline;
    this.airlineId = flight?.airlineId;
    this.flightNumber = flight?.flightNumber;
    this.direction = flight?.direction || '';
    this.type = flight?.type || type;
    this.dateTime = flight?.dateTime;
    this.filter = null;
  }

  getFilter() {
    return `${this.airline?.name}_${this.flightNumber}_${this.direction}`;
  }
}

export default {
  name: 'flight-edit-form',
  props: ['formVisible', 'flight'],
  data() {
    return {
      dialogVisible: false,
      flightEdit: null,
      pickerOptions: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          return time.getTime() < new Date().setDate(new Date().getDate() - 1);
        },
      },
      rules: {
        dateTime: [
          {
            required: true, message: 'Укажите дату', trigger: 'change',
          },
        ],
        airlineId: [
          { required: true, message: 'Выберите авиакомпанию', trigger: 'change' },
        ],
        flightNumber: [
          { required: true, message: 'Введите номер рейса', trigger: 'blur' },
        ],
        direction: [
          { required: true, message: 'Укажите направление', trigger: 'change' },
        ],
      },
    };
  },
  watch: {
    formVisible(val) {
      this.dialogVisible = val;
    },
  },
  computed: {
    ...mapGetters(['dictionary', 'flights']),
    airlines() { // селекту нужен словарь, берем его из объекта вылета, если он существует и добавляем в начало массива, если его там нет.
      return this.flightEdit?.airlineId && !this.dictionary.airlines.length
        ? [this.flightEdit?.airline, ...[]] : this.dictionary.airlines;
    },
    titles() {
      return {
        direction: this.flights?.type === 'arrival' ? 'Укажите город отправления' : 'Укажите город назначения',
        dateTime: this.flights?.type === 'arrival' ? 'Укажите время прилёта' : 'Укажите время вылета',
        dialogTitle: this.flights?.type === 'arrival' ? 'Редактирования прилета' : 'Редактирование вылета',
        saveButton: this.flightEdit?.id ? 'Сохранить вылет' : 'Добавить вылет',
      };
    },
  },
  methods: {
    init() {
      this.flightEdit = this.flight ? new Flight(this.flight) : new Flight(null, this.flights.type);
      this.getAirlines(this.flightEdit.airline?.name ?? '');
    },
    closed() {
      this.$emit('update:formVisible', false);
      this.$emit('update:flight', null);
      this.flightEdit = null;
    },
    getAirlines(query) { // запрашивает список авиакомпаний для селекта
      this.$store.dispatch(AIRLINES_GET, query);
    },
    citySuggestion(queryString, cb) { // запрашивает города для автокомплита
      this.$store.dispatch(CITIES_GET, this.capitalize(queryString));
      cb(this.dictionary.cities);
    },
    setAirline(e) { // селект работает c примитивами, ввиду того, что нам надо сразу сохранить объект авикомпании, добавляем тут.
      this.flightEdit.airline = this.dictionary.airlines.find((item) => item.id === e);
    },
    cityHandleSelect(city) {
      this.flightEdit.direction = city;
    },
    submitForm() {
      this.$refs.flightForm.validate((valid) => {
        if (valid) {
          this.flightEdit.filter = this.flightEdit.getFilter();
          const { ...data } = this.flightEdit;
          data.dateTime = this.$dayjs(data.dateTime).format('YYYY-MM-DDTHH:mm:ss');

          if (!data.id) {
            delete data.id;
          }

          if (this.flightEdit.id) {
            this.saveFlight(data);
          } else {
            this.addFlight(data);
          }
        }
        return false;
      });
    },
    addFlight(data) {
      this.$store.dispatch(FLIGHT_ADD, data).then(() => {
        this.$message({
          message: 'Рейс успешно добавлен',
          type: 'success',
        });

        this.init();
        this.$nextTick(() => {
          this.$refs.flightForm.clearValidate();
        });
      });
    },
    saveFlight(data) {
      this.$store.dispatch(FLIGHT_UPDATE, data).then(() => {
        this.$message({
          message: 'Рейс успешно сохранен',
          type: 'success',
        });

        this.dialogVisible = false;
      });
    },
    capitalize(s) {
      return `${s[0]?.toUpperCase()}${s.slice(1)}`;
    },
  },
};
</script>

<style scoped>

</style>
