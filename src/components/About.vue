<template>
	<div class="about">
		<h1>{{ headline }}</h1>
		<p>{{ description }}</p>
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'about',
	data () {
		return {
			title: 'Andrew Laskey',
			headline: 'I make web things',
			description: 'This is a description'
		}
	},
	created: function () {
		const siteRef = firebase.database().ref('site')

		siteRef.once('value')
			.then(snapshot => {
				let siteData = snapshot.val()

				this.title = siteData.title
				this.headline = siteData.headline
				this.description = siteData.description
			});
	}
}
</script>