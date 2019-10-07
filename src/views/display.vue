<template>
  <div>
    <!-- 功能 -->
    <div class="text-right margin-b">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addPopup">添加</el-button>
    </div>
    <!-- 列表 -->
    <el-table :data="dataList"
              border
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
      <el-table-column prop="id"
                       label="ID"
                       width="100">
      </el-table-column>
      <el-table-column prop="date"
                       label="日期"
                       width="100">
        <template slot-scope="scope">
          <label>{{$timeFormat(scope.row.date,1)}}</label>
        </template>
      </el-table-column>

      <el-table-column prop="number"
                       label="数量"
                       width="100">
        <template slot-scope="scope">
          <label>{{$toNormalNumber(scope.row.number)}}</label>
        </template>
      </el-table-column>

      <el-table-column prop="state"
                       label="状态"
                       width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state?'success':'info'">{{scope.row.state?'开启':'关闭'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="type"
                       label="类型"
                       width="100">
        <template slot-scope="scope">
          <el-tag type="success"
                  effect="plain"
                  v-if="scope.row.type===1">男</el-tag>
          <el-tag type="success"
                  effect="plain"
                  v-if="scope.row.type===2">女</el-tag>
          <el-tag type="success"
                  effect="plain"
                  v-if="scope.row.type===3">人妖</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="info"
                       label="详情">
      </el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     circle
                     @click="updatePopup(scope.row)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     @click="deletePopup(scope.row)"></el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog :title="$empty(formData.id)?'添加':'修改'"
               :visible.sync="isShowPopup"
               :lock-scroll='false'
               :close-on-click-modal='false'
               :close-on-press-escape='false'
               :show-close='false'
               width="50%"
               center>
      <!-- 内容 -->
      <el-form label-position="left"
               label-width="80px"
               :model="formData">
        <el-form-item label="时间">
          <el-date-picker v-model="formData.date"
                          type="datetime"
                          value-format="timestamp"
                          style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="数字">
          <el-input v-model="formData.number"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.state">
            <el-radio-button :label="true">开启</el-radio-button>
            <el-radio-button :label="false">关闭</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="formData.type">
            <el-radio border
                      :label="1">男</el-radio>
            <el-radio border
                      :label="2">女</el-radio>
            <el-radio border
                      :label="3">人妖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea"
                    autosize
                    v-model="formData.info"></el-input>
        </el-form-item>
      </el-form>
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
      dataList: [{
        id: 1,
        date: 1566790493000,
        number: 1e-8,
        state: false,
        type: 1,
        info: '日期格式（长度为100）；数字（转科学计数法，并去掉末尾0）；状态（tag为实心）；类型（tag为空心）'
      }, {
        id: 2,
        date: 1566790493000,
        number: 123.584658,
        state: true,
        type: 2,
        info: '日期格式（长度为100）；数字（转科学计数法，并去掉末尾0）；状态（tag为实心）；类型（tag为空心）'
      }, {
        id: 3,
        date: 1566790493000,
        number: 100.00000,
        state: false,
        type: 3,
        info: '日期格式（长度为100）；数字（转科学计数法，并去掉末尾0）；状态（tag为实心）；类型（tag为空心）'
      }],
      formData: {
        id: '',
        date: '',
        number: '',
        state: '',
        type: '',
        info: ''
      }
    }
  },
  created () {

  },
  methods: {
    // 添加
    addPopup () {
      this.formData = {}
      this.isShowPopup = true
    },
    //修改
    updatePopup (_scope) {
      this.formData = _scope
      this.isShowPopup = true
    },
    // 执行事件
    editClick () {
      if (this.$empty(this.formData.id)) {
        this.$message.success('操作添加成功')
        this.isShowPopup = false
      } else {
        this.$message.success('操作修改成功')
        this.isShowPopup = false
      }
    },
    // 删除
    deletePopup () {
      this.$confirm('您确定删除吗?', '删除', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        lockScroll: false,
        type: 'warning'
      }).then(() => {
        this.$message.success('操作成功')
      }).catch(() => { });
    }
  }
}
</script>


