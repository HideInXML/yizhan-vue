<template>
  <div>
    <el-card>Tip: 有多条交通路线，请以英文(,)分隔</el-card>
    <br>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="公司信息" name="first">
          <el-card shadow="hover" style="width: 700px;" v-loading.lock="loading">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" prop="address">
                <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="qq">
                <el-input v-model="ruleForm.qq" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="微信" prop="wechat">
                <el-input v-model="ruleForm.wechat" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="咨询热线" prop="hot_line">
                <el-input v-model="ruleForm.hot_line" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮编" prop="postal_code">
                <el-input v-model="ruleForm.postal_code" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公交路线" prop="bus">
                <el-input type="textarea" v-model="ruleForm.bus" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地铁交通" prop="metro">
                <el-input type="textarea" v-model="ruleForm.metro" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司简介" prop="intro">
                <el-input type="textarea" v-model="ruleForm.intro" autocomplete="off" rows="3%"></el-input>
              </el-form-item>
              <el-form-item v-if="$route.meta.permission.includes('add')">
                <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { requestCompInfo, requestEditCompInfo } from '@/api/company'
export default {
  name: 'FuncCompanyInfo',
  created() {
    this.getCompInfo()
  },
  data() {
    return {
      activeName: 'first',
      loading: false,
      ruleForm: {},
      rules: {
        name: { required: true, message: '请输入公司名称', trigger: 'blur' },
        address: { required: true, message: '请输入公司地址', trigger: 'blur' },
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        qq: { required: true, message: '请输入QQ', trigger: 'blur' },
        wechat: { required: true, message: '请输入微信', trigger: 'blur' },
        hot_line: [{ required: true, message: '请输入咨询热线', trigger: 'blur' }],
        postal_code: { required: true, message: '请输入邮编', trigger: 'blur' },
        bus: { required: true, message: '请输入公交路线', trigger: 'blur' },
        metro: { required: true, message: '请输入地铁路线', trigger: 'blur' },
        intro: { required: true, message: '请输入公司简介', trigger: 'blur' }
      }
    }
  },
  methods: {
    getCompInfo() {
      this.loading = true
      requestCompInfo().then(result => {
        this.ruleForm = result
        this.loading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true
        if (valid) {
          requestEditCompInfo(this.ruleForm).then(result => {
            this.loading = false
            this.$message({
              message: result.message,
              type: 'success'
            })
          })
        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.loading = true
      this.getCompInfo()
    }
  }
}
</script>

<style scoped>
</style>
