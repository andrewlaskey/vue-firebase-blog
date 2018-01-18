<template>
  <div id="add-post" class="section">
    
    <div v-show="!loggedIn" class="container">
      <div class="columns is-centered">
        <form class="column is-one-third" v-on:submit.prevent="trySignIn">
          <h1 class="title">Log In</h1>
          <div class="field">
            <label for="email">Email</label>
            <div class="control">
              <input class="input" type="email" name="email" v-model="userEmail">
            </div>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <div class="control">
              <input class="input" type="password" name="password" v-model="password">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button">Log In</button>
              <p class="help is-danger" v-show="hasError">{{errorMessage}}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
    
    <div v-show="loggedIn">
      
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title">Create New Post!</h1>
            <form v-on:submit.prevent="createPost">
              <div class="field">
                <label for="password">Title</label>
                <div class="control">
                  <input class="input" type="text" name="password" v-model="title">
                </div>
              </div>
              <div class="field">
                <label for="password">Category</label>
                <div class="control">
                  <div class="select" v-model="category">
                    <select>
                      <option v-for="category in categories">{{category}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="postorlink" value="post" v-model="postOrLink">
                    Post
                  </label>
                  <label class="radio">
                    <input type="radio" name="postorlink" value="link" v-model="postOrLink">
                    Link
                  </label>
                </div>
              </div>
              <div class="field" v-show="postOrLink == 'post'">
                <label class="label">Content</label>
                <div class="control">
                  <textarea class="textarea" placeholder="### Use Markdown" v-model="content"></textarea>
                </div>
              </div>
              <div class="field" v-show="postOrLink == 'link'">
                <label for="password">Url</label>
                <div class="control">
                  <input class="input" type="text" name="password" v-model="content">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button">Add Post</button>
                  <p class="help is-danger" v-show="hasError">{{errorMessage}}</p>
                </div>
              </div>
            </form>
            <div class="notification is-primary" v-show="success">Post Added!</div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <p><a href="#" v-on:click.prevent="trySignOut">Log out</a></p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'addpost',
  data () {
    return {
      loggedIn: false,
      hasError: false,
      success: false,
      errorMessage: '',
      userEmail: '',
      password: '',
      categories: ['personal', 'work', 'thoughts', 'fun'],
      title: '',
      content: '',
      category: 'personal',
      postOrLink: 'post'
    }
  },
  created: function () {
    this.createAuthListener()
  },
  methods: {
    handleError: function (msg) {
      this.hasError = true
      this.errorMessage = msg
    },
    reset: function () {
      this.loggedIn = false
      this.error =  false
      this.errorMessage = ''
      this.userEmail = ''
      this.password = ''
    },
    userSignedIn: function (user) {
      this.loggedIn = true
      this.error = false
      this.errorMessage = ''
    },
    createAuthListener: function () {
      let _this = this

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          _this.userSignedIn(user)
        } else {
        // No user is signed in.
        }
      })
    },
    trySignIn: function () {
      let _this = this

      firebase.auth().signInWithEmailAndPassword(this.userEmail, this.password).catch(function(error) {
        _this.handleError(error.message)
      })
    },
    trySignOut: function () {
      let _this = this;

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        _this.reset()
      }).catch(function(error) {
        // An error happened.
        _this.handleError(error.message)
      });
    },
    createPost: function () {
      let _this = this

      let newPostRef = firebase.database().ref('posts')
        .push({
          title: this.title,
          category: this.category,
          type: this.postOrLink,
          content: this.content,
          postDate: Date.now()
        })

      firebase.database().ref('categories/' + this.category + '/' + newPostRef.key).set(true);

      this.success = true
    }
  }
}
</script>

<style lang="sass">
  @import "../../node_modules/bulma/bulma.sass";
</style>
