<template>
  <div v-loading="flights.loading">
    <div class="flex mb_32">
      <el-input
        v-model="searchQuery"
        size="small"
        placeholder="Поиск"/>

      <el-button v-if="dictionary.isAdmin" size="small" type="success" class="ml_24" @click="openDialogEditForm">
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
          <p>{{$dayjs(scope.row.dateTime).utc(true).format('DD.MM LT')}}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="№ рейса"
        min-width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.flightNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Авиакомпания"
        min-width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.airline.name" placement="top-start">
            <img :src="scope.row.airline.logoLink" class="airline-logo" :alt="scope.row.airline.name">
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        label="Направление"
        min-width="180">
        <template slot-scope="scope">
          <p>{{scope.row.direction}}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="Статус"
        min-width="180">
        <template slot-scope="scope">
          <p :class="statusColor(scope.row.dateTime)">
            {{statusTitle(scope.row.dateTime)}}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        v-if="dictionary.isAdmin"
        align="right"
        min-width="200">
        <template slot-scope="scope">
          <el-button
            class="mr_8"
            icon="el-icon-edit"
            size="mini"
            @click="openDialogEditForm(scope.row)" />

          <el-popconfirm
            title="Удалить рейс?"
            @confirm="handleDelete(scope.row)"
          >
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              slot="reference"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <flight-edit-form ref="dialogEditForm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FlightEditForm from '@/components/parts/flight-edit-form';
import { FLIGHT_DELETE } from '@/store/actions/flights';

export default {
  name: 'scoreboard-table',
  components: { FlightEditForm },
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    ...mapGetters(['flights', 'dictionary']),
    search() {
      return this.flights.items.filter((item) => item?.filter.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  methods: {
    openDialogEditForm(flight) {
      this.$refs.dialogEditForm.open(flight);
    },
    handleDelete(flight) {
      this.$store.dispatch(FLIGHT_DELETE, flight);
    },
    statusTitle(dateTime) {
      return this.$dayjs().isAfter(this.$dayjs(dateTime)) ? 'Прибыл' : 'Ожидается';
    },
    statusColor(dateTime) {
      return {
        green: this.$dayjs().isAfter(this.$dayjs(dateTime)),
      };
    },
  },
};
</script>

<style scoped>
.green {
  color: #00bc00;
}
</style>
