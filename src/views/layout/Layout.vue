<template>
  <div class="app-wrapper" >
    <navbar/>
    <div style=" padding-top: 30px;">
      <img :src="info.bg_url" style="width: 100%;" alt="">
      <!--<img src="../../assets/images/background.jpg" style="width: 100%;" alt="">-->
    </div>
    <div class="main-container">
      <app-main/>
    </div>
    <div class="footer">
      <p>盟碳（上海国际贸易有限公司）</p>
      <p>地址：上海市浦东新区东方路 联系电话：400-0000-0000</p>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain, Sidebar } from './components'
import { mapGetters } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'loading',
      'info'
    ]),
    device() {
      return this.$store.state.app.device
    },
  },
  created() {
    // this.init()
    // console.log('device3333',this.device,this.info)
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
    //height: 100px;
    text-align: center;
    font-size: 14px;
    padding-bottom: 15px;
    background-color: #141414;
  }
</style>
