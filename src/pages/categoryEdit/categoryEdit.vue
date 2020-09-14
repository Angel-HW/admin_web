<template>
  <div id="categoryEdit">
    <h1>新建分类</h1>
    <el-form>
      <el-form-item label="名称">
        <input v-model="model.name" class="input-name" type="text" placeholder="输入分类名称">
        <!-- <el-input class="input-name" type="text" placeholder="输入分类名称"></el-input> -->
      </el-form-item>
      <el-form-item>
         <el-button type="primary"  @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async submit () {
      console.log('提交成功')
      console.log(this.model)
      if (this.model.name) {
        try {
          const data = await this.$http.post('/addCategory', this.model)
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.$router.push('/category/list')
          console.log(data)
        } catch (err) {
          console.log('err!')
          this.$message({
            type: 'error',
            message: '新增失败'
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '请填入数据'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.el-form {
  .el-form-item {
    .input-name {
      width: 30%;
      height: 35px;
      // border-color: #ffffff;
      border-radius: 10px;
      border: 1px solid #DCDFE6;
      padding: 0 5px;
    }
  }
}
</style>
