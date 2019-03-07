<template>
  <div class="dashboard-container">
    <el-tabs type="card" class="tabs" @tab-click="handleClick" >
      <el-tab-pane v-for=" (item,index) in tabChartsData" :label="item.title" :key="index">
        <div class="chart-container">
          <chart :id="'wrap'+ index" :ref= "'charts'+ index" :charts_data= "item.charts_data" height="100%" width="100%"/>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="height: 50px; background-color: red;margin: 15px 0;">
      广告
    </div>
    <div class="menuTitle">
      <span>在线采购</span>
    </div>
    <el-collapse  @change="handleChange">
      <el-collapse-item v-for=" (item,index) in shopListData" :title="item.shop_category" :key="'shop_category'+ index">
        <div class="list" v-for=" (m,n) in item.data_list" :key="'data_list' + n">
          <span>{{m.shop_name}}</span>
          <div>
            <el-button round size="mini">议价</el-button>
            <el-button round size="mini">立即采购</el-button>
          </div>
        </div>
        <!--<div class="list">
          <span>石墨化石油焦</span>
          <div>
            <el-button round size="mini">议价</el-button>
            <el-button round size="mini">立即采购</el-button>
          </div>
        </div>-->
      </el-collapse-item>
      <!--<el-collapse-item title="石墨电极" name="2">
        <div class="list">
          <span>石墨化石油焦</span>
          <div>
            <el-button round size="mini">议价</el-button>
            <el-button round size="mini">立即采购</el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="超细粉" name="3">
        <div class="list">
          <span>石墨化石油焦</span>
          <div>
            <el-button round size="mini">议价</el-button>
            <el-button round size="mini">立即采购</el-button>
          </div>
        </div>
      </el-collapse-item>-->
    </el-collapse>

    <div style="height: 50px; background-color: red;margin: 15px 0;">
      广告
    </div>
    <div class="menuTitle">
      <span>新闻资讯</span>
    </div>
  </div>
</template>

<script>
import { getTabcharts, getShopList } from '@/api/api'
import Chart from '@/components/Charts/lineMarker'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: { Chart },
  data() {
    return {
      activeName2: 'first',
      activeNames: ['1'],
      tabChartsData: [],
      shopListData: [],
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getTabchartsList()
    this.getShopListData()
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
    handleClick(tab, event) {
      // console.log(tab.index)
      // console.log(this.$refs['charts' + tab.index][0])
      this.$refs['charts' + tab.index][0].__resizeHanlder()
    },
    handleChange(val) {
      console.log(val)
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
  .list {
    height: 40px;
    line-height: 40px;
    position: relative;
    border: 1px solid #99a9bf;
    border-top: none;

  }
  .list div {
    position: absolute;
    right: 10px;
    top: 0;
  }

  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
    //height: width/2;
    //height: 300px;
  }
</style>
