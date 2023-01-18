<template>
  <div>
    <div class="blue-wrap">
      <div class="container">
        <div class="top-bar">
          <el-tooltip class="item" effect="dark" :content="changeRoleTitle" placement="bottom-end">
            <i class="text_24 text_white cp" :class="userIcon" @click="changeRole" />
          </el-tooltip>
        </div>

        <div class="flex flex-jc-sb">
          <div>
            <p style="font-size: 80px;" class="text_white text_b mb_20">
              Кольцово
            </p>

            <p class="text_40 text_white mb_40">Онлайн-табло</p>

            <el-radio-group v-model="type" @change="getFlights">
              <el-radio-button label="departure" border>Вылет</el-radio-button>
              <el-radio-button label="arrival" border>Прилёт</el-radio-button>
            </el-radio-group>
          </div>

          <img class="plane" src="/back-img.png" alt="">
        </div>
      </div>
    </div>

    <scoreboard-table />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { USER_ROLE_CHANGE } from '@/store/actions/dictionary';
import ScoreboardTable from '@/components/parts/scoreboard-table';
import { FLIGHTS_LIST_REQUEST, TYPE_SET } from '@/store/actions/flights';

export default {
  name: 'ScoreboardView',
  components: { ScoreboardTable },
  data() {
    return {
      type: null,
    };
  },
  created() {
    this.type = this.flightType;
    this.$store.dispatch(FLIGHTS_LIST_REQUEST);

    if (this.$route.query.admin) {
      this.changeRole();
    }
  },
  computed: {
    ...mapGetters(['dictionary', 'flightType']),
    userIcon() {
      return this.dictionary.isAdmin ? 'el-icon-s-custom' : 'el-icon-user';
    },
    changeRoleTitle() {
      return this.dictionary.isAdmin ? 'Переключиться в режим пользователя' : 'Переключиться в режим администратора';
    },
  },
  methods: {
    changeRole() {
      this.$store.commit(USER_ROLE_CHANGE);
    },
    getFlights() {
      this.$store.commit(TYPE_SET, this.type);
      this.$store.dispatch(FLIGHTS_LIST_REQUEST);
    },
  },
};
</script>
