<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="站点配置信息" name="first">
          <el-card shadow="hover" style="width: 700px;" v-loading="loading">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
              <el-form-item label="站点状态" prop="site_status">
                <el-radio-group v-model="ruleForm.site_status">
                  <el-radio label="on">开启</el-radio>
                  <el-radio label="off">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="站点名称" prop="site_name">
                <el-input v-model="ruleForm.site_name"></el-input>
              </el-form-item>
              <el-form-item label="站点关键字" prop="site_keyword">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3}"
                  v-model="ruleForm.site_keyword"
                ></el-input>
              </el-form-item>
              <el-form-item label="站点描述" prop="site_desc">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                  v-model="ruleForm.site_desc"
                ></el-input>
              </el-form-item>
              <el-form-item label="版权申明" prop="site_copyright">
                <el-input v-model="ruleForm.site_copyright"></el-input>
              </el-form-item>
              <el-form-item label="站点备案" prop="site_icp">
                <el-input v-model="ruleForm.site_icp"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { requestGetConf, requestEditConf } from '@/api/site'
export default {
  name: 'FuncSiteConf',
  created() {
    this.getConf()
  },
  data() {
    return {
      activeName: 'first',
      loading: false,
      ruleForm: {
        site_name: '',
        site_status: '',
        site_keyword: '',
        site_desc: '',
        site_copyright: '',
        site_icp: ''
      },
      rules: {
        site_status: { required: true, message: '请选择站点状态', trigger: 'change' },
        site_name: { required: true, message: '请填写站点名称', trigger: 'blur' },
        site_keyword: { required: true, message: '请填写站点关键字', trigger: 'blur' },
        site_desc: { required: true, message: '请填写站点描述', trigger: 'blur' },
        site_copyright: { required: true, message: '请填写版权申明', trigger: 'blur' },
        site_icp: { required: true, message: '请填写站点备案', trigger: 'blur' }
      }
    }
  },
  methods: {
    getConf() {
      this.loading = true
      requestGetConf().then(result => {
        this.ruleForm = result
        this.loading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.loading = true
        if (valid) {
          requestEditConf(this.ruleForm).then(result => {
            this.loading = false
            // 提交成功
            this.$message({
              message: result.message,
              type: 'success',
              center: true
            })
          })
        } else {
          this.loading = false
          console.log('error submit!')
          return false
        }
      })
    },
    resetForm() {
      this.getConf()
    }
  }
}
</script>

<style scoped>
</style>
