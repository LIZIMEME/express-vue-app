import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import topicList from '@/views/topic/topicList'
import Layout from '@/components/layout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'index', component:Layout,redirect:'/topics',
      children:[
        {path:'/topics',name:'topics',component:r => require.ensure([], () => r(require('../views/topic/topicList.vue')), 'topicList')},
        {path:'/topics/:id',name:'topicDetail',component:r => require.ensure([], () => r(require('../views/topic/detail.vue')), 'topicDetail')},
      ]
    },
    {
      path:'/home',
      name:'home',
    }
  ]
})
