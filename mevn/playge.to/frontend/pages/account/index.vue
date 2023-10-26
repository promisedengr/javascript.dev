<template>
   <div class="content">
		<div class="title-page">
			<span>Account</span>
		</div>
		<div class="account">
			<div class="accountTopInfo flex-c">
				<div class="accountTopInfo-img">
					<img src="@/assets/images/ava.png" alt="">
				</div>
				<div class="accountTopInfo-text">
					<p>Name player:</p>
					<span>{{namePlayer}}</span>
				</div>
			</div>
			<div class="accountBlock flex">
				<div class="accountBlock-menu">
					<div class="accountBlock-title">
						Menu
					</div>
					<ul class="cp-menu cp-menu-account">
						<a @click="$router.push('/account')" :class="$route.query.tab == undefined? 'active': ''" class="button">Information</a>
						<a @click="$router.push('/account?tab=item-purchase')" :class="$route.query.tab == 'item-purchase'? 'active': ''" class="button">Item Purchases</a>
						<a @click="$router.push('/account?tab=coin-purchase')" :class="$route.query.tab == 'coin-purchase'? 'active': ''" class="button">Coin Purchases</a>
						<a v-if="namePlayer != 'No Family Created'" @click="$router.push('/account?tab=change-family-name')" :class="$route.query.tab == 'change-family-name'? 'active': ''" class="button">Change Family Name</a>
						<a @click="$router.push('/account?tab=change-password')" :class="$route.query.tab == 'change-password'? 'active': ''" class="button">Change Password</a>
					</ul>
				</div>
				<AccountInformationVue v-if = "$route.query.tab == undefined"/>
				<AccountItemPurchaseVue v-else-if="$route.query.tab == 'item-purchase'"/>
				<AccountCoinPurchaseVue v-else-if="$route.query.tab == 'coin-purchase'"/>
				<AccountChangeFamilyNameVue v-else-if="$route.query.tab == 'change-family-name'"/>
				<AccountChangePasswordVue v-else-if="$route.query.tab == 'change-password'"/>
			</div>
		</div>
	</div>
					
</template>
<script>
	import AccountInformationVue from '../../views/accountPage/AccountInformation.vue';
	import AccountItemPurchaseVue from '../../views/accountPage/AccountItemPurchase.vue'
	import AccountCoinPurchaseVue from '../../views/accountPage/AccountCoinPurchange.vue'
	import AccountChangeFamilyNameVue from '../../views/accountPage/AccountChangeFamilyName.vue'
	import AccountChangePasswordVue from '../../views/accountPage/AccountChangePassword.vue'

	export default {
		components: {AccountInformationVue, AccountItemPurchaseVue, AccountChangeFamilyNameVue, AccountCoinPurchaseVue, AccountChangePasswordVue},
		data() {
			return {
				namePlayer: 'No Family Created',
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
						this.namePlayer = res.data.name

					} else
						this.$toast.error(`An Internal Error`)
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			}
		}
 	}
</script>
<style lang="scss">
	.active {
		opacity: 1;
		filter: brightness(140%) drop-shadow(0px 10px 5px rgba(0, 0, 0, 0.1));
	}
</style>