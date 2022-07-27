<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <!-- Excel导入按钮 -->
      <el-button
        @click="dialogVisible = true"
        type="primary"
        size="mini"
        icon="el-icon-download"
      >
        导入Excel
      </el-button>

      <!-- Excel导出按钮 -->
      <el-button
        @click="exportData"
        type="primary"
        size="mini"
        icon="el-icon-upload2"
      >
        导出Excel
      </el-button>
    </div>

    <!-- dialog -->
    <el-dialog title="数据字典导入" :visible.sync="dialogVisible" width="20%">
      <el-form>
        <el-form-item label="请选择Excel文件">
          <el-upload
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-exceed="fileUploadExceed"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :action="BASE_API + '/admin/core/dict/import'"
            name="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

    <el-table :data="list" border row-key="id" lazy :load="load">
      <el-table-column label="名称" align="left" prop="name" />
      <el-table-column label="编码" prop="dictCode" />
      <el-table-column label="值" align="left" prop="value" />
    </el-table>
  </div>
</template>

<script>
import dictApi from '@/api/core/dict'
export default {
  data() {
    return {
      dialogVisible: false, //控制对话框是否显示
      BASE_API: process.env.VUE_APP_BASE_API , //获取基地址
      list:[]  //展示列表数据
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    //上传成功回调
    fileUploadSuccess(response){
      if(response.code==0){
        this.$message.success('数据导入成功')
        this.dialogVisible=false
      }else{
        this.$message.error(response.message)
      }
    },
    //上传失败回调（通信故障等的失败）
    fileUploadError(response){
      this.$message.error('数据导入失败')
    },
    //下载文件
    exportData(){
      //直接下载，不发送Ajax请求
      window.location.href=this.BASE_API+'/admin/core/dict/export'
    },
    //列表数据拉取
    fetchData(){
      dictApi.listByParentId(1).then(response =>{
        this.list = response.data.list
      })
    },
    //加载二级节点
    load(tree,treeNode,resolve){
      //加载数据
      dictApi.listByParentId(tree.id).then(response =>{
        resolve(response.data.list)
      })

    }
  },

}
</script>

<style>

</style>