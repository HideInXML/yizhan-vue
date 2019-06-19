<template>
  <div class="m-home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="fa fa-edge" style="color: #F56C6C;"></i>
          </div>
          <div class="m-content">
            <p>近7日浏览</p>
            <p class="m-count">{{ summary.browserTotal }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="fa fa-phone" style="color: #E6A23C;"></i>
          </div>
          <div class="m-content">
            <p>近7日报名</p>
            <p class="m-count">{{ summary.signTotal }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-user" style="color: #67C23A;"></i>
          </div>
          <div class="m-content">
            <p>教师</p>
            <p class="m-count">{{ summary.teacherTotal }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-user" style="color: #409EFF;"></i>
          </div>
          <div class="m-content">
            <p>学员</p>
            <p>{{ summary.studentTotal }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <el-card class="m-box-card" shadow="hover">
          <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
        </el-card>
      </el-col>
      <!-- <el-col :sm="24" :lg="6">
        <el-row :gutter="20" align>
          <el-col :sm="12" :lg="24">
            <el-card
              class="m-box-card"
              shadow="hover"
              style="height: 215px;background-color: rgb(143, 201, 251);color:#ffffff;"
            >
              <div slot="header">
                <p style="text-align: center">
                  <i class="fa fa-address-card-o" style="color: #F56C6C;font-size: 35px;"></i>
                </p>
                <div style="padding-top: 10px;">
                  <p>账号：{{ user.name }}</p>
                  <p>时间：{{ user.loginTime }}</p>
                  <p>地址：{{ user.loginIp }}</p>
                </div>
              </div>
              <div style="font-size: 12px;">
                <p>上次登录时间：{{ user.lastTime }}</p>
                <p>上次登录地址：{{ user.lastIp }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :sm="12" :lg="24">
            <el-card class="m-box-card" shadow="hover">
              <div
                style="height: 215px; margin: -20px;background-color: rgb(247, 151, 214);color:#ffffff;"
              >
                <vue-scroll>
                  <div style="padding: 20px;">
                    <p style="font-weight: bold;text-align: center">重要通知</p>
                    <p v-for="index in 20" :key="index">{{index}}. 帅哥/美女出没，请注意！</p>
                    <p>~(˘▾˘~)~(˘▾˘~)</p>
                    <p>对面的帅哥/美女，你好啊。</p>
                  </div>
                </vue-scroll>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VeScatter from 'v-charts/lib/scatter.common'
import { requestSiteStatistics } from '@/api/site'

export default {
  name: 'FuncHome',
  components: {
    VeLine,
    VeScatter
  },
  created() {
    requestSiteStatistics().then(result => {
      this.summary = result
    })
  },
  data() {
    return {
      summary: {
        teacherTotal: 0,
        studentTotal: 0,
        signTotal: 0,
        browserTotal: 0
      },

      chartData1: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      chartSettings1: {
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      },
      chartData2: {
        columns: ['日期', '访问用户', '下单用户', '年龄'],
        rows: {
          '上海': [
            { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
            { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
            { '日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245 },
            { '日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
            { '日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
            { '日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537 }
          ],
          '北京': [
            { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
            { '日期': '1/2', '访问用户': 1273, '年龄': 6, '下单用户': 2344 },
            { '日期': '1/3', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
            { '日期': '1/4', '访问用户': 2123, '年龄': 9, '下单用户': 3245 },
            { '日期': '1/5', '访问用户': 4103, '年龄': 12, '下单用户': 4355 },
            { '日期': '1/6', '访问用户': 7123, '年龄': 10, '下单用户': 3567 }
          ],
          '广州': [
            { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
            { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
            { '日期': '1/3', '访问用户': 2123, '年龄': 30, '下单用户': 3245 },
            { '日期': '1/5', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
            { '日期': '1/4', '访问用户': 5123, '年龄': 18, '下单用户': 4564 },
            { '日期': '1/6', '访问用户': 3843, '年龄': 30, '下单用户': 4850 }
          ],
          '南京': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京1': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京2': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京3': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京4': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京44': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京444': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京4444': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京11': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京22': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京33': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京222': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ],
          '南京2222': [
            { '日期': '1/1', '访问用户': 1212, '年龄': 4, '下单用户': 1212 }
          ]
        }
      },
      chartSettings2: {
        dimension: '日期',
        metrics: ['年龄', '下单用户']
      }
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
.m-home {
  .m-box-card {
    margin-bottom: 10px;
    color: #666666;
    .m-icon {
      float: left;
      width: 60px;
      i {
        font-size: 40px;
      }
    }
    .m-content {
      margin-left: 60px;
      .m-count {
        font-size: 20px;
      }
    }
  }
  .m-task-box {
    margin-bottom: 20px;
    .m-task-text {
      float: left;
      line-height: 16px;
    }
    .m-task-pro {
      margin-left: 60px;
    }
  }
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
