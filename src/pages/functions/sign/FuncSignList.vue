<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item label="所在地：" prop="location">
          <el-input v-model="formInline.location"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch('formInline')">查询</el-button>
          <el-button type="default" @click="onClear('formInline')">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;" v-loading.lock="loading">
      <el-table :data="onePageTableData" style="width: 100%">
        <el-table-column label="#" width="40">
          <template slot-scope="scope">
            <span>{{ scope.row.sid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>备注: {{ scope.row.comment }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="年龄" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="QQ" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.qq }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="学历"
          width="100"
          :filters="[{ text: '中专', value: '中专' }, { text: '大专', value: '大专' }, {text: '本科', value: '本科'}]"
          :filter-method="filterEducation"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.education }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在地" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保名时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="$route.meta.permission.includes('delete')">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delSign(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { requestSignList, requestDelSign } from '@/api/sign'
export default {
  name: 'FuncSignList',
  created() {
    this.getSignList()
  },
  data() {
    return {
      loading: false,
      formInline: {
        name: '',
        phone: '',
        location: ''
      },
      rules: {
        phone: { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号', trigger: 'change' }
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0
    }
  },
  methods: {
    getSignList() {
      this.loading = true
      requestSignList({}).then(result => {
        console.log(result)
        this.tableData = result.data
        this.pageTotal = result.total
        this.loading = false
      })
    },
    onSearch(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true
        if (valid) {
          const keywords = {
            name: this.formInline.name,
            phone: this.formInline.phone,
            location: this.formInline.location
          }
          console.log(keywords)
          requestSignList(keywords).then(result => {
            this.tableData = result.data
            this.pageTotal = result.total
            this.loading = false
            this.$message({
              message: '查询成功！',
              type: 'success',
              center: true
            })
          })
        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    onClear(formName) {
      // 清空搜索框
      this.loading = true
      this.formInline = {}
      requestSignList({}).then(result => {
        this.tableData = result.data
        this.pageTotal = result.total
        this.loading = false
        this.$message({
          message: '清空成功！',
          type: 'success',
          center: true
        })
      })
    },
    delSign(index, row) {
      this.$confirm('此操作将永久删除该报名者, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        requestDelSign({ sid: row.sid }).then(data => {
          if (data.success) {
            this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
            this.pageTotal = this.tableData.length
            this.loading = false
            this.$message({
              message: data.result.message,
              type: 'success',
              center: true
            })
          } else {
            this.loading = false
            this.$message({
              message: data.error.msg,
              type: 'error',
              center: true
            })
            return false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    filterEducation(value, row) {
      return row.education === value
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    }
  },
  computed: {
    onePageTableData: function () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  }
}
</script>

<style scoped>
</style>
