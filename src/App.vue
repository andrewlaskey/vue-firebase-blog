<template>
  <div id="app" class="wrap">
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
  },
  methods: {
  	openPopup: function (prop) {
  		console.log(prop)
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
