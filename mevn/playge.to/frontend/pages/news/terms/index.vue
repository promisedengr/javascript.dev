<template>
	<div class="content">
		<div v-html="content"></div>
		<div class="date" style="display: flex; float: right; margin-bottom: 15px">
			<a @click="$router.push('/')" class="button button-small-red">Go back</a>
		</div>
	</div>
    
</template>
<script>
	export default {
		data(){
			return {
				content: '',
			}
		},
		created() {
			this.getTerms()
		},
		methods: {
			getTerms(){
				let data = {}
				this.$api.request.getTerms(data, (res => {
					if (res.status == 200) {
						this.content = res.data.content
					} else {
						this.$toast.error('Server error.')
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			}
		}
	}
</script>