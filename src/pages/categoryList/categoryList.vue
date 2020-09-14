<template>
  <div id="categoryEdit">
    <span>这是分类列表</span>
    <v-search
      @searchData="searchData"
    ></v-search>
    <el-table
      :data="this.tableData"
      style="max-width:100%">
      <el-table-column
        prop="id"
        label="id"
        width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="showVdiolagy(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteData(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagina">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currnetPage"
        :page-sizes="this.pageSizes"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
    <!-- 弹窗  -->
    <v-diolagy
      v-show="showVd"
      :showVdMsg="showVdMsg"
      @showDio="colseDio"
      @changeData="changeData"
    >
    </v-diolagy>
  </div>
</template>

<script>
import VDiolagy from '@/components/v-diolagy'
import VSearch from '@/components/v-search'

export default {
  components: {
    VDiolagy,
    VSearch
  },
  data () {
    return {
      tableData: [
        // { id: 1, name: '死歌', age: 480 },
        // { id: 2, name: 'zouyi', age: 20 }
      ],
      searchTableData: [],
      showVd: false,
      showVdMsg: {
        id: '',
        name: ''
      },
      pageSize: 4,
      pageSizes: [4, 8, 12, 16],
      currnetPage: 1,
      total: 0,
      searchChangeSize: false
    }
  },
  methods: {
    // 修改每页数量
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      if (!this.searchChangeSize) {
        this.getListData()
      } else {
        this.searchFenye()
      }
      // this.currnetPage = 1
    },
    // 修改当前页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currnetPage = val
      if (!this.searchChangeSize) {
        this.getListData()
      } else {
        this.searchFenye()
      }
    },
    // 获取列表总数量
    async getListCount () {
      try {
        const res = await this.$http.get('/getListCount')
        this.total = res.data[0].count
      } catch (_err) {
        console.log('err！')
        this.$message({
          type: 'error',
          message: '连接失败'
        })
      }
    },
    // 获取列表数据
    async getListData () {
      try {
        const startData = (this.currnetPage - 1) * this.pageSize
        const countData = this.pageSize
        const res = await this.$http.get('/getList', { startData, countData })
        console.log('success!')
        console.log(res)
        this.tableData = res.data
      } catch (_err) {
        console.log('err！')
        this.$message({
          type: 'error',
          message: '连接失败'
        })
      }
    },
    // 删除数据
    deleteData (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$http.get('/deleteData', id)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.searchChangeSize = false
          this.getListCount()
          this.getListData()
        } catch (err) {
          this.$message({
            type: 'error',
            message: '出错了'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 关闭弹窗
    colseDio (value) {
      this.showVd = value
    },
    // 打开弹窗
    showVdiolagy (showValue) {
      this.showVd = true
      this.showVdMsg = showValue
    },
    // 修改数据
    async changeData (id, name) {
      try {
        await this.$http.post('/editData', {
          dataId: id,
          dataName: name
        })
        this.$router.go(0)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      } catch (_err) {
        this.$message({
          type: 'error',
          message: '修改失败'
        })
      }
    },
    // 搜索
    async searchData (label, input) {
      if (!label || !input) {
        this.$message({
          type: 'error',
          message: '请输入查询条件'
        })
        return
      }
      try {
        // 去掉可能输入的空格
        input = input.replace(/\s/g, '')
        const res = await this.$http.post('/searchData', { label, input })
        // 所有符合条件的数据都返回，存在searchTableData里面
        this.searchTableData = res.data
        this.total = this.searchTableData.length
        this.searchChangeSize = true
        this.currnetPage = 1
        this.searchFenye()
        this.$message({
          type: 'success',
          message: '查询成功'
        })
      } catch (_err) {
        this.$message({
          type: 'error',
          message: '查询失败'
        })
      }
    },
    searchFenye () {
      const startData = (this.currnetPage - 1) * this.pageSize
      const endData = startData + this.pageSize
      this.tableData = this.searchTableData.slice(startData, endData)
    }
  },
  created () {
    this.getListCount()
    this.getListData()
  }
}
</script>

<style lang="scss">
#categoryEdit {
  position: relative;
  .pagina {
    margin-top: 15px;
  }
}
</style>
