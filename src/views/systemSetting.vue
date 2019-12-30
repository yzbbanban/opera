<template>
  <div>
    <div class="right margin-bottom">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addPopup=true">父菜单</el-button>
    </div>
    <!-- 树形列表 -->
    <el-tree :data="menuList"
             node-key="id"
             default-expand-all
             :expand-on-click-node="false"
             :render-content="renderContent"></el-tree>
    <!-- 添加父菜单 -->
    <el-dialog title="添加父菜单"
               :visible.sync="addPopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="addForm"
               label-position="left"
               label-width="80px">
        <el-form-item label="菜单名称"
                      prop="resName">
          <el-input v-model="addForm.resName"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由名称"
                      prop="resKey">
          <el-input v-model="addForm.resKey"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标名称"
                      prop="resUrl">
          <el-input v-model="addForm.resUrl"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input v-model="addForm.sort"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addPopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="addParent()"
                   :loading="addLoading">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 添加子菜单 -->
    <el-dialog title="添加子菜单"
               :visible.sync="addPopupTwo"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="addFormTwo"
               label-position="left"
               label-width="80px">
        <el-form-item label="菜单名称"
                      prop="resName">
          <el-input v-model="addFormTwo.resName"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由名称"
                      prop="resKey">
          <el-input v-model="addFormTwo.resKey"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标名称"
                      prop="resUrl">
          <el-input v-model="addFormTwo.resUrl"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input v-model="addFormTwo.sort"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addPopupTwo = false">取 消</el-button>
        <el-button type="primary"
                   @click="addChild"
                   :loading="addLoadingTwo">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 修改菜单 -->
    <el-dialog title="修改菜单"
               :visible.sync="updatePopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="updateForm"
               label-position="left"
               label-width="80px">
        <el-form-item label="菜单名称"
                      prop="resName">
          <el-input v-model="updateForm.resName"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由名称"
                      prop="resKey">
          <el-input v-model="updateForm.resKey"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标名称"
                      prop="resUrl">
          <el-input v-model="updateForm.resUrl"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input v-model="updateForm.sort"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态"
                      prop="useable">
          <el-radio-group v-model="updateForm.useable">
            <el-radio :label="true">可用</el-radio>
            <el-radio :label="false">不可用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updatePopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateMenu()"
                   :loading="updateLoading">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  ALL_MENUS,
  ADD_CHILD_MENU,
  ADD_ROOT_MENU,
  UPDATE_MENU,
  DELETE_MENU
} from '@/utils/api';
export default {
  data () {
    return {
      menuList: [],

      // 添加父菜单
      addPopup: false,
      addLoading: false,
      addForm: {
        resName: '',
        resKey: '',
        resUrl: '',
        sort: ''
      },

      // 添加子菜单
      addPopupTwo: false,
      addLoadingTwo: false,
      addFormTwo: {
        id: '',
        resName: '',
        resKey: '',
        resUrl: '',
        sort: ''
      },

      // 修改
      updatePopup: false,
      updateLoading: false,
      updateForm: {
        id: '',
        resName: '',
        resKey: '',
        resUrl: '',
        parentId: '',
        resType: '',
        useable: '',
        sort: ''
      },
    }
  },
  created () {
    this.getRoles()
  },

  methods: {
    // 查询系统菜单
    getRoles () {
      ALL_MENUS({ 
          id:1
      }).then(res => {
          this.menuList = res.data.children
      })
    },
    // 添加父菜单
    addParent () {
      if (this.$empty(this.addForm.resName)) {
        this.$message.error('请输入菜单名称')
        return
      }
      if (this.$empty(this.addForm.resKey)) {
        this.$message.error('请输入路由名称')
        return
      }
      if (this.$empty(this.addForm.resUrl)) {
        this.$message.error('请输入图标名称')
        return
      }
      if (this.$empty(this.addForm.sort)) {
        this.$message.error('请输入排序')
        return
      }
      this.addLoading = true
      ADD_ROOT_MENU({ 
          resName: this.addForm.resName,
          resKey: this.addForm.resKey,
          resType: 1,
          resUrl: this.addForm.resUrl,
          useable: true,
          sort: this.addForm.sort
      }).then(res => {
          this.addLoading = false
          this.$message.success('新增父菜单成功')
          this.addPopup = false
          this.getRoles()
      })
    },
    // (启动弹窗)添加子菜单
    append (data) {
      this.addPopupTwo = true
      this.addFormTwo.id = data.id
    },
    // 添加子菜单
    addChild () {
      if (this.$empty(this.addFormTwo.resName)) {
        this.$message.error('请输入菜单名称')
        return
      }
      if (this.$empty(this.addFormTwo.resKey)) {
        this.$message.error('请输入路由名称')
        return
      }
      if (this.$empty(this.addFormTwo.resUrl)) {
        this.$message.error('请输入图标名称')
        return
      }
      if (this.$empty(this.addFormTwo.sort)) {
        this.$message.error('请输入排序')
        return
      }
      this.addLoadingTwo = true
      ADD_CHILD_MENU({ 
          resName: this.addFormTwo.resName,
          parentId: this.addFormTwo.id,
          resKey: this.addFormTwo.resKey,
          resType: 2,
          resUrl: this.addFormTwo.resUrl,
          useable: true,
          sort: this.addFormTwo.sort
      }).then(res => {
          this.addLoadingTwo = false
          this.$message.success('新增子菜单成功')
          this.addPopupTwo = false
          this.getRoles()
      })
    },

    // (启动弹窗)修改菜单
    update (data) {
      this.updatePopup = true
      this.updateForm = data
      this.updateForm.useable = data.useable ? true : false
    },
    // 修改菜单
    updateMenu () {
      if (this.$empty(this.updateForm.resName)) {
        this.$message.error('请输入菜单名称')
        return
      }
      if (this.$empty(this.updateForm.resKey)) {
        this.$message.error('请输入路由名称')
        return
      }
      if (this.$empty(this.updateForm.resUrl)) {
        this.$message.error('请输入图标名称')
        return
      }
      if (this.$empty(this.updateForm.sort)) {
        this.$message.error('请输入排序')
        return
      }
      this.updateLoading = true
      UPDATE_MENU({    
        id: this.updateForm.id,
        resName: this.updateForm.resName,
        resKey:this.updateForm.resKey,
        resUrl: this.updateForm.resUrl,
        parentId: this.updateForm.parentId,
        resType: this.updateForm.resType,
        useable: this.updateForm.useable,
        sort: this.updateForm.sort
      }).then(res => {
          this.updateLoading = false
          if (res.code == 200) {
            this.$message.success('修改成功')
            this.updatePopup = false
            this.getRoles()
          }
      })
    },

    // (启动弹窗)删除菜单
    delete (data) {
      this.$confirm('此操作将删除菜单, 是否继续?', '删除菜单', {
        type: 'warning',
        center: true
      })
        .then(() => {
          DELETE_MENU({ 
              id: data.id
          }).then(res => {
            this.$message.success('删除成功') // 操作成功
            this.getRoles()
          })
        })
        .catch(() => {
          this.$message.info('取消操作') // 取消操作
        })
    },

    // 渲染
    renderContent (h, { node, data, store }) {
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
              on-click={() => this.append(data)}
            >
              子菜单
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.delete(data)}
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
