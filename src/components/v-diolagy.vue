<template>
  <div id="diolagy"
  >
    <el-form v-model="showVdMsg" label-width="80px">
      <el-form-item label="id">
        <el-input v-model="showVdMsg.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="showVdMsg.name"></el-input>
      </el-form-item>
      <div class="operate">
        <el-button type="primary" round @click="determine(showVdMsg.id, showVdMsg.name)">确定</el-button>
        <el-button type="info" round @click="cancel()">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Vdiolagy',
  props: {
    showVdMsg: {
      type: Object,
      default: function () {
        return {
          id: '',
          name: ''
        }
      }
    }
  },
  data () {
    return {
      showVd: false
    }
  },
  methods: {
    // 将需要修改的数据id传到父组件
    determine (id, name) {
      console.log('yes')
      this.$emit('changeData', id, name)
    },
    cancel () {
      this.$emit('showDio', this.showVd)
    }
  }
}
</script>

<style lang="scss">
#diolagy {
  width: 600px;
  height: 200px;
  padding: 20px 5px;
  box-sizing: border-box;
  // position: absolute;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
  z-index: 1000;
  .el-form {
    width: 80%;
    margin: 0 auto;
    .el-form-item {
      .el-input {
        width: 90%;
      }
    }
    .operate {
      text-align: center;
    }
  }
}
</style>
