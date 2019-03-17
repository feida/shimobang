<template>
  <div class="dashboard-container">
    <div class="menuTitle">
      <span class="menuTitle_icon"></span>
      <span>价格趋势</span>
    </div>
    <el-tabs type="card" class="tabs" @tab-click="handleClick" >
      <el-tab-pane v-for=" (item,index) in tabChartsData" :label="item.title" :key="index">
        <div class="chart-container">
          <chart :id="'wrap'+ index" :ref= "'charts'+ index" :charts_data= "item.charts_data" height="100%" width="100%"/>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="height: 50px;margin: 15px 0; border: 1px solid #eee; text-align: center; line-height: 50px">
      广告
    </div>
    <div class="menuTitle">
      <span class="menuTitle_icon"></span>
      <span>在线采购</span>
    </div>
    <el-collapse @change="handleChange" v-model="activeNames">
      <el-collapse-item v-for=" (item,index) in shopListData" :title="item.shop_category" :key="'shop_category'+ index" :name="index + 1">
        <div v-for=" (m,n) in item.data_list" :key="'data_list' + n" class="list">
          <span class="shop_name">{{ m.shop_name }}</span>
          <div>
            <el-button round size="mini" @click="talkaaaaa()">议价</el-button>
            <el-button round size="mini">立即采购</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div style="height: 50px; margin: 15px 0;border: 1px solid #eee;text-align: center; line-height: 50px">
      广告
    </div>
    <div class="menuTitle">
      <span class="menuTitle_icon"></span>
      <span>新闻资讯</span>
    </div>
    <div style="background-color: #f9f9f9; padding-bottom: 15px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in newsListData" :key="index">
          <div class="grid-content bg-purple">
            <div>
              <h4 style="display:inline-block;">  {{item.news_category}} </h4>
              <span style="float: right; line-height: 60px;">更多>></span>
            </div>
            <div class="news_wrap" v-for=" ( m, n ) in item.data_list" :key="'list' + n">
              <span class="newsTitle">{{m.news_title}}</span>
              <span class="newsDate">{{m.news_date}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getTabcharts, getShopList, getNewsList } from '@/api/api'
import Chart from '@/components/Charts/lineMarker'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: { Chart },
  data() {
    return {
      activeNames: 1,
      tabChartsData: [],
      shopListData: [],
      newsListData: [],
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  created() {
    this.$store.dispatch('GetInfo')
    this.getTabchartsList()
    this.getShopListData()
    this.getNewsListData()
  },
  methods: {
    getTabchartsList() {
      getTabcharts().then(response => {
        console.log('getTabcharts', response)
        if (response.data) {
          this.tabChartsData = response.data
        }
      })
    },
    getShopListData() {
      getShopList().then(response => {
        console.log('getShopList', response)
        if (response.data) {
          this.shopListData = response.data
        }
      })
    },

    getNewsListData() {
      getNewsList().then(response => {
        console.log('getNewsList', response)
        if (response.data) {
          this.newsListData = response.data
        }
      })
    },

    talkaaaaa() {
      console.log('info55555',this.info)
      this.$message({
        message: '您的议价请求已发送给工作人员，工作人员将尽快与您联系！',
        type: 'success',
      });
    },
    handleClick(tab, event) {
      // console.log(tab.index)
      // console.log(this.$refs['charts' + tab.index][0])
      this.$refs['charts' + tab.index][0].__resizeHanlder()
    },
    handleChange(val) {
      // console.log(val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  .tabs .el-tabs__nav-wrap  {
    background-color: skyblue;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    background-color: #fff;
  }
  .el-collapse-item__header {
    background-color: skyblue;
    font-size: 16px;
    padding: 0 15px;
  }

  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .el-tabs__header {
    margin: 0;
  }
  .menuTitle {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .menuTitle_icon {
    display: inline-block;
    width: 8px;
    height: 20px;
    vertical-align: sub;
    background: #000;
    margin-right: 5px;
  }
  .list {
    position: relative;
    border: 1px solid #99a9bf;
    border-top: none;
    min-height: 40px;

  }
  .shop_name {
    margin-left: 10px;
  }
  .list > div {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -14px;
  }

  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }

  .bg-purple {
    //background: #d3dce6;
  }
  .grid-content {
    //min-height: 36px;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 5px;
    border-bottom: 1px dashed #999;
  }

  .news_wrap {
    position: relative;
    font-size: 14px;
    color: #333;
  }

  .news_wrap:hover {
    color: #3a8ee6;
    pointer: cursor;
  }

  .newsDate {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -15px;
  }

  @media only screen and (max-width: 600px) {
    .chart-container{
      position: relative;
      width: 100%;
      height: calc(100vw * 3/4);
    }

    .shop_name {
      display: inline-block;
      width: 180px;
      vertical-align: center;
    }

    .newsTitle {
      display: inline-block;
      width: 180px;
    }

    .news_wrap {
      min-height: 30px;
      line-height: 26px;
    }
  }

  @media only screen and (min-width: 600px) {
    .chart-container{
      position: relative;
      width: 100%;
      height: calc(100vw * 3/4);
    }

    .shop_name {
      line-height: 40px;
    }

    .newsTitle {
      line-height: 30px;
    }

    .news_wrap {
      height: 30px;
      line-height: 30px;
    }
  }

  @media only screen and (min-width: 768px) {
    .chart-container{
      position: relative;
      width: 100%;
      height: calc(100vw / 3);
    }
  }

  @media only screen and (min-width: 992px) {
    .chart-container{
      position: relative;
      width: 100%;
      height: calc(100vw / 3);
    }
  }

  @media only screen and (min-width: 1200px) {
    .chart-container{
      position: relative;
      width: 100%;
      height: calc(100vw / 3);
    }
  }
</style>
