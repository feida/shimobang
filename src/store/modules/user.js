import { getInfo } from '@/api/api'
import { getToken, setToken, removeToken, setCookie, removeCookie } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    loading: true,
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_LOADING: (state, value) => {
      state.loading = value
    },
    SET_INFO: (state, info) => {
      console.log('set', info)
      state.info = info
    },
    SET_MENUDATAITEM: (state, menuDataItem) => {
      state.menuDataItem = menuDataItem
    }
  },

  actions: {
    // 基本资料
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log('基本资料', response)
          if (response) {
            commit('SET_INFO', response.data)
            /*setToken(response.token)
            setCookie('userName', response.userName)
            setCookie('brandName', response.brandName)
            commit('SET_TOKEN', response.token)
            commit('SET_NAME', response.userName)*/
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeCookie('userName')
        removeCookie('brandName')
        resolve()
      })
    },

    // 初始化menu数据
    GetMenus({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenus().then(response => {
          // console.log('response1', response)
          if (response) {
            if (state.menuData.length > 0) {
              if (JSON.stringify(state.menuData) !== JSON.stringify(response)) {
                resolve({ reload: true })
              }
            }
            commit('SET_MENUDATA', response)
            commit('SET_MENUDATAITEM', response[0])
            commit('SET_LOADING', false)
            resolve({})
          }
        })
      })
    }
  }
}

export default user
