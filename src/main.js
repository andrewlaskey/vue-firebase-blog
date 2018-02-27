import Vue from 'vue'
import VueRouter from 'vue-router'
import {CONFIG} from '../private.config.js'
import firebase from 'firebase'
import App from './App.vue'
import Blog from './components/Blog.vue'
import AddPost from './components/AddPost.vue'

const fbApp = firebase.initializeApp(CONFIG.FIREBASE)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/',
      component: Blog
    },
    {
      path: '/add',
      component: AddPost
    }
  ]
})

let app = new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  template: '<app></app>',
  components: {
    App
  }
})
