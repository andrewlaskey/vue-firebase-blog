<template>
  <div class="about">
    <div class="about-title">
      <h1 class="h3">{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <nav class="about-social">
      <a v-for="(site, key) in socialSites" class="social-link" v-bind:href="site.url" target="_blank">
        <svg class="icon" v-bind:class="'icon-' + key"><use v-bind:xlink:href="'#icon-' + key"></use></svg>
        <span class="sr-only">{{ key }}</span>
      </a>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'about',
  data () {
    return {
      title: 'Andrew Laskey',
      headline: 'I make web things',
      description: 'This is a description',
      socialSites: {}
    }
  },
  created () {
    const siteRef = firebase.database().ref('site')

    siteRef.once('value')
      .then((snapshot) => {
        let siteData = snapshot.val()

        this.title = siteData.title
        this.headline = siteData.headline
        this.description = siteData.description

        this.socialSites = siteData.social
      })
  }
}
</script>

<style lang="sass">
  .about {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .social-link {
    display: inline-block;
    padding: 0 0.25em;
    font-size: 1.25em;
    text-decoration: none;
  }

  @media screen and (max-width: 600px) {
    .about {
      flex-wrap: wrap;
    }

    .about-title,
    .about-social {
      width: 100%;
      text-align: center;
    }
  }
</style>