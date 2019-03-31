<template>
  <div class="navbar" >
    <span :style="smallDevice && {'width': '80px'}" style="display: inline-block;width: 250px;height: 80px;margin-top: 10px; margin-left: 20px;">
      <img id="img" :src="smallDevice ? info.logo_small : info.logo_url" :style="smallDevice && {'width': '80px'}" style="width: 250px;height: 80px;" alt="banner">
    </span>
    <div class="avatar-container">
      <a v-if="username" href="http://customer.mtsh.cn" target="_blank" style="color: red;font-size: 14px;">个人中心:<span style="color:#3a8ee6">{{ username }}</span></a>
      <el-button v-else type="text" style="padding: 0" @click="push()">登陆/注册</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo } from '@/api/api'
export default {
  metaInfo() {
    return {
      title: this.info.title,
      meta: [
        {
          name: 'keywords',
          content: this.info.keyword
        },
        {
          name: 'description',
          content: this.info.description
        }
      ]
    }
  },
  data() {
    return {
      username: null
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'device'
    ]),
    smallDevice() {
      return this.$store.state.app.smallDevice
    }
  },
  created() {
    // this.$store.dispatch('GetUserInfo')
    this.getUser()
  },
  methods: {
    getUser() {
      getUserInfo().then(res => {
        if (res.code === '0000') {
          this.username = res.data.username
        }
      })
    },
    push() {
      window.open(process.env.BASE_API + '/toLogin?callbackUrl=http://www.mengtan.com.cn', '_self')
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
  height: 100px;
  //background-color: #f6f6f6;
  //background-color: #404553;
  //margin: 20px 0;
  //height: 60px;
  //line-height: 60px;
  border-radius: 0px !important;
  border-bottom: 1px solid #E4E7ED;
  .avatar-container {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 40px;
  }
}
</style>

