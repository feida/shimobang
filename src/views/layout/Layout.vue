<template>
  <div class="app-wrapper" >
    <navbar/>
    <div :style="device == 'mobile' && {'height': '220px'}" style="width: 100%; height: 360px; background: #eee; ">
      <img id="img" :src="info.bg_url" :style="device == 'mobile' && {'height': '220px'}" style="width: 100%; height: 360px" alt="banner">
      <!--<img id="img" src="../../assets/images/background.jpg" :style="device == 'mobile' && {'height': '220px'}" style="width: 100%; height: 360px" alt="">-->
    </div>
    <div class="main-container">
      <app-main/>
    </div>
    <div class="footer">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
          <div style="margin: 0 auto;">
            <p style="font-size: 24px;">联系方式:</p>
            <p style="font-size: 28px; color: red">{{ info.telphone }}</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
          <div>
            <div style="width: 150px; margin: 0 auto; margin-top: 30px;">
              <img :src="info.qrcode_url" style="width: 120px; height: 120px;" alt="二维码">
              <p>扫码二维码，关注我们</p>
            </div>

          </div>
        </el-col>
      </el-row>
      <div class="footer_bottom">
        <div style="text-align: center">
          <p>盟碳（上海国际贸易有限公司）</p>
          <p>地址：上海市浦东新区东方路  <span style="margin-left: 20px;">邮箱：{{ info.email }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'
import { mapGetters } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'loading',
      'info'
    ]),
    device() {
      return this.$store.state.app.device
    }

  },
  watch: {

  },
  created() {
    // this.init()
    // console.log('device3333',this.device,this.info)
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {

    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .main-container {
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    //background-color: #eee;

  }
  .footer {
    min-height: 200px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    padding-bottom: 15px;
    background-color: #141414;
    position: relative;
  }
  .footer_bottom {
    width: 100%;
    /*position: absolute;*/
    /*bottom: 10px;*/
  }
</style>
