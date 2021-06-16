import Main from '@/components/main';
const Micro = () => import(/* webpackChunkName: "micro" */ './micro.vue');

export default {
  path: '/',
  component: Main,
  children: [
    {
      path: '*',
      component: Micro,
    },
  ],
};
