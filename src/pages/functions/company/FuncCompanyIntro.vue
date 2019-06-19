<template>
  <div>
    <el-card>Tips: 这里的信息会展示在站点[公司介绍]</el-card>
    <br>
    <el-card style="height: 730px;" v-loading.lock="loading">
      <vue-editor v-model="content" :editorOptions="editorSettings" style="height: 600px"></vue-editor>
      <el-row v-if="$route.meta.permission.includes('add')">
        <el-button id="submitBtn" type="primary" @click="submitIntro">保存内容</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { requestCompIntro, requestEditCompIntro } from '@/api/company'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'FuncCompIntro',
  components: {
    VueEditor
  },
  created() {
    this.getCompIntro()
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
      loading: false,
      content: '',
      editorSettings: {
        modules: {
          toolbar: toolbar
        },
        placeholder: '请认真填写公司介绍...'
      }
    }
  },
  methods: {
    getCompIntro() {
      this.loading = true
      requestCompIntro().then(result => {
        this.content = result.intro
        this.loading = false
      })
    },
    submitIntro: function () {
      this.loading = true
      if (this.content !== '') {
        requestEditCompIntro({ intro: this.content }).then(result => {
          this.loading = false
          this.$message({
            message: result.message,
            type: 'success'
          })
        })
      } else {
        this.loading = false
        console.log('err submit!')
        this.$message({
          message: '公司介绍不能为空',
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
