<template>
  <div class="board">
    <el-card
      v-for="item in subAppList"
      :key="item"
      class="box-card"
      @click.native="navTo(`${item}`)"
    >
      {{ item }}
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subAppList: ['subApp1', 'subApp2', 'subApp3', 'subApp4'],
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

<style lang="less" scoped>
.box-card {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
