<template>
	<div class="post-list">
		<ul>
			<li v-for="post in posts">
				<post :post="post"></post>
			</li>
		</ul>
	</div>
</template>

<script>
import firebase from 'firebase'
import Post from './Post.vue'

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

	}
}
</script>