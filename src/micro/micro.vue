<template>
  <div v-if="subAppActive" id="micro-sub-app"></div>
</template>

<script>
import store from '@/store'
import subAppList from '@/micro/app'
import { start } from '@/micro'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      subAppList,
    }
  },
  computed: {
    ...mapState(['subAppActive']),
  },
  watch: {
    $route(val) {
      this.handleRouteChange(val)
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.handleRouteChange.apply(vm, [to])
    })
  },
  mounted() {
    if (!window.subappRegister) { //注册一次
      window.subappRegister = true
      start()
    }
  },
  methods: {
    // 监听路由变化，判断访问的是否是子系统
    handleRouteChange() {
      const bol = this.isMicroSub(this.subAppList, this.$route.path)
      store.commit('TOGGLE_SUBAPPACTIVE', bol)
      if (bol) {
        // 获取当前访问的子系统
        const microSub = this.getMicroSub(this.subAppList, this.$route.path)
        // 添加 hash模式全屏
        if (
          this.$route.path.startsWith(`${microSub.entry}/full`) ||
          (this.$route.hash && this.$route.hash.startsWith('#/full'))
        ) {
          // mounted后执行
          setTimeout(() => {
            window.eventCenter.emit('SYSTEM_FULL_SCREEN')
          })
        } else if (window.__IS_FULL_SCREEN) {
          window.eventCenter.emit('SYSTEM_EXIT_FULL_SCREEN')
        }
      } else {
        this.$router.replace({
          path: '/404',
        })
      }
    },
    // 检测路由是否为子应用
    isMicroSub(list, path) {
      return list.some((item) => {
        const context = `/${item.APP_NAME}`
        return path.startsWith(context)
      })
    },
    // 获取激活的子应用
    getMicroSub(list, path) {
      return list.find((item) => {
        const context = `/${item.APP_NAME}`
        return path.startsWith(context)
      })
    },
  },
}
</script>
