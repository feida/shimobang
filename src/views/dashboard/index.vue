<template>
  <div class="dashboard-container">
    <el-tabs v-model="activeName2" type="card" class="tabs" @tab-click="handleClick" >
      <el-tab-pane label="石墨化石油焦" name="first">
        <div style="height: 300px; background-color: skyblue;"/>
      </el-tab-pane>
      <el-tab-pane label="石墨化石油焦" name="second">
        <div style="height: 300px; background-color: red;"/>
      </el-tab-pane>
      <el-tab-pane label="半石墨化石油焦" name="third">
        <div style="height: 300px; background-color: #99a9bf;"/>
      </el-tab-pane>
      <el-tab-pane label="石油煅烧焦" name="fourth">
        <div style="height: 300px; background-color: #304156;"/>
      </el-tab-pane>
    </el-tabs>
    <div style="height: 50px; background-color: red;margin: 15px 0;">
      广告
    </div>
    <div class="menuTitle">
      <span>在线采购</span>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="增碳剂" name="1">
        <div class="list">
          <span>石墨化石油焦</span>
          <div>
            <el-button round size="mini">议价</el-button>
            <el-button round size="mini">立即采购</el-button>
          </div>
        </div>
        <div class="list">
          <span>石墨化石油焦</span>
          <div>
            <el-button round size="mini">议价</el-button>
            <el-button round size="mini">立即采购</el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="石墨电极" name="2">
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
      </el-collapse-item>
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
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      activeName2: 'first',
      activeNames: ['1']
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  .tabs .el-tabs__nav-wrap  {
    background-color: #eee;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    background-color: #fff;
  }
  .el-collapse-item__header {
    background-color: darkturquoise;
    font-size: 16px;
    padding: 0 15px;
  }

  .el-collapse-item__content {
    padding-bottom: 0;
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

  }
  .list div {
    position: absolute;
    right: 10px;
    top: 0;
  }
</style>
