<template>
  <div class="app-wrapper" >
    <navbar/>
    <div style="height: 50px; background: skyblue;position: relative;">
      <div style=" max-width: 1170px; margin: 0 auto; overflow-x: auto; overflow-y: hidden; height: 50px; ">
        <div style="width: 1018px; height: 50px; display: inline-block;">
          <div class="menu_wrap" style="border-left: 1px solid #eee;">
            <span class="menu_title">全部产品分类</span>
          </div>
          <div class="menu_wrap" @click="pushDashBoard">
            <span class="menu_title">首页</span>
          </div>
          <div class="menu_wrap">
            <span class="menu_title" >平台介绍</span>
          </div>
          <div class="menu_wrap">
            <el-dropdown trigger="hover">
              <span class="menu_title" >快讯行情</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in news_categoryData" :key="item.news_category_id" >
                  <span @click="pushMore(item.news_category_id)">{{ item.news_category }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="menu_wrap">
            <el-dropdown trigger="hover">
              <span class="menu_title">联系我们</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >
                  <span>联系我们</span>
                </el-dropdown-item>
                <el-dropdown-item >
                  <span>意见反馈</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

      </div>
    </div>
    <div :style="device == 'mobile' && {'height': '220px'}" style="width: 100%; height: 360px; background: #eee; margin-bottom: 20px; ">
      <img id="img" :src="info.bg_url" :style="device == 'mobile' && {'height': '220px'}" style="width: 100%; height: 360px" alt="banner">
    </div>
    <div class="main-container">
      <app-main/>
    </div>
    <div class="footer">
      <el-row>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" >
          <div style="margin: 0 auto;">
            <p/>
            <!--<p style="font-size: 24px;">联系方式:</p>-->
            <!--<p style="font-size: 28px; color: red">{{ info.telphone }}</p>-->
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" >
          <div>
            <div style="width: 150px; margin: 0 auto; margin-top: 20px;">
              <img :src="info.qrcode_url" style="width: 120px; height: 120px;" alt="二维码">
              <p>扫码二维码，关注我们</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="footer_bottom">
        <div style="text-align: center; margin: 0 10px;">
          <p><span >{{ info.company_name }}</span></p>
          <p>
            <span>
              地址：{{ info.company_address }}
            </span>
            <span style="margin-left: 20px;">
              邮箱：{{ info.email }}
            </span>
            <span style="margin-left: 20px;">
              联系方式：{{ info.telphone }}
            </span>
          </p>
          <p>{{ info.copyright }}</p>
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
      'news_categoryData',
      'info'
    ]),
    device() {
      return this.$store.state.app.device
    }

  },
  watch: {

  },
  created() {
    this.$store.dispatch('GetNewsCategoryList')
  },
  mounted() {
  },
  methods: {
    // 首页
    pushDashBoard() {
      this.$router.push('/')
    },

    // 更多新闻
    pushMore(id) {
      console.log('id444', id)
      this.$router.push('/newsMore/index/' + id)
    }
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

  .menu_wrap {
    display: inline-block;
    width: 200px;
    line-height: 50px;
    text-align: center;
    border-right: 1px solid #eee;
  }
  .menu_title {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
  }
  .footer {
    margin-top: 10px;
    border-top: 2px solid #E4E7ED;
    /*min-height: 200px;*/
    text-align: center;
    font-size: 14px;
    color: #333;
    padding-bottom: 20px;
    background-color: #fff;
    position: relative;
  }
  .footer_bottom {
    width: 100%;
    /*position: absolute;*/
    /*bottom: 10px;*/
  }
</style>
