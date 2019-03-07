<template>
  <div class="navbar" >
    <span>
      <img src="../../../assets/images/Resto+.png" style="width: 165px;height: 60px;" alt="">
    </span>
    <div class="avatar-container">
      <el-button type="primary" round size="mini"><a href="http://www.baidu.com" target="_blank">登陆</a></el-button>
      <el-button type="primary" round size="mini" @click="push()">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    userName: ''
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {

  },
  methods: {
    push() {
      this.$router.push('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  //background-color: #304156;
  margin: 20px 0;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 35px;
  }
}
</style>

