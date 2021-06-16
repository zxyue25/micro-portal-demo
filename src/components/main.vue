<template>
  <basic-layout :user-name="userName" @logout-click="handleLogoutClick">
    <template slot="page-main">
      <!-- <keep-alive>
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive> -->
      <router-view></router-view>
    </template>
  </basic-layout>
</template>

<script>
import BasicLayout from '@/layouts/basic-layout'
import { metaJSONTree as routes } from '@/router/temp.router'
import { getUserInfo, logout } from '@/api'
export default {
  components: {
    BasicLayout,
  },
  data() {
    return {
      userName: '用户名',
      routes: JSON.stringify(routes),
    }
  },
  async created() {
    try {
      const res = await getUserInfo()
      if (res.success) {
        const { data } = res
        this.userName = data.username || data.erp || "用户名"
      }
    } catch (e) {
      this.$message.error(e)
    }
  },
  mounted() {},
  computed: {},
  methods: {
    async handleLogoutClick() {
        try {
          const res = await logout()
          if (res.success) {
            localStorage.clear()
            location.href =
              window.globalVariables.VUE_APP_LOGOUT_URL +
              '?return_url=' +
              window.globalUrl.common.replace('/market-common', '')
          } else {
            this.$message.error(res.desc)
          }
        } catch (e) {
          this.$message.error(e)
        }
    },
  },
}
</script>
