<template>
  <div class="post-list" v-bind:class="{ 'is-grid': grid }">
    <ul>
      <li v-for="(post, index) in posts" v-on:mouseenter="activePost = index" v-on:mouseleave="activePost = -1" v-on:click="activePost = index">
        <post :post="post" :openPopup="openPopup" :highlight="activePost == index"></post>
      </li>
    </ul>
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
  name: 'post-list',
  props: ['posts', 'openPopup', 'grid'],
  data () {
    return {
      activePost: -1
    }
  },
  components: {
    Post
  },
  methods: {}
}
</script>

<style lang="sass">
.post-list {
  position: relative;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (min-width: 561px) {
  .post-list.is-grid {
    ul {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: center;
      margin: 0;
      width: 25%;
      height: 128px;
    }
  }
}

@media screen and (min-width: 561px) and (max-width: 640px) {
  .post-list {
    margin-left: auto;
    margin-right: auto;
    width: 64%;
  }
}

@media screen and (min-width: 641px) and (max-width: 770px) {
  .post-list {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
}
</style>