<template>
  <div>
    <el-card>Tips: 这里的信息会展示在[站点首页]</el-card>
    <br>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="站点首页" name="first">
          <el-card shadow="hover" style="width: 800px;" v-loading="loading">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
              <el-form-item label="首页轮播图" prop="pics">
                <!-- :before-remove="handleBeforeRemove"
                :before-upload="beforePicUpload"-->
                <el-upload
                  :file-list="ruleForm.pics"
                  :action="uploadHomePicUrl"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handlePicSuccess"
                  name="pic"
                  :before-upload="beforePicUpload"
                  :before-remove="handleBeforeRemove"
                  :limit="pic_num_limit"
                  :on-exceed="handleExceed"
                  :on-error="handlePicError"
                >
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >只能上传{{ pic_num_limit }}张 jpg/png文件，且单张不超过 {{ pic_max_size }}MB</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
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
import url from '@/api/url'
import { requestImgLimit } from '@/api/teacher'
import { requestSiteHome, requestEditSiteHome } from '@/api/site'
export default {
  name: 'FuncSiteHome',
  created() {
    this.setImgLimit()
    this.getSiteHome()
  },
  data() {
    return {
      loading: false,
      activeName: 'first',
      uploadHomePicUrl: url.uploadHomePics,
      dialogImageUrl: '',
      dialogVisible: false,
      pic_max_size: 2,
      pic_num_limit: 3,
      ruleForm: {
        pics: []
      },
      rules: {
        pics: { required: true, message: '请至少上传一张首页轮播图', trigger: 'blur' }
      }
    }
  },
  methods: {
    setImgLimit() {
      requestImgLimit().then(result => {
        // console.log(result)
        this.pic_max_size = result.HOME_PIC_MAX_SIZE
        this.pic_num_limit = result.HOME_PIC_NUM_LIMIT
      })
    },
    getSiteHome() {
      this.loading = true
      requestSiteHome().then(result => {
        if (result.pics)
          this.ruleForm.pics = result.pics
        this.loading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.loading = true
        if (valid) {
          requestEditSiteHome(this.ruleForm).then(result => {
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
    resetForm() { // 将表单回退到一开始的状态
      this.getSiteHome()
    },
    beforePicUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < this.pic_max_size
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 、 PNG 或 JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 ' + this.pic_max_size + 'MB!')
      }
      return isJPG && isLt2M
    },
    handlePicSuccess(response) {
      // console.log(response)
      this.ruleForm.pics.push(response.result)
    },
    handlePicError() {
      this.$message({
        message: '图片上传失败',
        type: 'error',
        center: true
      })
    },
    handleExceed() {
      this.$message({
        message: '最多上传' + this.pic_num_limit + '张图片',
        type: 'warning'
      })
    },
    handleBeforeRemove(file, fileList) {
      if (file && file.status === 'success') {
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delPic(file.uid) // 删除单个图片
        })
        return false
      }
    },
    delPic(uid) {
      this.ruleForm.pics.some((item, i) => {
        if (item.uid === uid) {
          this.ruleForm.pics.splice(i, 1)
          return true
        }
      })
    },
    find(uid, fileList) {
      let isExist = false
      fileList.forEach(file => {
        if (file.uid === uid)
          isExist = true
      })
      return isExist
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
</style>
