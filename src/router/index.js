import Vue from 'vue';
import VueRouter from 'vue-router';
import ScoreboardView from '@/views/ScoreboardView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'scoreboard',
    component: ScoreboardView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
