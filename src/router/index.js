import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('@/view/Index')), 'index')

Vue.use(Router)

export default new Router({
  base: '/vue/',
  mode: 'history',
  routes: [
    {path: '/', redirect: 'index'}
  ]
})
