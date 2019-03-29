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
            <el-col :span="8" class="hot_product">价格 元/(吨)</el-col>
          </el-row>
          <el-row v-for=" item in hotProductData" :key="item.name">
            <el-col :span="16" class="hot_product">{{ item.name }}</el-col>
            <el-col :span="8" class="hot_product">{{ item.price }}</el-col>
          </el-row>
        </div>
      </div>
      <div style="margin-top: 30px;">
        <a :href="info.AD_data[0].link" target="_blank">
          <img :src="info.AD_data[0].img_url" style="width: 100%; height: 80px;" alt="">
        </a>
        <a :href="info.AD_data[1].link" target="_blank">
          <img :src="info.AD_data[1].img_url" style="width: 100%; height: 80px;" alt="">
        </a>
        <a :href="info.AD_data[2].link" target="_blank">
          <img :src="info.AD_data[2].img_url" style="width: 100%; height: 80px;" alt="">
        </a>
      </div>
    </div>
    <div :style="device !='mobile' && {'margin-left': '330px'}" class="container">
      <h3 style="text-align: center; font-size: 24px;">{{ newsDetailData.news_title }}</h3>
      <p style="text-align: center; color: rgb(62, 62, 62)">
        <span>编辑：{{ newsDetailData['news_ author'] }}</span>
        <span style=" margin-left: 50px">{{ newsDetailData.news_date }}</span>
      </p>
      <div class="content" v-html="newsDetailData['news_ content']"/>
    </div>

  </div>
</template>

<script>
import { hotProduct, newsDetail } from '@/api/api'
import { mapGetters } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.newsDetailData.news_title,
      meta: [
        {
          name: 'keywords',
          content: this.newsDetailData.keyword
        },
        {
          name: 'description',
          content: this.newsDetailData.description
        }
      ]
    }
  },
  data() {
    return {
      hotProductData: [],
      newsDetailData: {}
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ]),
    device() {
      return this.$store.state.app.device
    }

  },
  created() {
    this.getHotProductList()
    this.getNewsDetail()
  },
  methods: {
    // 热门产品
    getHotProductList() {
      hotProduct().then(response => {
        console.log('hotProductData', response)
        if (response.data) {
          this.hotProductData = response.data
        }
      })
    },

    // 新闻详情
    getNewsDetail() {
      const query = {
        news_id: this.$route.params.news_id
      }
      newsDetail(query).then(response => {
        console.log('newsDetail', response)
        if (response.data) {
          this.newsDetailData = response.data
        }
      })
    }

  }
}
</script>

<style scoped>
  .container {
    border: 1px solid #DCDFE6;
    min-height: calc(100vh - 30px);
    padding: 15px;
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

  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .el-tabs__header {
    margin: 0;
  }

  .content img {
    width: 100%;
  }
</style>

