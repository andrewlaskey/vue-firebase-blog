<template>
  <div id="blog" class="wrap">
    <about></about>
    <post-list :posts="posts" :openPopup="openPopup"></post-list>
    <popup :post="selectedPost" :showPopup="showPopup" :closePopup="closePopup"></popup>
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
    }
  }
}
</script>

<style lang="sass">
body {
	margin: 0;
}

.wrap {
	margin: 0 auto;
	width: 100%;
	max-width: 48em;
}
</style>
