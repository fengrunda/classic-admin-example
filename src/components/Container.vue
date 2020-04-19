<template>
  <el-container :class="{'has-aside':navList.length > 0}" class="container">
    <el-aside class="side-nav" v-if="navList.length > 0" width="200px">
      <Aside :base-route-path="baseRoute.path" :key="baseRoute.path" :nav-list="navList"></Aside>
    </el-aside>
    <el-container>
      <!-- <el-main> -->
      <transition mode="out-in" name="fade">
        <router-view :key="$route.matched.length > 2 ? $route.matched[2].path : null"></router-view>
      </transition>
      <!-- </el-main> -->
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
export default {
  computed: {
    baseRoute () {
      return this.$route.matched[1]
    },
    navList () {
      const menuList = this.$store.state.api.getMenuList.data || []
      const { subSysResources: list = [] } = menuList.find(menu => {
        try {
          return menu.resource.split('/')[2] === this.baseRoute.name
        } catch (e) { }
      }) || {}

      if (list.length > 0 && this.$route.matched.length === 2) {
        // console.log(this.getPath(list[0]))
        this.$router.replace({ path: this.formatPath(this.getPath(list[0])) })
      }
      return list
    }
  },
  methods: {
    getNavList () {
      const menuList = this.$store.state.api.getMenuList.data || []
      const { subSysResources: list = [] } = menuList.find(menu => {
        try {
          return menu.resource.split('/')[2] === this.baseRoute.name
        } catch (e) { }
      }) || {}
      return list
    },
    getPath (menuItem) {
      if (menuItem) {
        let path = ''
        if (menuItem.subSysResources && menuItem.subSysResources.length > 0) {
          path = this.getPath(menuItem.subSysResources[0])
        }
        // console.log(path)
        return path || menuItem.resource
      }
    },
    formatPath (path) {
      return path.split('/stats')[1]
    }
  },
  created () {
    // console.log(this.$route)
    // if (this.$route.matched.length === 2 && this.navList.length > 0) {
    //   this.$router.replace({ path: this.baseRoute.path + this.getPath(this.navList[0]) });
    // }
  },
  components: {
    Aside,
    Footer
  }
}
</script>
<style lang="less" scoped>
.container {
  &.has-aside {
    padding-left: 200px;
  }
}
.side-nav {
  background-color: #2b3245;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  overflow: auto;
}
</style>
