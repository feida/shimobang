<template>
  <el-scrollbar v-if="menuData && menuData.length > 0" wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="menuData[0].id"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <!--<sidebar-item v-for="item in menuData" :key="item.id" :item="item" style="text-align: center;"/>-->
      <sidebar-item v-for="item in firstArr" :key="item.id" :item="item" style="text-align: center;"/>
      <el-submenu index="1" style="text-align: center">
        <template slot="title" >
          <span slot="title">数据上传</span>
        </template>
        <el-menu-item-group style="text-align: center">
          <el-menu-item v-for="item in twoArr" :index="item.id" :key="item.id" @click="clickItem(item)">{{ item.name }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index= "1" style="text-align: center" @click="pushUpload()">上传／下载</el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import bus from '../../../../utils/bus'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { cmparedArr } from '../../../../utils'
import { getMenus } from '@/api/api'
export default {
  components: { SidebarItem },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'menuData'
    ]),

    firstArr() {
      const arr = this.menuData.filter((v, i) => {
        return v.name.indexOf('(上传)') === -1
      })
      return arr
    },
    twoArr() {
      const arr = this.menuData.filter((v, i) => {
        return v.name.indexOf('(上传)') !== -1
      })
      return arr
    }
  },
  created() {

  },
  methods: {
    clickItem(item) {
      getMenus().then(response => {
        if (response) {
          if (!cmparedArr(this.menuData, response)) {
            this.$store.dispatch('SetMenuData', response)
            this.$store.dispatch('SetMenuDataItem', response[0]).then(() => {
              bus.$emit('chooseList')
            })
          } else {
            this.$store.dispatch('SetMenuDataItem', item).then(() => {
              bus.$emit('chooseList')
            })
          }
        }
      }).catch(() => {
        this.$store.dispatch('SetMenuDataItem', item).then(() => {
          bus.$emit('chooseList')
        })
      })
    },
    pushUpload() {
      this.$router.push('/upload')
    }
  }
}
</script>
