<template>
  <div style="width: 100%;">
    <div v-if="device !='mobile'" style="width: 300px;float: left;" >
      <div>
        <div style="height: 50px; line-height: 50px; text-align: center; font-size: 18px; font-weight: bold; background-color:skyblue; ">
          热门产品
        </div>
        <div style="text-align: center;">
          <el-row>
            <el-col :span="16" class="hot_product">产品</el-col>
            <el-col :span="8" class="hot_product">价格 (元/吨)</el-col>
          </el-row>
          <el-row v-for=" item in hotProductData" :key="item.name">
            <el-col :span="16" class="hot_product">{{ item.name }}</el-col>
            <el-col :span="8" class="hot_product">{{ item.price }}</el-col>
          </el-row>
        </div>
      </div>
      <div style="margin-top: 30px;">
        <a v-if="info.AD_data[0]" :href="info.AD_data[0].link" target="_blank" class="ad_wrap">
          <img :src="info.AD_data[0].img_url" style="width: 100%; height: 80px;" alt="广告">
        </a>
        <img v-else="" src="../../assets/images/xuwei.jpg" style="width: 100%; height: 80px;" alt="">
        <a v-if="info.AD_data[1]" :href="info.AD_data[1].link" target="_blank" class="ad_wrap">
          <img :src="info.AD_data[1].img_url" style="width: 100%; height: 80px;" alt="广告">
        </a>
        <img v-else="" src="../../assets/images/xuwei.jpg" style="width: 100%; height: 80px;" alt="">
        <a v-if="info.AD_data[2]" :href="info.AD_data[2].link" target="_blank" class="ad_wrap">
          <img :src="info.AD_data[2].img_url" style="width: 100%; height: 80px;" alt="广告">
        </a>
        <img v-else="" src="../../assets/images/xuwei.jpg" style="width: 100%; height: 80px;" alt="">
      </div>
    </div>
    <div :style="device !='mobile' && {'margin-left': '330px'}">
      <el-tabs v-model="news_category_id" type="card" class="tabs" @tab-click="handleClick" >
        <el-tab-pane v-for=" (item,index) in news_categoryData" :label="item.news_category" :key="index" :name="item.news_category_id">
          <div>
            <div class="container">
              <div v-for="item in newsList" :key="item.news_id" class="itemWrap" @click="pushDetail(item.news_id)">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div :class="device !='mobile' && 'new_title'">
                      <span style="cursor: pointer;">{{ item.news_data }}</span>
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div :class="device !='mobile' && 'new_title'">
                      <span style="cursor: pointer;">{{ item.news_title }}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div :class="device !='mobile' && 'new_title'">
                      <span style="color: #3a8ee6; cursor: pointer;">阅读全文</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div style="text-align: center; margin: 20px 0;">
              <el-pagination
                :current-page="page"
                :page-sizes="[10,20,30, 50]"
                :page-size="num"
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { getNews_category, all_news_list, hotProduct } from '@/api/api'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      page: 1,
      num: 10,
      total: 1000,
      news_category_id: this.$route.params.news_category_id,
      // news_categoryData: [],
      newsList: [],
      hotProductData: []
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'news_categoryData'
    ]),
    device() {
      return this.$store.state.app.device
    }

  },
  created() {
    // this.getNewsCategoryList()
    this.getHotProductList()
    this.getAllNewsList()
  },
  methods: {
    // 新闻类别
    getNewsCategoryList() {
      getNews_category().then(response => {
        console.log('getNews_category', response)
        if (response.data) {
          this.news_categoryData = response.data
        }
      })
    },

    // 新闻列表
    getAllNewsList() {
      const query = {
        page: this.page,
        num: this.num,
        news_category_id: this.news_category_id
      }
      all_news_list(query).then(response => {
        console.log('all_news_list', response)
        if (response.data) {
          this.newsList = response.data
        }
      })
    },

    // 热门产品
    getHotProductList() {
      hotProduct().then(response => {
        console.log('hotProductData', response)
        if (response.data) {
          this.hotProductData = response.data
        }
      })
    },

    handleClick(tab, event) {
      // console.log('tab',tab)
      this.news_category_id = this.news_categoryData[tab.index].news_category_id
      this.page = 1
      this.getAllNewsList()
    },
    handleSizeChange(val) {
      this.num = val
      this.getAllNewsList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAllNewsList()
    },

    pushDetail(id) {
      this.$router.push('/newsDetail/index/' + id)
    }
  }
}
</script>

<style scoped>
  .container {
    border: 1px solid #DCDFE6;
  }
  .itemWrap {
    width: 100%;
    min-height:60px;
    padding: 10px;
    border-bottom: 1px solid #DCDFE6;
  }

  .itemWrap:hover {
    color: #3a8ee6;
    pointer: cursor;
  }

  .new_title {
   line-height: 60px;
  }
  .hot_product {
    border: 1px solid #E4E7ED;
    height: 40px;
    border-top: none;
    font-size: 14px;
    line-height: 40px;
  }

  .ad_wrap {
    display: inline-block;
    width: 100%;
    height: 80px;
    background: #eee;
  }

</style>
<style>
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
  .el-tabs__item {
    width: 209px;
    text-align: center;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .el-tabs__header {
    margin: 0;
  }
</style>

