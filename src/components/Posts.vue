<template>
	<div class="post-list">
		<ul>
			<li v-for="(post, index) in posts">
				<post :post="post" :color="getColor(index)"></post>
			</li>
		</ul>
	</div>
</template>

<script>
import firebase from 'firebase'
import Post from './Post.vue'

const colors = ['#09af6d', '#48dfa4', '#48dfca']

export default {
	name: 'posts',
	data () {
		return {
			posts: []
		}
	},
	components: {
		Post
	},
	created: function () {
		const postsRef = firebase.database().ref('posts')

		postsRef.once('value')
			.then(snapshot => {

		        snapshot.forEach(childSnapshot => {
		        	let post = childSnapshot.val()
		        	let postId = childSnapshot.key

		        	post.id = postId

		        	this.posts.push(post)

		        	if (this.posts.length > 1) {
						this.posts.sort((a, b) => {
							return a.postDate - b.postDate
						})
					}
		        })
		    })

	},
	methods: {
		getColor: function (index) {
			return colors[index % colors.length]
		}
	}
}
</script>

<style lang="sass">
.post-list {
	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	li {
		margin: 0;
	}
}
</style>