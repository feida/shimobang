<template>
  <div class="navbar" >
    <span style="margin-left: 20px; " @click="pushDashBoard">
      <img :src="info.logo_url" style="width: 165px;height: 60px; margin-top: 20px;" alt="">
      <!--<span style="display: inline-block; width: 160px; height: 60px; border: 1px solid #eee; text-align: center">LOGO</span>-->
    </span>
    <div class="avatar-container">
      <!--<el-button type="primary" round size="mini"><a href="http://www.baidu.com" target="_blank">登陆</a></el-button>-->
      <el-button type="text" @click="push()">登陆/注册</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'device'
    ])
  },
  created() {
    console.log('info', this.info)
  },
  methods: {
    push() {
      this.$router.push('/newsMore/index')
      // console.log('info22',this.info)
    },
    // 首页
    pushDashBoard() {
      this.$router.push('/')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background-color: #f6f6f6;
  //margin: 20px 0;
  //height: 60px;
  //line-height: 60px;
  border-radius: 0px !important;
  border-bottom: 1px solid #E4E7ED;
  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>

