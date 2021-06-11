import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import subAppList from '@/micro/app'
import MicroRoute from '@/micro/route';
const ErrorPage = () => import('@/pages/error-page')

Vue.use(Router)
import tempRouter from './temp.router.js' // 自动化路由 webpack启动后会自动生成
const routes = [
  {
    path: '',
    redirect: '/navigator',
  },
  {
    path: '/',
    redirect: '/navigator',
  },
  ...tempRouter,
  {
    path: '/404',
    alias: ['/401', '/500'],
    component: ErrorPage,
  },
  // {
  // 	path: '*',
  // 	redirect: '/404'
  // }
]

routes.push(MicroRoute)

const router = new Router({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  const bol = subAppList.some((item) => {
    const context = `/${item.APP_NAME}`
    return to.path.startsWith(context)
  })
  store.commit('TOGGLE_SUBAPPACTIVE', bol)
  next()
})

export default router
