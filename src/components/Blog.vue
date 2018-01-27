<template>
  <div id="blog" class="blog" v-bind:class="{ 'is-night' : nightVision }">
    <div class="wrap">
      <about></about>
      <div class="blog-options">
        <div class="blog-options-end">
          <button class="blog-option" v-bind:class="{ 'is-active' : showGrid }" v-on:click="setGridView">
            <svg class="icon icon-view_module"><use xlink:href="#icon-view_module"></use></svg>
            <span class="sr-only">Grid</span>
          </button>
          <button class="blog-option" v-bind:class="{ 'is-active' : !showGrid }" v-on:click="setListView">
            <svg class="icon icon-view_list"><use xlink:href="#icon-view_list"></use></svg>
            <span class="sr-only">List</span>
          </button>
          <button class="blog-option" v-bind:class="{ 'is-active' : !nightVision }" v-on:click="setDayTime">
            <svg class="icon icon-sun-o"><use xlink:href="#icon-sun-o"></use></svg>
            <span class="sr-only">Day</span>
          </button>
          <button class="blog-option" v-bind:class="{ 'is-active' : nightVision }" v-on:click="setNightTime">
            <svg class="icon icon-moon-o"><use xlink:href="#icon-moon-o"></use></svg>
            <span class="sr-only">Night</span>
          </button>
        </div>
      </div>
      <post-list :posts="posts" :openPopup="openPopup" :grid="showGrid"></post-list>
      <popup :post="selectedPost" :showPopup="showPopup" :closePopup="closePopup"></popup>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import About from './About.vue'
import PostList from './PostList.vue'
import Popup from './Popup.vue'

export default {
  name: 'blog',
  components: {
    About,
    PostList,
    Popup
  },
  data() {
    return {
      showGrid: true,
      nightVision: false,
      posts: [],
      selectedPost: {},
      showPopup: false
    }
  },
  created: function () {
    const postsRef = firebase.database().ref('posts')

    postsRef.once('value')
      .then(snapshot => {

            snapshot.forEach(childSnapshot => {
              let post = childSnapshot.val()
              let postId = childSnapshot.key

              post.id = postId

              this.posts.push(post)

            })
        })
  },
  methods: {
  	openPopup: function (post, event) {
      if (post.type == 'post') {
        event.preventDefault()
        this.showPopup = true 
        this.selectedPost = post 
      }
  	},
    closePopup: function () {
      this.showPopup = false
    },
    setGridView: function () {
      this.showGrid = true
    },
    setListView: function () {
      this.showGrid = false
    },
    setDayTime: function () {
      this.nightVision = false
    },
    setNightTime: function () {
      this.nightVision = true
    },
  }
}
</script>

<style lang="sass">
body {
	margin: 0;
}

.blog {
  padding: 1rem;
  min-height: 100vh;
  background: #fff;
  color: #333;

  &.is-night {
    background: #1f1f1f;
    color: #fff;
  }
}

.wrap {
	margin: 0 auto;
	width: 100%;
	max-width: 48em;
}

.blog-options {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

.blog-options-end {
  margin-left: auto;
}

.blog-option {
    font-size: 1.25em;
    background: transparent;
    border: none;
    width: 1.5em;
    height: 1.5em;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    outline: none;
    color: inherit;

    &:hover,
    &:active,
    &:focus {
      outline: none;
    }

    &.is-active {
      background: #ddd;
    }
}
</style>
