// 角色管理
<template>
  <div>
    <!-- 添加 -->
    <div class="right margin-bottom">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addPopup=true">角色</el-button>
    </div>
    <!-- 列表 -->
    <el-table :data="dataList"
              v-loading="loading"
              :row-class-name="tableState"
              height="700"
              border>
      <el-table-column prop="id"
                       label="ID"
                       width="100"
                       align="center">
      </el-table-column>

      <el-table-column prop="roleName"
                       label="名称"
                       width="200"
                       align="center">
      </el-table-column>

      <el-table-column prop="roleStatus"
                       label="状态"
                       width="200"
                       align="center">
        <template slot-scope="scope">
          <el-tag type="danger"
                  v-show="scope.row.roleStatus==0">不可用</el-tag>
          <el-tag type="success"
                  v-show="scope.row.roleStatus==1">可用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="op"
                       label="操作"
                       fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="updateOpen(scope.row)"></el-button>
          <el-button v-if="scope.row.roleStatus==0"
                     size="mini"
                     type="danger"
                     @click="lock(scope.row)">解锁</el-button>
          <el-button v-else
                     size="mini"
                     type="success"
                     @click="lock(scope.row)">锁定</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="planOpen(scope.row)">权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page-box">
      <el-pagination :total="Total"
                     :current-page="CurrentPage"
                     :page-size="PageSize"
                     @size-change="SizeChange"
                     @current-change="CurrentChange"
                     :page-sizes="$pages"
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <!-- 添加角色 -->
    <el-dialog title="添加角色"
               :visible.sync="addPopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="addForm"
               label-position="left"
               label-width="80px">
        <el-form-item label="名称"
                      prop="roleName">
          <el-input v-model="addForm.roleName"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addPopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="addRole"
                   :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改角色 -->
    <el-dialog title="修改角色"
               :visible.sync="updatePopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="updateForm"
               label-position="left"
               label-width="80px">
        <el-form-item label="名称"
                      prop="roleName">
          <el-input v-model="updateForm.roleName"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updatePopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateRole"
                   :loading="updateLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限 -->
    <el-dialog title="权限"
               :visible.sync="planPopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-tree v-loading="planLoading"
               :data="allMenus"
               show-checkbox
               :default-checked-keys="defaultCheckedKeys"
               node-key="id"
               ref="menuTree"
               :props="defaultProps">
      </el-tree>
      <div slot="footer">
        <el-button @click="planPopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="assignPermission()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  ROLES,
  UPDATE_ROLE,
  ADD_ROLE,
  UPDATE_ROLE_STATE,
  GET_MENUS_BY_ROLE,
  ASSIGN_PERMISSIONS,
} from '@/utils/api';
export default {
  data () {
    return {
      // 分页
      CurrentPage: 1,
      PageSize: 10,
      Total: 0,

      // 查询
      loading: false,
      dataList: [],

      // 添加
      addPopup: false,
      addLoading: false,
      addForm: {
        roleName: '',
        addroleKey: 'children'
      },

      // 修改
      updatePopup: false,
      updateLoading: false,
      updateForm: {
        id: '',
        roleName: '',
        roleKey: 'children'
      },

      // 分配权限
      defaultCheckedKeys: [], // 默认选中的菜单
      planPopup: false, // 权限分配对话框是否显示
      planLoading: true, // 分配权限对话框是否显示loading状态
      currentRole: null, // 当前正在操作的角色
      allMenus: [], // 所有菜单
      defaultProps: {
        children: 'children',
        label: 'resName'
      }
    }
  },
  created () {
    this.getRole()
  },
  methods: {
    // 状态
    tableState ({ row }) {
      if (row.roleStatus === 0) {
        return 'danger-row'
      } else if (row.roleStatus === 1) {
        return 'success-row'
      }
      return ''
    },
    // 获取角色列表
    getRole () {
      this.loading = true
        ROLES({ 
          pageNo: this.CurrentPage,
          pageSize: this.PageSize
        }).then(res => {
          this.loading = false
          this.dataList = res.data.dataList
          this.Total = res.data.count
        })
    },
    // 分页（当前页）
    CurrentChange (val) {
      this.CurrentPage = val
      this.getRole()
    },

    // 分页（每页条数）
    SizeChange (val) {
      this.PageSize = val
      this.getRole()
    },
    // 添加角色
    addRole () {
      if (this.$empty(this.addForm.roleName)) {
        // 请输入名称
        this.$message.error('请输入名称')
        return
      }
      this.addLoading = true
      ADD_ROLE({ 
          roleName: this.addForm.roleName,
          roleKey: this.addForm.addroleKey
        }).then(res => {
          this.addLoading = false
          this.$message.success('操作成功') // 操作成功
          this.addPopup = false
          this.getRole()
        })
    },
    // (开启弹窗) 修改角色
    updateOpen (_scope) {
      this.updatePopup = true
      this.updateForm = _scope
    },
    // 修改角色
    updateRole () {
      if (this.$empty(this.updateForm.roleName)) {
        this.$message.error('请输入名称')
        return
      }

      this.updateLoading = true
      UPDATE_ROLE({ 
          id: this.updateForm.id,
          roleName: this.updateForm.roleName,
          roleKey: this.updateForm.roleKey
        }).then(res => {
          this.updateLoading = false
          this.$message.success('操作成功')
          this.updatePopup = false
          this.getRole()
        })
    },

    // 锁定和解锁
    lock (_scopes) {
      this.$confirm(
        _scopes.roleStatus == 0
          ? '此操作将解锁角色, 是否继续?'
          : '此操作将锁定角色, 是否继续?',
        _scopes.roleStatus == 0 ? '解锁角色' : '锁定角色',
        {
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          UPDATE_ROLE_STATE({ 
          id: _scopes.id,
          roleStatus: _scopes.roleStatus == 0 ? '1' : '0'
        }).then(res => {
          this.$message.success('操作成功') // 操作成功
              this.getRole()
        })
        })
        .catch(() => {
          this.$message.info('取消操作') // 取消操作
        })
    },

    // (开启弹窗)分配权限
    planOpen (_scope) {
      this.allMenus = []
      this.planPopup = true
      this.currentRole = _scope
      this.planLoading = true
      this.getRoleMenus()
    },

    // 根据角色获取菜单
    getRoleMenus () {
      GET_MENUS_BY_ROLE({ 
          roleId: this.currentRole.id
        }).then(res => {
          this.allMenus = res.data.children
          this.planLoading = false
          this.defaultCheckedKeys = []
          this.getDefaultCheckedMenus(this.allMenus)
        })
    },

    // 获取默认选中的菜单
    getDefaultCheckedMenus (menus) {
      menus.forEach(menu => {
        if (menu.parentId != 0 && menu.checked) {
          this.defaultCheckedKeys.push(menu.id)
        }
        if (menu.children && menu.children.length > 0) {
          // 递归
          this.getDefaultCheckedMenus(menu.children)
        }
      })
    },

    // 权限菜单分配接口
    assignPermission () {
      let checkedNodes = this.$refs.menuTree.getCheckedNodes()
      if (checkedNodes && checkedNodes.length > 0) {
        let menuIds = []
        checkedNodes.forEach(element => {
          menuIds.push(element.id)
          if (!menuIds.includes(element.parentId) && element.parentId != 0) {
            menuIds.push(element.parentId)
          }
        })
        ASSIGN_PERMISSIONS({ 
          sysRoleId: this.currentRole.id,
            resArr: menuIds.toString()
        }).then(res => {
          this.$message.success('分配成功')
            this.planPopup = false
            this.getRoleMenus()
        })
      } else {
        this.$message.error('至少分配一个权限菜单')
      }
    }
  }
}
</script>