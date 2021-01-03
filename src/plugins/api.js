import axios from 'axios'

const DEFAULT_CONFIG = {
  baseURL: 'https://api.github.com/',
}

export const api = axios.create(DEFAULT_CONFIG)

export default {
  install(Vue) {
    Vue.prototype.$api = api
  },
}
