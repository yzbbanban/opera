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

      <el-table-column prop="number"
                       label="用户"
                       width="100">
        <template slot-scope="scope">
          <label>{{$toNormalNumber(scope.row.mobile)}}</label>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="number"
                       label="线别"
                       width="100">
        <template slot-scope="scope">
          <label>{{$toNormalNumber(scope.row.xid)}}</label>
        </template>
      </el-table-column> -->

      <el-table-column prop="number"
                       label="员工看板"
                       width="250">
        <template slot-scope="scope">
          <label>{{$toNormalNumber(scope.row.staffUrl)}}</label>
        </template>
      </el-table-column>

      <el-table-column prop="number"
                       label="客户看板"
                       width="250">
        <template slot-scope="scope">
          <label>{{$toNormalNumber(scope.row.customUrl)}}</label>
        </template>
      </el-table-column>

      <el-table-column prop="state"
                       label="状态"
                       width="100">
        <template slot-scope="scope">
          <el-tag
           :type="scope.row.delTag?'info':'success'">{{scope.row.delTag?'不可用':'可用'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="info"
                       label="备注">
                       <template slot-scope="scope">
          <label>{{scope.row.remark}}</label>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     circle
                     @click="updatePopup(scope.row)"></el-button>

          <el-switch style="margin-left:20px"
            v-model="scope.row.delTag" height="30"
            active-color="#ff4949" @change="updateDelTag(scope.row)"
            inactive-color="#13ce66">
          </el-switch>
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
        <!-- <el-form-item label="请选择">
          <el-select v-model="valueUser" placeholder="用户">
            <el-option
              v-for="item in optionsUser"
              :key="item.valueUser"
              :label="item.label"
              :value="item.valueUser">
            </el-option>
          </el-select> -->
          <!-- <el-select v-model="valueTx" filterable placeholder="线别">
            <el-option
              v-for="item in optionsTx"
              :key="item.valueTx"
              :label="item.label"
              :value="item.valueTx">
            </el-option>
          </el-select> -->
          <!-- <el-input style="width:30%"
            placeholder="请输入线别"
            v-model="valueTx"
            clearable>
          </el-input> -->

        <!-- </el-form-item> -->
        <el-form-item label="员工看板">
          <el-input v-model="formData.staffUrl"></el-input>
        </el-form-item>
        <el-form-item label="客户看板">
          <el-input v-model="formData.customUrl"></el-input>
        </el-form-item>
        <!-- <el-form-item label="备注">
          <el-input type="textarea"
                    autosize
                    v-model="formData.remark"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isShowPopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="editClick()">确 定</el-button>
      </span>
    </el-dialog>
    <div style="float:right">
      <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="total, prev, pager, next"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { listUser } from '@/utils/api';
import { listUrl } from '@/utils/api';
import { line } from '@/utils/api';
import { updateUrl } from '@/utils/api';
import { addUrl } from '@/utils/api';
import { delUrl } from '@/utils/api';
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      optionsUser:[{valueUser:1,lable:2}],
      optionsTx:[{valueTx:1,lable:2}],
      totalCount:1,
      currentPage:1,
      valueUser:'',
      valueTx:'',
      option:'',
      pageSize:10,
      isShowPopup: false,
      dataList: [],
      formData: {
        id: '',
        mobile: '',
        staffUrl: '',
        customUrl: '',
        xid: '',
        remark: '',
        delTag: ''
      }
    }
  },
  created () {

  },
  mounted:function(){
    var _this = this;
    _this.getUrlList();
    _this.getUserList();
    _this.getLineList();
  },
  methods: {
    searchBlur(e) {
      this.valueTx = e.target.value
      console.log('===>'+this.valueTx )
      
	  },
    // 添加
    addPopup () {
      this.formData = {}
      this.isShowPopup = true
    },
    //修改
    updatePopup (_scope) {
      this.formData = _scope
      this.isShowPopup = true
      this.valueTx=this.formData.valueTx
    },
    // 执行事件
    editClick () {
            // console.log('==optionsUser==>'+this.valueUser)
            // console.log('==optionsTx==>'+this.valueTx)
      if (this.$empty(this.formData.id)) {
        var _this=this
        addUrl({ 
            sysUserId:this.valueUser,
            staffUrl:this.formData.staffUrl,
            customUrl:this.formData.customUrl,
            xid:this.valueTx,
            remark:this.formData.remark,
        }).then(res => {
            this.$message.success('操作添加成功')
        })
        this.isShowPopup = false
      } else {
        var _this=this
        updateUrl({ 
            id:this.formData.id,
            sysUserId:this.valueUser,
            staffUrl:this.formData.staffUrl,
            customUrl:this.formData.customUrl,
            xid:this.valueTx,
            remark:this.formData.remark,
        }).then(res => {
            this.$message.success('操作修改成功')
        })
        this.isShowPopup = false
      }
    },
    getUserList () {
        var _this=this
        listUser({ 
            pageNo:1,
            pageSize: 10
        }).then(res => {
          for(var i=0;i<res.data.dataList.length;i++){
            var user=res.data.dataList[i]
              var  x={valueUser: user.id,label:user.mobile}
              _this.optionsUser[i]=x;
          }
        })
    },
    getLineList () {
        var _this=this
        line({ 
        }).then(res => {
            // console.log('====>'+JSON.stringify(res.data))
            _this.optionsTx=[{valueTx:1,lable:1},{valueTx:2,lable:2},{valueTx:3,lable:3},{valueTx:4,lable:4}]
        })
    },

    // 删除
    deletePopup (row) {
      console.log('==row1==>'+row.id)
      var str='您确定删除吗?'
      if(row.delTag){
        str='确定恢复可用吗'
      }
      this.$confirm(str, '执行', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        lockScroll: false,
        type: 'warning'
      }).then(() => {

      }).catch(() => { });
    },
    getUrlList(){
        var _this=this
        listUrl({ 
            pageNo:_this.currentPage,
            pageSize: _this.pageSize
        }).then(res => {
            _this.dataList=res.data.dataList
            var count=res.data.count
            console.log('===count=>'+count)
            _this.totalCount=count
        })
    },
    updateDelTag(row){
      // console.log('==row==>'+row.id)
      delUrl({ 
            id:row.id
        }).then(res => {
            this.$message.success('操作成功')

        })
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage=val
        listUrl({ 
            pageNo: this.currentPage,
            pageSize: this.pageSize
        }).then(res => {
            this.dataList=res.data.dataList
            this.totalCount=res.data.count
            // console.log('====>'+this.totalCount)
        })
    }
  }
}
</script>


