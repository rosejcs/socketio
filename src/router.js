import Vue from 'vue'
import Router from 'vue-router'

import Socketio from './components/Socketio.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:Socketio
    },
  ]
})
