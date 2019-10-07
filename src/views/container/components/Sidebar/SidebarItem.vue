// 菜单栏
<template>
  <div class="menu-wrapper">
    <!-- 没有子节点的 -->
    <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children"
                 :to="{name:item.children[0].resKey}">
      <el-menu-item :index="item.children[0].resKey"
                    :class="{'submenu-title-noDropdown':!isNest}">
        <icon class="side-icon"
              :name="item.children[0].resUrl"
              v-if="item.children[0]&&item.children[0].resUrl"
              style="color:#BFCBD9;font-size:1rem"></icon>
        <span class="fa-icon-cls"
              v-if="item.children[0]&&item.children[0].resName"
              slot="title">{{item.children[0].resName}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else
                :index="item.resKey">

      <!-- 父节点 -->
      <template slot="title">
        <icon class="side-icon"
              :name="item.resUrl"
              v-if="item&&item.resUrl"
              style="color:#BFCBD9;font-size:1rem"></icon>
        <span class="fa-icon-cls"
              v-if="item&&item.resName"
              slot="title">{{item.resName}}</span>
      </template>
      <!-- 子节点 -->
      <template v-for="child in item.children">
        <sidebar-item :is-nest="true"
                      class="nest-menu"
                      v-if="child.children&&child.children.length>0"
                      :item="child"
                      :key="child.resKey"></sidebar-item>
        <router-link v-else
                     :to="{name:child.resKey}"
                     :key="child.resKey">
          <el-menu-item :index="child.resKey">
            <icon class="side-icon"
                  :name="child.resUrl"
                  v-if="child&&child.resUrl"
                  style="color:#BFCBD9;font-size:1rem"></icon>
            <span class="fa-icon-cls"
                  v-if="child&&child.resName"
                  slot="title">{{child.resName}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    // 对象
    item: {
      // route配置json
      type: Object,
      required: true
    },
    // 布尔
    isNest: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    hasOneShowingChildren (children) {
      const showingChildren = children.filter(() => {
        return true;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
.fa-icon-cls {
  margin-left: 0.3rem;
}
.side-icon {
  width: 1rem;
  height: 1rem;
}
</style>



