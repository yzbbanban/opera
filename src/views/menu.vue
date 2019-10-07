<template>
  <div>
    <!-- 功能 -->
    <div class="text-right margin-b">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addPopup">父菜单</el-button>
    </div>
    <!-- 列表 -->
    <el-tree :data="dataList"
             node-key="id"
             default-expand-all
             :expand-on-click-node="false"
             :render-content="renderContent"></el-tree>
    <!-- 弹窗 -->
    <el-dialog :title="popupTitle"
               :visible.sync="isShowPopup"
               :lock-scroll='false'
               :close-on-click-modal='false'
               :close-on-press-escape='false'
               :show-close='false'
               width="50%"
               center>
      <!-- 内容 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isShowPopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="editClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowPopup: false,
      popupTitle: '',
      formData: {
        id: '',
        resName: '',
        resKey: '',
        resUrl: '',
        sort: ''
      },
      dataList: [
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
              resName: "首页",
              parentId: 1,
              resKey: "首页",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            {
              id: 2,
              resName: "菜单",
              parentId: 1,
              resKey: "菜单",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            {
              id: 3,
              resName: "角色",
              parentId: 1,
              resKey: "角色",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            {
              id: 4,
              resName: "管理员",
              parentId: 1,
              resKey: "管理员",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            {
              id: 5,
              resName: "操盘手",
              parentId: 1,
              resKey: "操盘手",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            {
              id: 6,
              resName: "交易所",
              parentId: 1,
              resKey: "交易所",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            {
              id: 7,
              resName: "账号",
              parentId: 1,
              resKey: "账号",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            },
            {
              id: 8,
              resName: "交易对",
              parentId: 1,
              resKey: "交易对",
              resType: 2,
              resUrl: "home",
              useable: true,
              sort: 0,
              children: []
            }
          ]
        },
      ]
    }
  },
  methods: {
    // 添加父
    addPopup () {
      this.formData = {}
      this.popupTitle = '父菜单'
      this.isShowPopup = true
    },
    // 添加子
    addPopupEnd (_data) {
      this.formData = _data
      this.popupTitle = '子菜单'
      this.isShowPopup = true
    },
    // 修改
    updatePopup (_data) {
      this.formData = _data
      this.popupTitle = '修改菜单'
      this.isShowPopup = true
    },
    // 删除
    deletePopup (_data) {
      console.log(_data)
      this.$confirm('您确定删除吗?', '删除', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        lockScroll: false,
        type: 'warning'
      }).then(() => {
        this.$message.success('操作成功')
      }).catch(() => { });
    },

    // 渲染
    renderContent (h, { data }) {
      return (
        <span class="custom-tree-node">
          <span>
            <icon
              class="side-icon"
              name={data.resUrl}
              style="margin-right:1rem;"
            />
            <span>{data.resName}</span>
          </span>
          <span>
            <el-button
              icon="el-icon-plus"
              size="mini"
              disabled={data.parentId != 0}
              style={data.parentId == 0 ? '' : 'display:none'}
              type="text"
              on-click={() => this.addPopupEnd(data)}
            >
              子菜单
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.updatePopup(data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.deletePopup(data)}
            >
              删除
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>

<style>
</style>
