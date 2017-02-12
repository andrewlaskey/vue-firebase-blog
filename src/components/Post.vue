<template>
	<div class="post">
		<a v-bind:class="postClass" v-bind:href="openLink" v-on:click="openPost">
			<div class="post-img">
				<img v-bind:src="post.hero" alt="">
				<div class="post-img-mask" v-bind:style="{backgroundColor: this.color}"></div>
			</div>
			<h3 class="post-title">{{ post.title }}</h3>
		</a>
		<!-- <div v-html="compiledMarkdown"></div> -->
	</div>
</template>

<script>
import marked from 'marked'

export default {
	name: 'post',
	props: ['post', 'color'],
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
	methods: {
		openPost: function (e) {
			if (this.post.type === 'post') {
				e.preventDefault()

				return false
			}

			return true
		}
	}
}
</script>

<style lang="sass">
.post-inner {
	display: block;
	position: relative;
	text-decoration: none;

	&:hover,
	&:focus,
	&:active {
		outline: none;
	}
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

.post-img-mask {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	opacity: 0.6;
}

.post-title {
	position: relative;
	margin: 0;
	padding: 1em;
	text-align: center;
	color: #fff;
}
</style>