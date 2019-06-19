<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formInline" ref="formInline">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="入职公司：" prop="company">
          <el-input v-model="formInline.company"></el-input>
        </el-form-item>
        <el-form-item label="所学专业：" prop="major">
          <el-input v-model="formInline.major"></el-input>
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
              <p>原专业: {{ scope.row.profession }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
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
        <el-table-column label="所学专业" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.major }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入职公司" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入职岗位" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.position }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="薪资/月"
          align="center"
          width="100"
          :filters="salaryOptions"
          :filter-method="filterSalary"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.salary }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="$route.meta.permission.includes('modify') || $route.meta.permission.includes('delete')"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="$route.meta.permission.includes('modify')"
              @click="editStudent(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              v-if="$route.meta.permission.includes('delete')"
              type="danger"
              @click="delStudent(scope.$index, scope.row)"
            >删除</el-button>
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
import { requestStudentList, requestDelStudent } from '@/api/student'
export default {
  name: 'FuncStudList',
  created() {
    this.getStudentList()
  },
  data() {
    return {
      loading: false,
      salaryOptions: [
        { text: '< 6000', value: '0,6000' },
        { text: '6000 ~ 8000', value: '6000,8000' },
        { text: '8000 ~ 10000', value: '8000,10000' },
        { text: '> 10000', value: '10000,200000' }
      ],
      formInline: {
        name: '',
        company: '',
        major: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0
    }
  },
  methods: {
    getStudentList() {
      this.loading = true
      requestStudentList({}).then(result => {
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
            company: this.formInline.company,
            major: this.formInline.major
          }
          console.log(keywords)
          requestStudentList(keywords).then(result => {
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
      requestStudentList({}).then(result => {
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
    filterEducation(value, row) {
      return row.education === value
    },
    filterSalary(value, row) {
      let salaryScope = value.split(',')
      let min = parseFloat(salaryScope[0])
      let max = parseFloat(salaryScope[1])
      let salary = parseFloat(row.salary)
      return salary >= min && salary < max
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    editStudent(index, row) {
      this.$router.push('/admin/student/edit/' + row.sid)
    },
    delStudent(index, row) {
      this.$confirm('此操作将永久删除该学员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        requestDelStudent({ sid: row.sid }).then(data => {
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
        this.loading = false
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
