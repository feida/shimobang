<template>
  <div class="dashboard-container">
    <div style="width: 400px; height: 400px; background: red; position: absolute; top: -400px; left: 0; z-index: 100"/>
    <div class="menuTitle">
      <span class="menuTitle_icon"/>
      <span>价格趋势</span>
    </div>
    <el-tabs type="card" class="tabs" @tab-click="handleClick" >
      <el-tab-pane v-for=" (item,index) in tabChartsData" :label="item.title" :key="index">
        <div class="chart-container">
          <chart :id="'wrap'+ index" :ref= "'charts'+ index" :charts_data= "item.charts_data" height="100%" width="100%"/>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="margin: 15px 0;">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a :href="info.AD_data[0].link" target="_blank">
            <img :src="info.AD_data[0].img_url" style="width: 100%; height: 80px;" alt="">
          </a>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a :href="info.AD_data[1].link" target="_blank">
            <img :src="info.AD_data[1].img_url" style="width: 100%; height: 80px;" alt="">
          </a>
        </el-col>
      </el-row>
    </div>
    <div class="menuTitle">
      <span class="menuTitle_icon"/>
      <span>在线采购</span>
    </div>
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item v-for=" (item,index) in tempShopData" :title="item.shop_category" :key="'shop_category'+ index" :name="index + 1">
        <div v-for=" (m,n) in item.data_list" :key="'data_list' + n" class="list">
          <span class="shop_name">{{ m.shop_name }}</span>
          <div>
            <el-button round type="primary" size="mini" @click="talkPrice(m)">议价</el-button>
            <el-button round type="danger" size="mini" @click="buy_goods(m)">立即采购</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div v-if="shopListData.length > 4 && show" class="more" @click="getMore">
      <span>更多<i class="el-icon-arrow-down"/></span>
    </div>

    <div style="margin: 15px 0;">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a :href="info.AD_data[2].link" target="_blank">
            <img :src="info.AD_data[2].img_url" style="width: 100%; height: 80px;" alt="">
          </a>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a :href="info.AD_data[3].link" target="_blank">
            <img :src="info.AD_data[3].img_url" style="width: 100%; height: 80px;" alt="">
          </a>
        </el-col>
      </el-row>
    </div>
    <div class="menuTitle">
      <span class="menuTitle_icon"/>
      <span>新闻资讯</span>
    </div>
    <div style="background-color: #f9f9f9; padding-bottom: 15px">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in newsListData" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :key="index">
          <div class="grid-content bg-purple">
            <div>
              <h4 style="display:inline-block;">  {{ item.news_category }} </h4>
              <span style="float: right; line-height: 60px; color: #3a8ee6;" @click="pushMore">更多>></span>
            </div>
            <div v-for=" ( m, n ) in item.data_list" :key="'list' + n" class="news_wrap" @click="pushDetail(m.news_id)">
              <span class="newsTitle">{{ m.news_title }}</span>
              <span class="newsDate">{{ m.news_date }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="议价" width="80%">
      <el-form ref="talkPrice" :model="talkPriceData" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="意向价格" prop="price">
          <el-input v-model="talkPriceData.price"/>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="talkPriceData.count"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTalk">取 消</el-button>
        <el-button type="primary" @click="commitTalk('talkPrice')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible1" title="立即采购" width="80%">
      <el-form ref="buy" :model="buyData" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名">
          <span>{{ buyData.goods_name }}</span>
        </el-form-item>
        <el-form-item label="单价">
          <span>{{ buyData.price }}</span>
        </el-form-item>
        <el-form-item label="采购量" prop="total_num">
          <el-input v-model="buyData.total_num" @change="keydown()"/>
        </el-form-item>
        <el-form-item label="总价" >
          <span style="font-size: 18px; color: red;">{{ buyData.total_price }}</span>
        </el-form-item>
        <el-form-item label="收货地址" prop="reciving_address">
          <el-input v-model="buyData.reciving_address"/>
        </el-form-item>
        <el-form-item label="物流方式">
          <el-radio-group v-model="buyData.logistics_mode">
            <el-radio :label="0">到付</el-radio>
            <el-radio :abel="1">寄付</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            :rows="2"
            v-model="buyData.remark"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBuy">取 消</el-button>
        <el-button type="primary" @click="commitBuy('buy')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTabcharts, getShopList, getNewsList, bargaining, buy } from '@/api/api'
import Chart from '@/components/Charts/lineMarker'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: { Chart },
  data() {
    return {
      show: true,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      talkPriceData: {
        price: '',
        count: '',
        shop_id: '',
        customer_id: ''
      },
      buyData: {
        customer_id: '',
        goods_id: '',
        goods_name: '',
        price: '',
        total_price: 0,
        total_num: '',
        reciving_address: '',
        logistics_mode: 0,
        remark: ''

      },
      activeNames: 1,
      tabChartsData: [],
      shopListData: [],
      tempShopData: [],
      newsListData: [],
      rules: {
        price: [
          { required: true, message: '请输入意向价格', trigger: 'blur' },
          { pattern: /([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])/, message: '只能输入大于0的数字', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '请输入数量', trigger: 'change' },
          { pattern: /([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])/, message: '只能输入大于0的数字', trigger: 'blur' }
        ],
        total_num: [
          { required: true, message: '请输入数量', trigger: 'change' },
          { pattern: /([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])/, message: '只能输入大于0的数字', trigger: 'blur' }
        ],
        reciving_address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ]
      }
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
          this.tempShopData = response.data.slice(0, 4)
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

    // 议价
    talkPrice(m) {
      this.dialogFormVisible = true
      this.talkPriceData.customer_id = ''
      this.talkPriceData.shop_id = m.shop_id
    },
    commitTalk(talkPrice) {
      this.$refs[talkPrice].validate((valid) => {
        if (valid) {
          /* bargaining(this.talkPriceData).then(response => {
            console.log('bargaining', response)
            this.$message({
              message: '您的议价请求已发送给工作人员，工作人员将尽快与您联系！',
              type: 'success',
            });
            this.dialogFormVisible = false;
          }).catch(err => {
            this.$message.error('议价失败');
            this.dialogFormVisible = false;
          })*/
          this.$message({
            message: '您的议价请求已发送给工作人员，工作人员将尽快与您联系！',
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    cancelTalk() {
      this.dialogFormVisible = false
      this.restTalkPriceData()
    },

    restTalkPriceData() {
      this.talkPriceData = {
        price: '',
        count: '',
        shop_id: '',
        customer_id: ''
      }
    },

    // 采购
    buy_goods(m) {
      this.buyData.customer_id = ''
      this.buyData.goods_id = m.shop_id
      this.buyData.goods_name = m.shop_name
      this.buyData.price = m.price
      this.dialogFormVisible1 = true
    },
    cancelBuy() {
      this.dialogFormVisible1 = false
      this.restBuyData()
    },
    commitBuy(buy) {
      this.$refs[buy].validate((valid) => {
        if (valid) {
          /* buy(this.buyData).then(response => {
            console.log('buyData', response)
            this.$message({
              message: '您的采购请求已发送给工作人员，工作人员将尽快与您联系！',
              type: 'success',
            });
            this.dialogFormVisible1 = false;
          }).catch(err => {
            this.$message.error('采购失败');
            this.dialogFormVisible1 = false;
          })*/
          this.$message({
            message: '您的采购请求已发送给工作人员，工作人员将尽快与您联系！',
            type: 'success'
          })
          this.dialogFormVisible1 = false
        } else {
          return false
        }
      })
    },

    restBuyData() {
      this.buyData = {
        customer_id: '',
        goods_id: '',
        goods_name: '',
        price: '',
        total_price: 0,
        total_num: '',
        reciving_address: '',
        logistics_mode: 0,
        remark: ''
      }
    },
    keydown() {
      this.buyData.total_price = Math.floor(this.buyData.total_num * this.buyData.price * 100) / 100
    },

    // 更多产品
    getMore() {
      this.show = false
      this.tempShopData = this.shopListData
    },

    // 更多新闻
    pushMore() {
      this.$router.push('/newsMore/index')
    },

    // 新闻详情
    pushDetail(id) {
      this.$router.push('/newsDetail/index/' + id)
    },

    handleClick(tab, event) {
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

  .more {
    text-align: center;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    color: #909399;
    background: #F2F6FC;
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
