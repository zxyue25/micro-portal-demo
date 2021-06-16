<template>
  <div class="navigator">
    <header class="header-top">
      <h1>Logo</h1>
      <div @click="navTo('/board')" class="header-top-board">控制台</div>
    </header>

    <section class="sub-list">
      <el-card
        class="sub-list-item"
        v-for="item in subAppList"
        :key="item.name"
        @click.native="navTo(`${item.name}`)"
      >
        {{ item.name }}
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'navigator',
  data() {
    return {
      subAppList: [
        {
          name: 'subApp1',
        },
        {
          name: 'subApp2',
        },
        {
          name: 'subApp3',
        },
        {
          name: 'subApp4',
        },
      ],
    }
  },
  methods: {
    navTo(path) {
      this.$router.push({
        path,
      })
    },
  },
}
</script>
<style lang="less">
body {
  margin: 0;
}
.navigator {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: radial-gradient(
    circle,
    rgba(28, 38, 84, 1) 0%,
    rgba(13, 15, 50, 1) 100%
  );
  color: #fff;
}
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 40px;

  &-board {
    cursor: pointer;
  }
}

.sub-list {
  display: flex;
  justify-content: space-around;

  &-item {
    width: 23%;
    cursor: pointer;
  }
}
</style>
