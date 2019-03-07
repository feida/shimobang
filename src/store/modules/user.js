import { login, getMenus } from '@/api/api'
import { getToken, setToken, removeToken, setCookie, removeCookie } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    loading: true,
    menuData: [],
    menuDataItem: {}
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
    SET_MENUDATA: (state, menuData) => {
      state.menuData = menuData
    },
    SET_MENUDATAITEM: (state, menuDataItem) => {
      state.menuDataItem = menuDataItem
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const userName = userInfo.userName.trim()
      return new Promise((resolve, reject) => {
        login(userName, userInfo.pwd).then(response => {
          // console.log('登陆', response)
          if (response) {
            setToken(response.token)
            setCookie('userName', response.userName)
            setCookie('brandName', response.brandName)
            commit('SET_TOKEN', response.token)
            commit('SET_NAME', response.userName)
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
    },

    // 保存menuData 列表数据
    SetMenuData({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_MENUDATA', data)
        resolve()
      })
    },

    // 列表item数据
    SetMenuDataItem({ commit }, data) {
      return new Promise(resolve => {
        // console.log('data______', JSON.stringify(data))
        commit('SET_MENUDATAITEM', data)
        resolve()
      })
    }
  }
}

export default user
