<template>
  <div class="app-wrapper" >
    <navbar/>
    <div style="height: 50px; background: skyblue;position: relative;">
      <div style=" max-width: 1170px; margin: 0 auto; overflow-x: auto; overflow-y: hidden; height: 50px; ">
        <div style="width: 1108px; height: 50px; display: inline-block;">
          <div class="menu_wrap" style="border-left: 1px solid #eee;">
            <el-popover
              placement="bottom"
              width="300"
              trigger="hover">
              <div style="background:rgba(255,255,255,0.85);">
                <div v-for="(item,index) in productData" :key="index" style="border-bottom: 1px solid #f4eded; padding-bottom: 6px">
                  <span style="font-size: 14px; color: #000; display: block; padding: 8px 0;">{{ item['top_ category'] }}</span>
                  <div v-if="item.list">
                    <span v-for="(m, i) in item.list" :key="i + 'v'" style=" margin-right: 20px; color: #747474;font-size: 13px">{{ m }}</span>
                  </div>
                </div>
              </div>
              <span slot="reference" class="menu_title" style="display: block;">全部产品分类</span>
            </el-popover>

          </div>
          <div class="menu_wrap" @click="pushDashBoard">
            <span class="menu_title">首页</span>
          </div>
          <div class="menu_wrap">
            <a :href="info.introduce" target="_blank">
              <span class="menu_title">平台介绍</span>
            </a>
          </div>
          <div class="menu_wrap" @click="pushMore('1')">
            <span class="menu_title" >快讯行情</span>
          </div>
          <div class="menu_wrap">
            <a :href="info.mt_school" target="_blank">
              <span class="menu_title">盟碳学院</span>
            </a>
          </div>
          <div class="menu_wrap">
            <a :href="info.contact_us" target="_blank">
              <span class="menu_title">联系我们</span>
            </a>
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
import { getProductList } from '@/api/api'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      productData: []
    }
  },
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
    this.getProductData()
  },
  mounted() {
  },
  methods: {
    getProductData() {
      getProductList().then(res => {
        console.log('getProductList', res)
        if (res.data) {
          this.productData = res.data
        }
      })
    },

    // 首页
    pushDashBoard() {
      this.$router.push('/')
    },

    // 更多新闻
    pushMore(id) {
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
    width: 180px;
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

  .menu_title:hover {
    cursor: pointer;
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
