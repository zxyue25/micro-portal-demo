<template>
  <el-aside class="page-aside__container" width="200px">
    <slot name="page-sidemenu"></slot>
  </el-aside>
</template>

<style scoped>
.page-aside__container {
  position: relative;
  height: 100%;
  background-color: #212121;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
</style>
