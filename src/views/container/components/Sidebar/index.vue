<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical"
             :show-timeout="200"
             :default-active="$route.name"
             :collapse="isCollapse"
             background-color="#304156"
             text-color="#bfcbd9"
             active-text-color="#409EFF"
             :unique-opened="true">
      <!-- 菜单栏 - 组件 -->
      <sidebar-item v-for="route in routeData"
                    :key="route.name"
                    :item="route"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import {
  LIST_BY_ROLE
} from '@/utils/api';
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse () {
      return !this.sidebar.opened;
    }
  },
  data () {
    return {
      routeData:[]
    }
  },
    mounted:function(){
    var _this = this;
    _this.getRoleList();
  },
  methods:{
    getRoleList(){
      LIST_BY_ROLE({ 
          id:0
      }).then(res => {
          this.loading = false
          this.routeData = res.data.children
      })
    }
  }
};
</script>


