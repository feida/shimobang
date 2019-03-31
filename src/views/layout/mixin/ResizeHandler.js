import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('setSmallDevice', true)
      // store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    isSmall() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < 500
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        const isSmall = this.isSmall()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')
        store.dispatch('setSmallDevice', isSmall ? true : false)

        if (isMobile) {
          // store.dispatch('CloseSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
