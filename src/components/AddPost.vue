<template>
  <div id="add-post" class="section">
    <div v-show="!loggedIn" class="container">
      <div class="columns is-centered">
        <form class="column is-one-third" v-on:submit.prevent="trySignIn">
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
    <div v-show="loggedIn" class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <p><a href="#" v-on:click.prevent="trySignOut">Log out</a></p>
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
      errorMessage: '',
      userEmail: '',
      password: '',
      categories: ['personal', 'work', 'thoughts', 'fun'],
      title: '',
      content: ''
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
  }
}
</script>

<style lang="sass">
  @import "../../node_modules/bulma/bulma.sass";
</style>
