<style lang="sass" src="../styles/style.scss"></style>

<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'app',
  data () {
    return {}
  }
}
</script>