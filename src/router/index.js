import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import topicList from '../views/topicList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'topicList',
      component: topicList
      // component: r => require.ensure([], () => r(require('../views/topicList.vue')), 'topicList')
    }
  ]
})
