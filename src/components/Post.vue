<template>
	<div class="post">
		<div class="post-img">
			<img v-bind:src="post.hero" alt="">
		</div>
		<h3>{{ post.title}}</h3>
		<!-- <div v-html="compiledMarkdown"></div> -->
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

<style lang="sass">
.post {
	position: relative;
}

.post-img {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: hidden;

	img {
		width: 100%;
	}
}
</style>