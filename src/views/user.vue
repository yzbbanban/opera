//管理员管理
<template>
  <div>
    <!-- 添加 -->
    <div class="right margin-bottom">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addPopup=true">管理员</el-button>
    </div>
    <!-- 列表 -->
    <el-table :data="dataList"
              v-loading="loading"
              :row-class-name="tableState"
              border
              height="700">
      <el-table-column prop="id"
                       label="ID"
                       width="100"
                       align="center">
      </el-table-column>

      <el-table-column prop="account"
                       label="账号"
                       align="center">
      </el-table-column>

      <el-table-column prop="realName"
                       label="姓名"
                       align="center">
      </el-table-column>

      <el-table-column prop="mobile"
                       label="手机号"
                       align="center">
      </el-table-column>

      <el-table-column prop="roleName"
                       label="角色"
                       align="center">
      </el-table-column>

      <el-table-column prop="locked"
                       label="状态"
                       align="center">
        <template slot-scope="scope">
          <el-tag type="danger"
                  v-show="scope.row.locked==true">不可用</el-tag>
          <el-tag type="success"
                  v-show="scope.row.locked==false">可用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="createTime"
                       label="创建时间"
                       width="160"
                       align="center">
        <template slot-scope="scope">
          <!-- <span>{{$dateTimeFormat(scope.row.createTime)}}</span> -->
          <span></span>
        </template>
      </el-table-column>

      <el-table-column prop="op"
                       label="操作"
                       fixed="right"
                       width="250">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="updateOpen(scope.row)"></el-button>
          <el-button v-if="scope.row.locked==true"
                     size="mini"
                     type="danger"
                     @click="lock(scope.row)">解锁</el-button>
          <el-button v-else
                     size="mini"
                     type="success"
                     @click="lock(scope.row)">锁定</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="planOpen(scope.row)">分配角色</el-button>
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

    <!-- 添加管理员 -->
    <el-dialog title="添加管理员"
               :visible.sync="addPopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="addForm"
               label-position="left"
               label-width="80px">

        <el-form-item label="姓名"
                      prop="addrealName">
          <el-input v-model="addForm.addrealName"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="addmobile">
          <el-input v-model="addForm.addmobile"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号"
                      prop="addaccount">
          <el-input v-model="addForm.addaccount"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="addpassword">
          <el-input type="password"
                    v-model="addForm.addpassword"
                    clearable
                    auto-complete="off"
                    show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addPopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="addManage"
                   :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog title="修改用户信息"
               :visible.sync="updatePopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="updateForm"
               label-position="left"
               label-width="80px">

        <el-form-item label="姓名"
                      prop="realName">
          <el-input v-model="updateForm.realName"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="mobile">
          <el-input v-model="updateForm.mobile"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号"
                      prop="account">
          <el-input v-model="updateForm.account"
                    clearable
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updatePopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateManage"
                   :loading="updateLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限 -->
    <el-dialog title="权限"
               :visible.sync="rolePopup"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="30%">
      <el-form :model="roleForm"
               label-position="left"
               label-width="80px">
        <el-form-item label="账号"
                      prop="account">
          <el-input v-model="roleForm.account"
                    clearable
                    auto-complete="off"
                    :disabled="true"></el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色"
                      prop="roleId">
          <el-select v-model="roleForm.roleId"
                     clearable
                     style="width:100%">
            <el-option v-for="(role,index) in roleList"
                       :key="index"
                       :label="role.roleName"
                       :value="role.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="rolePopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="roleListClick"
                   :loading="roleLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  MANAGERS,
  UPDATE_MANAGER,
  LOCK_MANAGER_PWD,
  ADD_MANAGER,
  ROLES,
  ASSIGN_ROLE
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
        addaccount: '',
        addrealName: '',
        addmobile: '',
        addpassword: ''
      },

      // 修改
      updatePopup: false,
      updateLoading: false,
      updateForm: {
        id: '',
        account: '',
        realName: '',
        mobile: ''
      },

      // 分配角色
      roleList: [],
      rolePopup: false,
      roleLoading: false,
      roleForm: {
        id: '',
        account: '',
        roleId: ''
      }
    }
  },
  created () {
    this.getManage()
  },
  methods: {
    // 状态
    tableState ({ row }) {
      if (row.locked === true) {
        return 'danger-row'
      } else if (row.locked === false) {
        return 'success-row'
      }
      return ''
    },
    // 查询管理员
    getManage () {
      this.loading = true
      MANAGERS({ 
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
      this.getManage()
    },

    // 分页（每页条数）
    SizeChange (val) {
      this.PageSize = val
      this.getManage()
    },

    // 添加管理员
    addManage () {
      if (this.$empty(this.addForm.addaccount)) {
        this.$message.error('请输入账号')
        return
      }
      if (this.$empty(this.addForm.addrealName)) {
        this.$message.error('请输入姓名')
        return
      }
      if (this.$empty(this.addForm.addmobile)) {
        this.$message.error('请输入手机号')
        return
      }
      if (this.$empty(this.addForm.addpassword)) {
        this.$message.error('请输入密码')
        return
      }
      this.addLoading = true
      ADD_MANAGER({ 
          account: this.addForm.addaccount,
          pass: this.addForm.addpassword,
          realName: this.addForm.addrealName,
          mobile: this.addForm.addmobile
      }).then(res => {
          this.addLoading = false
          this.$message.success('操作成功')
          this.addPopup = false
          this.getManage()
      })
    },

    // (启动弹窗)修改管理员
    updateOpen (_scope) {
      this.updatePopup = true
      this.updateForm = _scope
    },
    // 修改用户信息
    updateManage () {
      if (this.$empty(this.updateForm.account)) {
        this.$message.error('请输入账号')
        return
      }
      if (this.$empty(this.updateForm.realName)) {
        this.$message.error('请输入真实姓名')
        return
      }
      if (this.$empty(this.updateForm.mobile)) {
        this.$message.error('请输入手机号')
        return
      }
      this.updateLoading = true
      UPDATE_MANAGER({ 
          id: this.updateForm.id,
      account: this.updateForm.account,
      realName: this.updateForm.realName,
      mobile: this.updateForm.mobile
      }).then(res => {
          this.updateLoading = false
        this.$message.success('修改成功')
        this.updatePopup = false
        this.getManage()
      })
      },
    // （启动弹窗）解锁和锁定
    lock (_scopes) {
        this.$confirm(
          _scopes.locked == true
            ? '此操作将解锁管理员, 是否继续?'
            : '此操作将锁定管理员, 是否继续?',
          _scopes.locked == true ? '解锁管理员' : '锁定管理员',
          {
            type: 'warning',
            center: true
          }
        )
        .then(() => {
          LOCK_MANAGER_PWD({ 
              id: _scopes.id,
              locked: _scopes.locked == true ? 'false' : 'true'
          }).then(res => {
              this.$message.success('操作成功') // 操作成功
              this.getManage()
          })
        })
        .catch(() => {
          this.$message.info('取消操作') // 取消操作
        })
    },

    // （启动弹窗）角色分配
    planOpen (_scopes) {
      this.rolePopup = true
      this.roleForm = _scopes
      ROLES({ 
          pageNo: 1,
          pageSize: 100
      }).then(res => {
          this.roleList = res.data.dataList
      })
    },
    // 角色分配
    roleListClick () {
      this.roleLoading = true
      ASSIGN_ROLE({ 
          sysUserId: this.roleForm.id,
          sysRoleId: this.roleForm.roleId
      }).then(res => {
          this.roleLoading = false
          this.$message.success('操作成功')
          this.rolePopup = false
          this.getManage()        
      })
    }
  }
}
</script>
