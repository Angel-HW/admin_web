<template>
  <div id="v-search">
    <div class="search-input">
      <el-select v-model="labelValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input class="input" v-model="inputValue" placeholder="请输入关键字"></el-input>
      <el-button icon="el-icon-search" circle @click="searchData"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSearch',
  data () {
    return {
      options: [{
        label: 'id',
        value: 'id'
      }, {
        label: '名称',
        value: 'name'
      }],
      labelValue: '',
      inputValue: ''
    }
  },
  methods: {
    searchData () {
      this.$emit('searchData', this.labelValue, this.inputValue)
    }
  }
}
</script>

<style lang="scss">
#v-search {
  .search-input {
    display: flex;
    align-items: center;
    .el-form {
      .el-form-item {
        margin: 10px 10px;
      }
    }
    .el-select {
      width: 15%;
    }
    .input {
      width: 30%;
      margin-left: 10px;
    }
    .el-button {
      margin: 10px;
    }
  }
}
</style>
