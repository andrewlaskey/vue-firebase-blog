<template>
	<div class="post">
		<a v-bind:class="postClass" v-bind:href="openLink" v-on:click="openPost">
			<div class="post-img">
				<img v-bind:src="post.hero" alt="">
			</div>
			<h3>{{ post.title}}</h3>
		</a>
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
		},
		postClass: function () {
			return 'post-inner post-inner-' + this.post.type
		},
		openLink: function () {
			if (this.post.type === 'post') {
				return '#'
			}
			return this.post.content
		}
	},
	openPost: function (e) {
		if (this.post.type === 'post') {
			e.preventDefault()

			return false
		}

		return true
	}
}
</script>

<style lang="sass">
.post-inner {
	display: block;
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