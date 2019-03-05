<template>
  <div class="menu-wrapper" @click="clickItem(item)">
    <el-menu-item :index="item.id">
      <span slot="title" >{{ item.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
import bus from '../../../../utils/bus'
import { cmparedArr } from '../../../../utils'
import { getMenus } from '@/api/login'
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  computed: {
    ...mapGetters([
      'menuData'
    ])
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
