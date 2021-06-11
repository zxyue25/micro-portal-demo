<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <el-tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <div>
        <img
          @click="handleChange"
          v-show="!value"
          class="fullscreen-icon"
          :src="fullscreen"
          alt=""
        />
        <img
          @click="handleChange"
          v-show="value"
          class="fullscreen-icon"
          :src="fullscreenExit"
          alt=""
        />
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'full-screen',
  data() {
    return {
      fullscreen: require('@/assets/img/fullscreen.png'),
      fullscreenExit: require('@/assets/img/fullscreen-exit.png'),
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    },
  },
  methods: {
    handleFullscreen() {
      let main = document.body
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    },
    handleChange() {
      this.$emit('fullScreen')
      this.handleFullscreen()
    },
  },
  mounted() {
    let isFullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    document.addEventListener('fullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('mozfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('webkitfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('msfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    this.$emit('input', isFullscreen)
  },
}
</script>

<style scoped>
.full-screen-btn-con {
  user-select: none;
  cursor: pointer;
  width: 16px;
  height: 16px;
  line-height: 16px;
  margin-right: 20px;
}
.fullscreen-icon {
  vertical-align: middle;
  width: 100%;
}
</style>
