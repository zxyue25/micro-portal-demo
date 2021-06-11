<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style lang="less">
/* 页面切换动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-16px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(16px);
}

/** 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/** 滚动条轨道 */
::-webkit-scrollbar-track {
  background: none;
}

/** 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  min-height: 28px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}

/** 滚动条没有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
  opacity: 0;
}

#nprogress .bar {
  background: #2d8cf0 !important;
}

body {
  margin: 0;
}
</style>
