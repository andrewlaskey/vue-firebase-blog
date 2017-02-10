<template>
  <div id="app">
    <about></about>
    <posts></posts>
  </div>
</template>

<script>
import About from './components/About.vue'
import Posts from './components/Posts.vue'

export default {
  name: 'app',
  components: {
    About,
    Posts
  }
}
</script>
