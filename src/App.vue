<template>
  <div id="app">
    <transition appear mode="out-in" name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="less">
// 第三方库样式在此引用，以防构建后样式的覆盖顺序错乱
// @import '../theme/index.css'; // 自定义主题的element-ui样式
@import '~element-ui/lib/theme-chalk/index.css';
@import './assets/less/lib-reset.less';
@import './assets/less/lib-ui.less';
@import './assets/less/style.less';
</style>
