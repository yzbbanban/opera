<template>
  <el-menu class="navbar"
           mode="horizontal">

    <!-- 收缩按钮 -->
    <hamburger class="hamburger-container"
               :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>

    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <!-- 头部右侧 选项 -->
    <div class="right-menu">
      <!-- 全屏 -->
      <el-tooltip effect="dark"
                  content="全屏"
                  placement="bottom">
        <screenfull class="right-menu-item"></screenfull>
      </el-tooltip>

      <!-- 快捷菜单 -->
      <el-dropdown class="right-menu-item">
        <el-button type="primary"
                   size="mini">
          用户名
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              <!-- 首页 -->
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/modifyPassword">
            <el-dropdown-item>
              <!-- 修改密码 -->
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout()"
                  style="display:block;">
              <!-- 退出 -->
              退出
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 国际化 -->
      <el-dropdown class="right-menu-item"
                   @command="changeLang">
        <a href="javascript:void(0);">
          {{getLang()}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cn">简体中文</el-dropdown-item>
          <el-dropdown-item command="tw">繁體中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
import Screenfull from "@/components/Screenfull";

export default {
  data () {
    return {};
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters(["sidebar"])
  },

  methods: {
    //收缩按钮事件
    toggleSideBar () {
      this.$store.dispatch("toggleSideBar");
    },
    // 切换国际化
    changeLang (lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
    },
    // 选中文案
    getLang () {
      let lang = this.$i18n.locale;
      switch (lang) {
        case "cn":
          return "简体中文";
        case "tw":
          return "繁體中文";
        case "en":
          return "English";
        case "ja":
          return "日本語";
        case "ko":
          return "한국어";
      }
    },
    //退出登录
    logout () {
      this.$router.push("/login");
      // 已退出
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 0.5rem 0 1rem;
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }

    .theme-switch {
      vertical-align: 15px;
    }
  }
}
</style>
