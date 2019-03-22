import { getInfo, getUserInfo } from '@/api/api'
import { getToken, removeToken, removeCookie } from '@/utils/auth'
import { getQueryString } from '@/utils/index'

const user = {
  state: {
    token: getToken(),
    name: '',
    loading: true,
    info: {
      bg_url: '',
      email: '',
      logo_url: '',
      qrcode_url: '',
      telphone: '',
      AD_data: [],

    },

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
      state.info = info
    }

  },

  actions: {
    // 基本资料
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log('基本资料', response)
          if (response.code == '0000') {
            commit('SET_INFO', response.data)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          console.log('getUserInfo', response)
          if (response.code == '0000' && response.data) {
            // commit('SET_NAME', response.data.username)
            sessionStorage.setItem('userName', response.data.name)
            sessionStorage.setItem('customer_id', response.data.customer_id)
            // setSession('userName', response.data.name);
          }
          resolve()
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
        resolve()
      })
    }

  }
}

export default user
