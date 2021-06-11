<template>
  <el-main class="error-page">
    <img :src="imgObj[path.replace('/', '')]" />
    <div class="text-con">
      <h4>{{ path.replace('/', '') }}</h4>
      <h5 style="margin:33px 0;" v-if="desc">{{ desc }}</h5>
      <div class="btnhome">
        <el-button type="primary" @click="backHome()">回到首页</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'error_page',
  props: {
    path: String,
    desc: String,
  },
  data() {
    return {
      imgObj: {
        401: require('@/assets/img/401.png'),
        404: require('@/assets/img/404.png'),
        500: require('@/assets/img/500.png'),
      },
    }
  },
  //   watch: {
  //     path: {
  //       handler() {
  //         this.imgSrc = require(`../assets/img${this.path}.png`)
  //         // eslint-disable-next-line no-debugger
  //         debugger
  //       },
  //       immediate: true,
  //     },
  //   },
  //   computed: {
  //     imgSrc() {
  //         this[this.path.replace('/', '')]
  //         debugger
  //       return this[this.path.replace('/', '')]
  //     },
  //   },
  methods: {
    backHome() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="less" scoped>
.error-page {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  &::before,
  &::after {
    content: '';
    display: block;
  }

  img {
    width: 500px;
  }

  .text-con {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
    transform: translateY(60px);

    h4 {
      margin: 0;
      font-size: 96px;
      line-height: 120px;
      color: #000620;
      text-align: left;
      opacity: 0.87;
    }

    h5 {
      font-size: 20px;
      line-height: 28px;
      color: rgba(0, 6, 32, 0.38);
      letter-spacing: 0;
    }
  }
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.dark .error-page {
  background: #1f1f1f;

  .text-con {
    h4 {
      color: rgba(255, 255, 255, 0.8);
    }

    h5 {
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
