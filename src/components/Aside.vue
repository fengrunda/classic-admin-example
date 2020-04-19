<template>
  <div class="aside">
    <el-menu
      :default-active="$route.matched.length>2?$route.matched[2].path:null"
      active-text-color="#fff"
      background-color="#2b3245"
      class="el-menu-vertical-demo"
      router
      text-color="#999"
    >
      <template v-for="(nav,index) in navList">
        <el-submenu :index="formatPath(nav.resource) || nav.index.toString()" :key="index" v-if="nav.subSysResources && nav.subSysResources.length > 0">
          <template slot="title">
            <span>{{nav.name}}</span>
          </template>
          <el-menu-item
            :index="formatPath(subNav.resource)"
            :key="subIndex"
            :route="{path: formatPath(subNav.resource)}"
            v-for="(subNav,subIndex) in nav.subSysResources"
          >{{subNav.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="formatPath(nav.resource)" :key="index" :route="{path: formatPath(nav.resource)}" v-else>{{nav.name}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    navList: {
      type: Array,
      required: true
    },
    baseRoutePath: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    formatPath (path) {
      return path.split('/stats')[1]
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-menu-vertical-demo {
  overflow: hidden;
  border: 0;
}
.el-menu-item.is-active {
  background-color: #2082e7 !important;
}
</style>
