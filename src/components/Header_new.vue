<template>
  <div class="header">
    <router-link class="logo" to="/">
      <div class="header-logo">
        <h1>
          <span class="icon icon-logo"></span>
          <span class="header-icon-content">运营数据后台</span>
        </h1>
      </div>
    </router-link>
    <nav class="nav-bar">
      <router-link
        :class="{'active': checkActive(menu.resource)}"
        :key="index"
        :to="{path: formatPath(menu.resource)}"
        class="nav-btn"
        v-for="(menu,index) in menuList"
      >{{menu.name}}</router-link>
    </nav>
    <div class="tool-bar">
      <!-- <a
        class="nav-btn"
        style="width:160px;"
        :href="`${sugoGateway}#/sugoGateway?phone=${(systemInfo.login && systemInfo.login.mobile)?systemInfo.login.mobile:''}`"
        target="_blank"
      >数果多维分析系统</a>-->
      <el-dropdown>
        <div class="header-myInfo">
          <div class="header-myInfo-content">
            <span v-if="systemInfo.login">{{ systemInfo.login.realName }}</span>
            <span v-if="systemInfo.role">{{`（${systemInfo.role.name}，${systemInfo.environment}）`}}</span>
          </div>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">返回首页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: this.$store.state.api.getMenuList.data || [],
      sugoGateway: ''
    }
  },
  computed: {
    baseRoute () {
      return this.$route.matched[1] || {}
    },
    systemInfo () {
      return this.$store.state.api.getSystemInfo.data || {}
    }
  },
  methods: {
    checkActive (menuTo) {
      return this.baseRoute.name === menuTo.split('/')[2]
    },
    formatPath (path) {
      return path.split('/stats')[1]
    },
    async logout () {
      try {
        await this.$store.dispatch('api/logout')
        this.$store.dispatch('backToMain')
      } catch (error) {
        this.$message.error(this.$errorFormatter(error))
      }
    }
  },
  created () {
    let url = ''
    switch (location.hostname) {
      case '192.168.197.113':
        url = 'http://192.168.197.19:8801/'
        break
      case 'stats.zizai.test.thinkinpower.net':
        url = 'http://s.zizai.test.thinkinpower.net/'
        break
      case 'stats.zizai.pre.thinkinpower.net':
        url = 'http://s.zizai.pre.thinkinpower.net/'
        break
      case 'stats.zizai.thinkinpower.com':
        url = 'http://s.zizai.thinkinpower.com/'
        break
    }
    if (url) {
      // console.log(location.hostname, url);
      this.sugoGateway = url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #0866c6;
}
.logo {
  flex: 0 0 auto;
  width: 200px;
  height: 100%;
  background-color: #2082e7;
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  .header-logo {
    padding-left: 20px;
    min-width: 200px;
    h1 {
      display: flex;
      font-size: 18px;
      align-items: center;
      .header-icon-content {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.nav-bar {
  flex: 1 1 auto;
  height: 100%;
  display: flex;
}
.nav-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  padding: 10px;
  width: 100px;
  height: 100%;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
  &:hover,
  &.active {
    font-size: 16px;
    font-weight: bold;
  }
}
.tool-bar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  .header-myInfo {
    display: flex;
    align-items: center;
    padding-right: 20px;
    color: #ffffff;
    cursor: pointer;
  }
  .header-myInfo-icon {
    display: block;
  }
  .header-myInfo-arrow {
    display: block;
  }
  .header-bell {
    margin-right: 30px;
    cursor: pointer;
    /deep/.el-badge__content {
      border: none;
    }
  }
}
.icon-logo {
  // .bgImg('../assets/images/logo.png', 0.4);
  margin-right: 10px;
}
</style>
