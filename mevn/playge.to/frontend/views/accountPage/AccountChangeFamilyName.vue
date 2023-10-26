<template>
   <div class="accountBlock-ava">
		<div class="accountBlock-title">
			Change Family Name
		</div>
		<div class="table-information">
			<div class="table-information_tr">
				<div class="table-information-tr-td">
					Your Family Name
				</div>
				<div class="table-information-tr-td">
					<input v-model="oldName" readonly>
				</div>
			</div>
			<div class="table-information_tr">
				<div class="table-information-tr-td">
					New Family Name
				</div>
				<div class="table-information-tr-td">
					<input v-model="newName" :disabled = "!oldName">
				</div>
			</div>
			<div class="table-information_tr">
				<div class="table-information-tr-td">
					Confirm New Family Name
				</div>
				<div class="table-information-tr-td">
					<input v-model="confirmName" :disabled = "!oldName">
				</div>
			</div>
			<div class="table-information_confirm">
				<div class="table-information_confirm-button t-center">
					<button @click="confirmNewName()">Confirm</button>
				</div>
			</div>
		</div>
		<div v-if ="alertShow" class="overlay">
			<div class="e-modal">
				<div class="modalBlock">
					<span class="modalBlock-crystal"></span>
					<div class="modalBlock-title">
						Confirmation
					</div>
					<p>Do you want to change the family name at 5 coins?</p>
					<a class="button" @click="doChangeFamilyName()">Yes</a>
					<a class="btn_danger button" @click="cancelChangeFamilyName()">No</a>
				</div>
			</div>
		</div>
	</div> 
</template>
<script>
	export default {
		data() {
			return {
				oldName: '',
				newName: '',
                confirmName: '',
				alertShow: false
			}
		},
		created(){
			if (this.$store.state.account.name){
				this.getNamePlayer()
			} else
				this.$router.push(`/`)
		},
		methods: {
			getNamePlayer() {
				let data = {}
				data.username = this.$store.state.account.name
				data.netType = this.$store.state.account.netTyep
				this.$api.request.getNamePlayer(data, (res => {
					if (res.data.name) {
						this.oldName = res.data.name
					} else
						this.$toast.error(`An Internal Error`)
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			},
			confirmNewName() {
				if (!this.oldName || !this.newName || !this.confirmName){
                    this.$toast.error('Please Fill in the all fields.')
                    return
                }
                if (this.newName != this.confirmName) {
                    this.$toast.error(`The confirmation of the new name doesn't match`)
                    return
                }
				if (this.$store.state.account.coin < 5) {
					this.$toast.error(`You don't have enough coin to change the family name.`)
				}
				if (this.newName.length < 4) {
					this.$toast.error(`Minimum length of the name is 4.`)
					return
				}
				if (this.newName.length > 20) {
					this.$toast.error(`The new name exceeds to the maximum length.`)
					return
				}
				this.alertShow = true
			},
			doChangeFamilyName() {
				let data = {}
				data.username = this.$store.state.account.name
				data.netType = this.$store.state.account.netType
				data.oldName = this.oldName
				data.newName = this.newName
				this.$api.request.doChangeFamilyName(data, (res => {
					if (res.data.message == 'success') {
						this.$toast.show(`Your family name is successfully changed.`)
						this.$store.commit('account/SET_ACCOUNT_COIN', 5)
						this.alertShow = false
						this.$router.push('/')
					} else
						this.$toast.error(res.data.message)
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})

			},
			cancelChangeFamilyName() {
				this.newName = ''
				this.confirmName = ''
				this.alertShow = false
			}
		}
	}
</script>