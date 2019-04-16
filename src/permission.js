import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  store.dispatch('GetInfo').then(res => {
    next()
  }).catch((err) => {
    next(err)
  })


})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
