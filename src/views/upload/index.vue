<template>
  <div v-loading="loading">
    <el-button type="text" style="margin: 20px;" @click="goBack()"><i class="el-icon-back"/> 返回</el-button>
    <div style="margin: 0 200px;">
      <div style="text-align: center;margin-bottom: 30px;">
        <span>模板类型</span>
      </div>
      <div >
        <el-row :gutter="20">
          <el-col class="wrap">
            <span class="titleName">优惠券:</span>
            <el-button size="small" type="primary" @click="download(0)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(0)">上传</el-button>
            </el-upload>
          </el-col>
          <el-col class="wrap fr">
            <span class="titleName">分享:</span>
            <el-button size="small" type="primary" @click="download(1)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(1)">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" class="wrap">
            <span class="titleName">堂食和外卖营业额:</span>
            <el-button size="small" type="primary" @click="download(2)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(2)">上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="10" class="wrap fr">
            <span class="titleName">堂食和外卖销量:</span>
            <el-button size="small" type="primary" @click="download(3)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(3)">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" class="wrap">
            <span class="titleName">消费频次:</span>
            <el-button size="small" type="primary" @click="download(4)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(4)">上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="10" class="wrap fr">
            <span class="titleName">用户价值:</span>
            <el-button size="small" type="primary" @click="download(5)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(5)">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" class="wrap">
            <span class="titleName">用户信息:</span>
            <el-button size="small" type="primary" @click="download(6)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(6)">上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="10" class="wrap fr">
            <span class="titleName">菜品:</span>
            <el-button size="small" type="primary" @click="download(7)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(7)">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" class="wrap">
            <span class="titleName">订单支付方式:</span>
            <el-button size="small" type="primary" @click="download(8)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(8)">上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="10" class="wrap fr">
            <span class="titleName">订单时段分布数据:</span>
            <el-button size="small" type="primary" @click="download(9)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(9)">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" class="wrap">
            <span class="titleName">订单终端分布:</span>
            <el-button size="small" type="primary" @click="download(10)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(10)">上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="10" class="wrap fr">
            <span class="titleName">评论:</span>
            <el-button size="small" type="primary" @click="download(11)">下载</el-button>
            <el-upload
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :accept="'vnd.ms-excel'"
              style="display: inline-block;margin:0 0 0 40px;"
            >
              <el-button size="small" type="primary" @click="chooseType(11)">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
import { downLoad } from '@/api/api'
import { getToken } from '@/utils/auth'
export default {
  name: 'Upload',
  data() {
    return {
      form: {},
      action: '/report-bi/file/uploadExcel?type=',
      headers: { Authorization: getToken() },
      type: '',
      loading: false

    }
  },
  mounted() {
    // this.action += this.type
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    download(type) {
      const query = {
        type: type
      }
      downLoad(query).then(response => {
        if (response) {
          window.open(response, '_self')
        }
      })
    },

    chooseType(type) {
      this.type = type
      this.action = '/report-bi/file/uploadExcel?type=' + type
    },

    beforeUpload(file) {
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

      if (!isExcel) {
        this.$message.error('上传只能是excel文件!')
      }
      // console.log(file )
      this.loading = true
      return isExcel
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleSuccess(response, file, fileList) {
      // console.log('response', response, file, fileList)
      this.loading = false
      if (response.code === -1) {
        this.$message({
          type: 'error',
          message: response.msg
        })
      } else {
        this.$message({
          type: 'success',
          message: response.msg
        })
      }
    },
    handleError(response, file, fileList) {
      this.loading = false
      this.$message({
        type: 'error',
        message: '上传失败'
      })
      const data = JSON.parse(JSON.stringify(response))
      console.log('data', data.status)
      if (data.status === 401) {
        this.store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
}
</script>

<style scoped>
  .wrap {
    width: 380px;
    height: 32px;
    line-height: 32px;
    margin: 10px 0 10px 0px;
  }
  .fr{
    float: right;
  }
  .titleName {
    display:inline-block;
    width: 150px;
  }
  upLoadStyle {
    display: inline-block;
    margin:0 0 0 40px;
  }
</style>

