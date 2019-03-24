'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://yapi.demo.qunar.com/mock/54669"',
  // BASE_API: '"http://106.15.191.194:8080"',
})
