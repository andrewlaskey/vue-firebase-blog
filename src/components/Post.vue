<template>
	<div class="post">
		<!-- <img v-bind:src="post.hero" alt=""  width="100%"> -->
		<h3>{{ post.title}}</h3>
		<div v-html="compiledMarkdown"></div>
	</div>
</template>

<script>
import marked from 'marked'

export default {
	name: 'post',
	props: ['post'],
	data () {
		return {}
	},
	computed: {
		compiledMarkdown: function () {
			return marked(this.post.content, {sanitize: true})
		}
	}
}
</script>