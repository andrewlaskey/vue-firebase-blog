<template>
	<div class="post-list">
		<ul>
			<li v-for="(post, index) in posts">
				<post :post="post" :openPopup="openPopup"></post>
			</li>
		</ul>
	</div>
</template>

<script>
import Post from './Post.vue'

export default {
	name: 'post-list',
	props: ['posts', 'openPopup'],
	data () {
		return {}
	},
	components: {
		Post
	},
	methods: {}
}
</script>

<style lang="sass">
.post-list {
	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	li {
		margin: 0;
		width: 25%;
		height: 128px;
	}
}
</style>