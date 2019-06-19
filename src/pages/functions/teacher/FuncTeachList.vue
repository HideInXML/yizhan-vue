<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formInline.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="formInline.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
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
            <span>{{ scope.row.tid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>微信: {{ scope.row.weixin }}</p>
              <p>&nbsp;QQ: {{ scope.row.qq }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.job }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色"
          width="135"
          :filters="[{ text: '教师', value: 'teacher' }, { text: '管理员', value: 'admin' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              style="margin-right: 5px;"
              :type="role === 'teacher' ? 'primary' : 'success'"
              disable-transitions
              v-for="(role, index) in scope.row.roles.split(',')"
              :key="index"
            >{{ role | roleToZh }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="$route.meta.permission.includes('modify') || $route.meta.permission.includes('delete')"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="$route.meta.permission.includes('modify') && scope.row.tid!==tid"
              @click="editTeacher(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              v-if="$route.meta.permission.includes('delete') && scope.row.tid!==tid"
              type="danger"
              @click="delTeacher(scope.$index, scope.row)"
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
import { requestTeachList, requestDelTeacher } from '@/api/teacher'

export default {
  name: 'FuncTeachList',
  created() {
    this.getTeacherList()
  },
  data() {
    return {
      tid: JSON.parse(sessionStorage.getItem('user-info')).id,
      loading: false,
      formInline: {
        name: '',
        email: '',
        phone: ''
      },
      tableData: [],
      rules: {
        email: { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' },
        phone: { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号', trigger: 'change' }
      },
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0
    }
  },
  methods: {
    getTeacherList() {
      this.loading = true
      requestTeachList({}).then(result => {
        // console.log(result)
        this.tableData = result.data
        this.pageTotal = result.total
        this.loading = false
      })
    },
    filterTag(value, row) {
      // console.log('value:', value)
      // console.log('row:', row)
      return row.roles.includes(value)
    },
    onSearch(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true
        if (valid) {
          const keywords = {
            name: this.formInline.name,
            email: this.formInline.email,
            phone: this.formInline.phone
          }
          requestTeachList(keywords).then(result => {
            this.loading = false
            console.log(result)
            this.tableData = result.data
            this.pageTotal = result.total
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
      requestTeachList({}).then(result => {
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
    editTeacher(index, row) {
      this.$router.push('/admin/teacher/edit/' + row.tid)
    },
    delTeacher(index, row) {
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        requestDelTeacher({ tid: row.tid }).then(data => {
          if (data.success) {
            this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
            this.pageTotal = this.tableData.length
            this.$message({
              message: data.result.message,
              type: 'success',
              center: true
            })
          } else {
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
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    }
  },
  filters: {
    roleToZh(en_role) {
      return en_role === 'admin' ? '管理员' : '教师'
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
