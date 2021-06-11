<template>
  <el-header class="page-header">
    <div class="page-header__name" @click="navTo('/navigator')">
      <img class="page-header__logo" :src="logoUrl" />
    </div>

    <div class="page-header__right">
      <div
        @click="navTo('/board')"
        :class="{
          'page-header__right-tab': true,
          isActive: $route.path === '/board',
        }"
        isBoard
      >
        控制台
      </div>
      <div
        @click="navTo('/auth')"
        :class="{
          'page-header__right-tab': true,
          isActive: $route.path === '/auth',
        }"
      >
        权限管理
      </div>
      <full-screen
        v-model="isFullscreen"
        @fullScreen="$emit('fullScreen')"
      ></full-screen>
      <el-dropdown @command="handleCommand">
        <span class="page-header__right-user">
          <img
            class="page-header__right-user__img"
            :src="avatarUrl"
          />
          <span style="margin-right: 10px;">
            {{ userName }} <i class="el-icon-caret-bottom"></i>
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout" style="text-algin: center">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import FullScreen from './full-screen'
export default {
  components: { FullScreen },
  data() {
    return {
      isFullscreen: false,
      logoUrl: require('@/assets/img/logo.png'),
      avatarUrl: require('@/assets/img/avatar.png'),
    }
  },
  props: {
    userName: {
      type: String,
      default: '用户名',
    },
  },
  methods: {
    async handleCommand(command) {
      if (command == 'loginout') {
        this.$emit('logout-click')
      }
    },
    navTo(path) {
      this.$router.push({
        path
      })
    },
  },
}
</script>
<style lang="less" scoped>
.page-header {
  position: relative;
  background-color: #212121;

  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.page-header__name {
  display: flex;
  color: #fff;
  font-weight: 300;
  width: 200px;
  cursor: pointer;
}

.page-header__logo {
  width: 116px;
  height: 26px;
  margin: 16px;
}

.page-header__right {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 50px;

  &-user {
    display: flex;
    align-content: center;
    color: #fff;
    font-weight: 300;
    cursor: pointer;

    &:hover {
      background-color: #202632;
    }
  }
}

.page-header__right-user__img {
  height: 24px;
  width: 24px;
  margin: auto 10px;
}

.page-header__right-tab {
  color: #fff;
  font-size: 14px;
  padding: 0 20px;
  font-weight: 300;
  cursor: pointer;

  &:hover {
    background-color: #202632;
  }
}

.page-header__span {
  padding-left: 20px;
}

.el-dropdown-menu__item {
  text-align: center;
}

.isActive {
  background-color: #202632;
}
</style>
