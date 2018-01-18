// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'
import {CONFIG} from '../private.config.js'
import firebase from 'firebase'
import App from './App.vue'
import Blog from './components/Blog.vue'
import AddPost from './components/AddPost.vue'

const fbApp = firebase.initializeApp(CONFIG.FIREBASE)

Vue.use(VueRouter)

const routes = [
	{ 
		path: '/',
		component: Blog
	},
	{
		path: '/add',
		component: AddPost
	}
]

const router = new VueRouter({
	routes
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  template: '<app></app>',
  components: {
  	App
  }
})
