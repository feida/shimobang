<template>
  <div class="navbar" >
    <span style=" display: inline-block;width: 180px;height: 80px; " @click="pushDashBoard">
      <img :src="info.logo_url" style="width: 180px;height: 80px; " alt="LOGO">
      <!--<span style="display: inline-block; width: 180px; height: 80px; border: 1px solid #eee; text-align: center">LOGO</span>-->
    </span>
    <div class="avatar-container">
      <span v-if="username" >欢迎用户:<span style="color:#3a8ee6">{{ username }}</span></span>
      <el-button v-else type="text" style="padding: 0" @click="push()">登陆/注册</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      username: sessionStorage.getItem('userName')
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'device'
    ])
  },
  created() {
  },
  methods: {
    push() {
      window.open(process.env.BASE_API + '/toLogin', '_self')
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
  height: 80px;
  //background-color: #f6f6f6;
  background-color: #404553;
  //margin: 20px 0;
  //height: 60px;
  //line-height: 60px;
  border-radius: 0px !important;
  border-bottom: 1px solid #E4E7ED;
  .avatar-container {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 30px;
  }
}
</style>

