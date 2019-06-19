<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="学员基本信息" name="first">
          <el-card shadow="hover" style="width: 700px;" v-loading="loading">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="education">
                <el-select v-model="ruleForm.education" placeholder="请选择学历">
                  <el-option label="中专" value="中专"></el-option>
                  <el-option label="大专" value="大专"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="原专业" prop="profession">
                <el-input v-model="ruleForm.profession"></el-input>
              </el-form-item>
              <el-form-item label="所学专业" prop="major">
                <el-input v-model="ruleForm.major"></el-input>
              </el-form-item>
              <el-form-item label="入职公司" prop="company">
                <el-input v-model="ruleForm.company" placeholder="入职公司名称"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="position">
                <el-input v-model="ruleForm.position"></el-input>
              </el-form-item>
              <el-form-item label="薪资" prop="salary">
                <el-input v-model="ruleForm.salary"></el-input>
              </el-form-item>
              <el-form-item label="自我介绍" prop="intro">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                  v-model="ruleForm.intro"
                ></el-input>
              </el-form-item>
              <el-form-item label="学员头像" prop="avatar">
                <el-upload
                  :action="avatarUploadUrl"
                  :show-file-list="false"
                  list-type="picture-card"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarError"
                  :before-upload="beforeAvatarUpload"
                  name="avatar"
                >
                  <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过 {{ avatar_max_size }}MB</div>
                </el-upload>
              </el-form-item>
              <br>
              <el-form-item label="学员作品集" prop="works">
                <el-upload
                  drag
                  :action="workUploadUrl"
                  multiple
                  :file-list="ruleForm.works"
                  name="work"
                  :on-success="handleWorkSuccess"
                  :on-preview="handleWorkPreview"
                  :on-error="handleWorkError"
                  :before-upload="beforeWorkUpload"
                  :before-remove="beforeWorkRemove"
                  :limit="work_num_limit"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且每张不超过 {{ work_max_size }}MB</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
import url from '@/api/url'
import { requestImgLimit } from '@/api/teacher'
import { requestAddStudent } from '@/api/student'
export default {
  name: 'FuncStudAdd',
  created() {
    this.getImgLimit()
  },
  data() {
    return {
      loading: false,
      activeName: 'first',
      dialogImageUrl: '',
      dialogVisible: false,
      avatar_max_size: 2,
      work_max_size: 2,
      work_num_limit: 7,
      avatarUploadUrl: url.uploadStudentAvatar,
      workUploadUrl: url.uploadStudentWorks,
      ruleForm: {
        name: '',
        education: '',
        profession: '',
        major: '',
        company: '',
        position: '',
        salary: null,
        intro: '',
        avatar: '',
        works: []
      },
      rules: {
        name: { required: true, message: '请填写学员姓名', trigger: 'blur' },
        education: { required: true, message: '请选择学员学历', trigger: 'change' },
        profession: { required: true, message: '请填写学员原专业', trigger: 'blur' },
        major: { required: true, message: '请填写学员在机构所学专业', trigger: 'blur' },
        company: { required: true, message: '请填写入职公司名称', trigger: 'blur' },
        position: { required: true, message: '请填写入职岗位', trigger: 'blur' },
        salary: { required: true, message: '请填写入职薪资', trigger: 'blur' },
        intro: { required: true, message: '请填写学员的自我介绍', trigger: 'blur' },
        avatar: { required: true, message: '请上传学员头像', trigger: 'blur' },
        works: { required: true, message: '请上传学员作品', trigger: 'blur' }
      }
    }
  },
  methods: {
    getImgLimit() { // 设置图片上传的限制参数
      requestImgLimit().then(result => {
        this.avatar_max_size = result.AVATAR_MAX_SIZE || 2
        this.work_max_size = result.WORK_MAX_SIZE || 2
        this.work_num_limit = result.WORK_NUM_LIMIT || 9
      })
    },
    submitForm(formName) {
      // console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        this.loading = true
        if (valid) {
          requestAddStudent(this.ruleForm).then(result => {
            // console.log(result)
            // 清空页面数据
            this.resetForm(formName)
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.avatar = ''
      this.ruleForm.works = []
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < this.avatar_max_size
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 、 PNG 或 JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 ' + this.avatar_max_size + 'MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(response, file) {
      if (response.success)
        this.ruleForm.avatar = response.result.url
      else
        this.$message({
          message: response.error.msg,
          type: 'error'
        })
    },
    handleAvatarError() {
      this.$message({
        message: '头像上传失败',
        type: 'error',
        center: true
      })
    },
    beforeWorkUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < this.work_max_size
      if (!isJPG) {
        this.$message.error('上传作品图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传作品图片大小不能超过 ' + this.work_max_size + 'MB!')
      }
      return isJPG && isLt2M
    },
    handleWorkSuccess(response) {
      this.ruleForm.works.push(response.result)
    },
    handleWorkPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleWorkError() {
      this.$message({
        message: '作品上传失败',
        type: 'error',
        center: true
      })
    },
    beforeWorkRemove(file) {
      if (file && file.status === 'success') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delWork(file.uid) // 删除单个作品
        })
        return false
      }
    },
    delWork(uid) {
      this.ruleForm.works.some((item, i) => {
        if (item.uid === uid) {
          this.ruleForm.works.splice(i, 1)
          return true
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
  text-align: center;
}
</style>
