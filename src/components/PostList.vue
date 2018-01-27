<template>
	<div class="post-list" v-bind:class="{ 'is-grid': grid }">
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
	props: ['posts', 'openPopup', 'grid'],
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
		flex-direction: column;
	}
}

.post-list.is-grid {
	ul {
		flex-direction: row;
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