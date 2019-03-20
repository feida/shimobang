import { getInfo } from '@/api/api'
import { getToken, removeToken, removeCookie } from '@/utils/auth'

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
            /* setToken(response.token)
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
    }

  }
}

export default user
