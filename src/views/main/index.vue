<template>
  <el-container class="main">
    <el-header class="bgc-blue">
      <Header></Header>
    </el-header>
    <transition name="fade" mode="out-in" appear>
      <router-view/>
    </transition>
  </el-container>
</template>

<script>
import Header from '@/components/Header_new.vue' // @ is an alias to /src
export default {
  components: {
    Header
  }
}
</script>
<style lang="less" scoped>
.main {
  padding-top: 60px;
}
.el-header {
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 1px 3px 0px rgba(0,0,0,0.2);
}
</style>
