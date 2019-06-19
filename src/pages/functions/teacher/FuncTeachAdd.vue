<template>
  <div>
    <!-- <el-card>Tips: 在[头像] [基本信息] [作品集] 都填写完成后点击提交按钮</el-card>
    <br>-->
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="教师基本信息" name="first">
          <el-card shadow="hover" style="width: 700px;" v-loading="loading">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="可不填,默认123456"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="qq">
                <el-input v-model="ruleForm.qq"></el-input>
              </el-form-item>
              <el-form-item label="微信" prop="weixin">
                <el-input v-model="ruleForm.weixin"></el-input>
              </el-form-item>
              <el-form-item label="职务" prop="job">
                <el-input v-model="ruleForm.job"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="roles">
                <el-checkbox-group v-model="ruleForm.roles">
                  <el-checkbox label="teacher" name="teacher">教师</el-checkbox>
                  <el-checkbox label="admin" name="admin">管理员</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="参与项目" prop="project">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3}"
                  v-model="ruleForm.project"
                ></el-input>
              </el-form-item>
              <el-form-item label="个人简介" prop="intro">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                  v-model="ruleForm.intro"
                ></el-input>
              </el-form-item>
              <el-form-item label="教师头像" prop="avatar">
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
              <el-form-item label="教师作品集" prop="works">
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
import { requestImgLimit, requestAddTeacher } from '@/api/teacher'

export default {
  name: 'FuncTeachAdd',
  created() {
    this.getImgLimit()
  },
  data() {
    return {
      loading: false,
      activeName: 'first',
      dialogImageUrl: '',
      dialogVisible: false,
      avatar_max_size: '',
      work_max_size: '',
      work_num_limit: 0,
      avatarUploadUrl: url.uploadTeacherAvatar,
      workUploadUrl: url.uploadTeacherWork,
      ruleForm: {
        name: '',
        email: '',
        phone: '',
        qq: '',
        weixin: '',
        job: '',
        roles: [],
        project: '',
        intro: '',
        avatar: '',
        works: []
      },
      rules: {
        name: { required: true, message: '请输入教师姓名', trigger: 'blur' },
        email: [
          { required: true, message: '请输入教师邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        qq: { required: true, message: '请填写QQ', trigger: 'blur' },
        weixin: { required: true, message: '请填写微信号', trigger: 'blur' },
        job: { required: true, message: '请填写教师的职务', trigger: 'blur' },
        roles: { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' },
        project: { required: true, message: '请填写教师参与的项目', trigger: 'blur' },
        intro: { required: true, message: '请填写教师的个人简介', trigger: 'blur' },
        avatar: { required: true, message: '请上传教师头像', trigger: 'blur' },
        works: { required: true, message: '请上传教师作品', trigger: 'blur' }
      }
    }
  },
  methods: {
    getImgLimit() {
      requestImgLimit().then(result => {
        // console.log(result)
        this.avatar_max_size = result.AVATAR_MAX_SIZE || 2
        this.work_max_size = result.WORK_MAX_SIZE || 2
        this.work_num_limit = result.WORK_NUM_LIMIT || 9
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.loading = true
        if (valid) {
          requestAddTeacher(this.ruleForm).then(result => {
            // 清空页面数据
            this.resetForm(formName)
            this.loading = false
            // console.log(result)
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
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
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
