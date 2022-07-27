<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="借款额度">
        <el-input-number v-model="integralGrade.borrowAmount"  :min="0" />
      </el-form-item>
      <el-form-item label="积分区间开始">
        <el-input-number v-model="integralGrade.integralStart"  :min="0" />
      </el-form-item>
      <el-form-item label="积分区间结束">
        <el-input-number v-model="integralGrade.integralEnd"  :min="0" />
      </el-form-item>
      <el-form-item >
        <el-button @click="saveOrUpdate()" type="primary" :disabled="saveBtnDisabled">
          保存
        </el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import integralGradeApi from "@/api/core/integral-grade"

export default {

  data() {
    return {
      saveBtnDisabled: false, //是否禁用按钮，防止表单重复提交
      integralGrade: {}
    }
  },

  created() {
    if (this.$route.params.id) {
      this.fetchById(this.$route.params.id)
    }  
  },

  methods: {

    //根据id查询
    fetchById(id){
      integralGradeApi.getById(id).then(response =>{
        this.integralGrade=response.data.record
      })
    },

    //保存或者更新
    saveOrUpdate(){
      //判断id是否存在来判断调用哪个方法
      if(!this.$route.params.id){
        //调用保存方法
        this.saveData()
        this.saveBtnDisabled=true
      }else{
        // 调用更新方法
        this.updateData()
      }



    },
    saveData(){
      integralGradeApi.save(this.integralGrade).then(response =>{
        this.$message.success(response.message)
        //跳转路由到列表界面
        this.$router.push("/core/integral-grade/list")
      })
    },
    updateData(){
      integralGradeApi.update(this.integralGrade).then(response =>{
        this.$message.success(response.message)
        this.$router.push("/core/integral-grade/list")
      })
    }
  },

}
</script>

<style scoped>

</style>
