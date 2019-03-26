import Vue from 'vue'
import 'babel-polyfill'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import MetaInfo from 'vue-meta-info'

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Dialog,
  Input,
  Radio,
  RadioGroup,
  Button,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Icon,
  Row,
  Col,
  Collapse,
  CollapseItem,
  Loading,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

// import 'element-ui/lib/theme-chalk/src/base.css
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// Vue.use(ElementUI, { locale })

Vue.use(MetaInfo)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
