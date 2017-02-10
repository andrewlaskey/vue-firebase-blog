<template>
	<div class="post-list">
		<ul>
			<li v-for="post in posts">
				<img v-bind:src="post.hero" alt=""  width="100%">
				<h3>{{ post.title}}</h3>
			</li>
		</ul>
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'posts',
	data () {
		return {
			posts: []
		}
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