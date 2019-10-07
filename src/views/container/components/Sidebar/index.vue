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
      routeData: [
        {
          id: 1,
          resName: "系统管理",
          parentId: 0,
          resKey: "菜单",
          resType: 1,
          resUrl: "home",
          useable: true,
          sort: 100,
          children: [
            {
              id: 1,
              resName: "频道管理",
              parentId: 1,
              resKey: "频道管理",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            // {
            //   id: 2,
            //   resName: "菜单",
            //   parentId: 1,
            //   resKey: "菜单",
            //   resType: 2,
            //   resUrl: "home",
            //   useable: true,
            //   sort: 0,
            //   children: []
            // },
            // {
            //   id: 3,
            //   resName: "角色",
            //   parentId: 1,
            //   resKey: "角色",
            //   resType: 2,
            //   resUrl: "home",
            //   useable: true,
            //   sort: 0,
            //   children: []
            // },
            // {
            //   id: 4,
            //   resName: "管理员",
            //   parentId: 1,
            //   resKey: "管理员",
            //   resType: 2,
            //   resUrl: "home",
            //   useable: true,
            //   sort: 0,
            //   children: []
            // },
            // {
            //   id: 5,
            //   resName: "操盘手",
            //   parentId: 1,
            //   resKey: "操盘手",
            //   resType: 2,
            //   resUrl: "home",
            //   useable: true,
            //   sort: 0,
            //   children: []
            // },
            // {
            //   id: 6,
            //   resName: "交易所",
            //   parentId: 1,
            //   resKey: "交易所",
            //   resType: 2,
            //   resUrl: "home",
            //   useable: true,
            //   sort: 0,
            //   children: []
            // },
            // {
            //   id: 7,
            //   resName: "账号",
            //   parentId: 1,
            //   resKey: "账号",
            //   resType: 2,
            //   resUrl: "home",
            //   useable: true,
            //   sort: 0,
            //   children: []
            // },
            // {
            //   id: 8,
            //   resName: "交易对",
            //   parentId: 1,
            //   resKey: "交易对",
            //   resType: 2,
            //   resUrl: "home",
            //   useable: true,
            //   sort: 0,
            //   children: []
            // }
          ]
        },
      ]
    }
  },
};
</script>


