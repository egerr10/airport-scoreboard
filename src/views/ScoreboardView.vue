<template>
  <div>
    <div class="blue-wrap">
      <div class="container">
        <div class="top-bar">
          <el-tooltip class="item" effect="dark" :content="changeRoleTitle" placement="bottom-end">
            <i class="text_24 text_white cp" :class="userIcon" @click="changeRole" />
          </el-tooltip>
        </div>

        <h1 class="text_60 text_white mb_40">Онлайн-табло</h1>

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
import { mapGetters } from 'vuex';
import { USER_ROLE_CHANGE } from '@/store/actions/dictionary';
import ScoreboardArrival from '@/components/scoreboard-arrival';
import ScoreboardDeparture from '@/components/scoreboard-departure';

export default {
  name: 'ScoreboardView',
  components: { ScoreboardDeparture, ScoreboardArrival },
  data() {
    return {
      component: 'ScoreboardDeparture',
    };
  },
  created() {
    if (this.$route.query.admin) {
      this.changeRole();
    }
  },
  computed: {
    ...mapGetters(['dictionary']),
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
  },
};
</script>
