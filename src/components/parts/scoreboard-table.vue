<template>
  <div v-loading="flights.loading">
    <div class="flex mb_32">
      <el-input
        v-model="searchQuery"
        size="small"
        placeholder="Поиск"/>

      <el-button size="small" type="success" class="ml_24" @click="formVisible = true">
        Добавить рейс
      </el-button>
    </div>

    <el-table
      :data="search"
      style="width: 100%">

      <el-table-column
        label="Время по расписанию"
        min-width="180">
        <template slot-scope="scope">
          <p>{{$dayjs(scope.row.departureAt).utc(true).format('DD.MM LT')}}</p>
          <p>{{$dayjs(scope.row.arrivalAt).utc(true).format('L LT')}}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="№ рейса"
        min-width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.flightNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Авиакомпания"
        min-width="180">
        <template slot-scope="scope">
          <p>{{scope.row.airline}}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="Направление"
        min-width="180">
        <template slot-scope="scope">
          <p>{{scope.row.from}} - {{scope.row.to}}</p>
        </template>
      </el-table-column>

      <el-table-column
        align="right"
        min-width="200">
        <template v-if="false" slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" />

          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <flight-edit-form :flight="flight" :form-visible.sync="formVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_AIRLINES } from '@/store/actions/dictionary';
import FlightEditForm from '@/components/parts/flight-edit-form';

export default {
  name: 'scoreboard-table',
  components: { FlightEditForm },
  data() {
    return {
      flight: null,
      searchQuery: '',
      formVisible: false,
    };
  },
  computed: {
    ...mapGetters(['flights', 'dictionary']),
    search() {
      return this.flights.items.filter((item) => item?.filter.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    test() {
      return this.dictionary.airlines.length ? this.dictionary.airlines : this.savedAirline;
    },
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
  },
};
</script>

<style scoped>

</style>
