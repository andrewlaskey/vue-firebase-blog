<template>
  <transition name="zoom">
    <div class="popup" v-show="showPopup">
      <div class="popup-content">
        <h2 class="popup-title">{{ post.title }}</h2>
        <div v-html="compiledMarkdown"></div>
        <button v-on:click="closePopup()">
          <svg class="icon icon-close"><use xlink:href="#icon-close"></use></svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import marked from 'marked'

export default {
  name: 'popup',
  props: ['post', 'showPopup', 'closePopup'],
  data () {
    return {}
  },
  computed: {
    compiledMarkdown () {
      if (this.post.hasOwnProperty('content')) {
        return marked(this.post.content)
      } else {
        return ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="sass">
@import "../../styles/colors.scss";

  .zoom-enter-active {
    animation: zoom-in .15s;
  }
  .zoom-leave-active {
    animation: zoom-in .15s reverse;
  }
  @keyframes zoom-in {
    0% {
      transform: scale(0.25);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    background: #fff;

    &.is-open {
      display: block;
    }
  }

  .is-night .popup {
    background: #1f1f1f;
  }

  .popup-content {
    position: relative;
    margin: 0 auto;
    padding: 4em 2em 2em;
    max-width: 36em;
  }

  .popup-content button {
      position: absolute;
      top: 1em;
      right: 0;
      background: transparent;
      border: none;
      font-size: 2em;
      cursor: pointer;
      color: inherit;
      outline: none;

      &:hover,
      &:focus,
      &:active {
        color: $link-color;
        outline: none;
      }
  }

  .popup-title {
    margin-bottom: 1.5em;
    text-align: center;
  }

  .popup-content img {
    display: block;
    margin: 0 auto 1.5em;
    max-width: 100%;
  }
</style>