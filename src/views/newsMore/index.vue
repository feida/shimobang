<template>
  <div style="width: 100%;">
    <div v-if="device !='mobile'" style="width: 300px;float: left;" >
      <div>
        <div style="height: 50px; line-height: 50px; text-align: center; font-size: 18px; font-weight: bold; background-color:skyblue; ">
          热门产品
        </div>
        <div>
          <el-row >
            <el-col :span="8">

            </el-col>
            <el-col :span="8">

            </el-col>
            <el-col :span="8">

            </el-col>
          </el-row>
        </div>
      </div>
      <div></div>
    </div>
    <div :style="device !='mobile' && {'margin-left': '330px'}">
      <el-tabs type="card" class="tabs" @tab-click="handleClick" >
        <el-tab-pane v-for=" (item,index) in news_categoryData" :label="item.news_category" :key="index">
          <div>
            <div class="container">
              <div v-for=" item in newsList" :key="item.news_id" class="itemWrap">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="new_title">
                      <span>{{item.news_date}}</span>
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div style="line-height: 30px">
                      <span>{{item.news_title}}</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="new_title">
                      <span style="color: #3a8ee6;">阅读全文</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div style="text-align: center; margin: 20px 0;">
              <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page="page" :page-sizes="[10,20,30, 50]"
                             :page-size="num" layout="total, sizes, prev, pager, next, jumper"
              >
              </el-pagination>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { getNews_category, all_news_list } from '@/api/api'

export default {
  data() {
    return {
      page:1,
      num: 10,
      total: 1000,
      news_category_id: '',
      news_categoryData: [],
      newsList:[]
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },

  },
  created() {
    this.getNewsCategoryList()
  },
  methods: {
    getNewsCategoryList() {
      getNews_category().then(response => {
        console.log('getNews_category', response)
        if (response.data) {
          this.news_categoryData = response.data
          this.news_category_id = response.data[0].news_category_id
          this.getAllNewsList()
        }
      })
    },
    getAllNewsList() {
      let query = {
        page: this.page,
        num: this.num,
        news_category_id: this.news_category_id,
      }
      all_news_list(query).then(response => {
        console.log('all_news_list', response)
        if (response.data) {
          this.newsList = response.data
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
      this.num = val;
      this.getAllNewsList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getAllNewsList();
    },
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
</style>

