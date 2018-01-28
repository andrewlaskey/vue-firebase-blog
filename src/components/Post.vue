<template>
	<div class="post" v-bind:class="post.category">
		<a v-bind:class="postClass" v-bind:href="openLink" v-on:click="openPopup(post, $event)" target="_blank">
			<div class="post-rollover">
				<div class="post-rollover-img">
					<img v-bind:src="post.thumbnail" v-bind:alt="post.title" v-if="hasThumbnail">
				</div>
				<h4 class="post-title">{{ post.title }}</h4>
				<small v-if="post.type === 'link'"><svg class="icon icon-open_in_new"><use xlink:href="#icon-open_in_new"></use></svg></small>
			</div>
		</a>
	</div>
</template>

<script>

export default {
	name: 'post',
	props: ['post', 'color', 'openPopup'],
	data () {
		return {}
	},
	computed: {
		postClass: function () {
			return 'post-inner post-inner-' + this.post.type
		},
		openLink: function () {
			if (this.post.type === 'post') {
				return '#'
			}
			return this.post.content
		},
		hasThumbnail: function () {
			if (typeof this.post.thumbnail === 'undefined') {
				return false
			}

			if (this.post.thumbnail.length === 0) {
				return false
			}

			return true
		}
	},
	methods: {}
}
</script>

<style lang="sass">
@import "../../styles/colors.scss";

.post-inner {
	display: block;
	position: relative;
	text-decoration: none;
	color: $body-color-light;

	&:visited {
		color: $body-color-light;
	}

	&:hover,
	&:focus,
	&:active {
		outline: none;
	}
}

.is-night .post-inner {
	color: $body-color-dark;

	&:visited {
		color: $body-color-dark;
	}
}

.is-grid {
	.post {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.post:before {
		content: '';
		display: block;
		width: 15px;
		height: 15px;
		border-radius: 50%;
	}
}

.fun {
	&:before,
	.post-rollover-img {
		background: $fun;
	}
}

.work {
	&:before,
	.post-rollover-img {
		background: $work;
	}
}

.personal {
	&:before,
	.post-rollover-img {
		background: $personal;
	}
}

.thoughts {
	&:before,
	.post-rollover-img {
		background: $thoughts;
	}
}

$rollover-width: 300px;

.post-rollover {
	display: flex;
	align-items: center;
	padding: 10px;
}

.is-grid {
	.post-rollover {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
		width: $rollover-width;
		background: $body-bg-light;
		border-radius: 50px;
		box-shadow: 0px 1px 5px 0px $body-color-light;
	}
}

.is-night .is-grid .post-rollover {
	background: $body-bg-dark;
	box-shadow: none;
	border: 1px solid;
}

.post-rollover small {
	display: inline-block;
	margin-left: 8px;
}

.post {
	&:hover,
	&:active,
	&:focus {
		.post-rollover {
			display: flex;
		}
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

$roller-img-width: 56px;

.post-rollover-img {
	margin-right: 20px;
	width: $roller-img-width;
	height: $roller-img-width;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;

	img {
		width: $roller-img-width;
		height: $roller-img-width;
		object-fit: cover;
		opacity: 0.6;
	}
}

.post-title {
	margin: 0;
}
</style>