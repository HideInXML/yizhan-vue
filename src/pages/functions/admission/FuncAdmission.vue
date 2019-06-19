<template>
  <div>
    <el-card>Tips: 这里的信息会展示在站点[招班动态]</el-card>
    <br>
    <el-card style="height: 730px;" v-loading.lock="loading">
      <vue-editor v-model="content" :editorOptions="editorSettings" style="height: 600px"></vue-editor>
      <el-row v-if="$route.meta.permission.includes('add')">
        <el-button id="submitBtn" type="primary" @click="submitInfo">保存内容</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { requestAdmiInfo, requestEditAdmiInfo } from '@/api/admission'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'FuncAdmission',
  components: {
    VueEditor
  },
  mounted() {
    this.getAdmiInfo()
  },
  data() {
    const toolbar = [
      [{ 'font': [] }],
      [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      ['blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ]
    return {
      content: '',
      loading: false,
      editorSettings: {
        modules: {
          toolbar: toolbar
        },
        placeholder: '请认真填写招班动态...'
      }
    }
  },
  methods: {
    getAdmiInfo() {
      this.loading = true
      requestAdmiInfo().then(result => {
        this.content = result.info
        this.loading = false
      })
    },
    submitInfo: function () {
      this.loading = true
      if (this.content !== '') {
        requestEditAdmiInfo({ info: this.content }).then(result => {
          this.$message({
            message: result.message,
            type: 'success'
          })
          this.loading = false
        })
      } else {
        this.loading = false
        console.log('err submit!')
        this.$message({
          message: '招班动态不能为空',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
#submitBtn {
  display: block;
  position: absolute;
  left: 48%;
  top: 60px;
}
</style>
