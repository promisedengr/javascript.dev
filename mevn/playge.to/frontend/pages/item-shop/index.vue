<template>
    <div class="content">
		<div class="title-page">
			<span>Item Shop</span>
		</div>
		<div class="shopTabs flex-c-c" v-if="categories.length > 0">
			<span class="shop-tab" :class="selectedCategory == c.id ? 'active' : ''" v-for="(c, i) in categories" :key="i" @click="selectCategory(c.id)">{{c.category}}</span>
		</div>
		
		<div class="itemSort flex-s-c">
			<div class="itemSort-left flex-c">
				<input class="search-filter" type="search" v-model="searchName"> <button class="search-button" @click="getItemList()"></button>
			</div>
			<div class="itemSort-right flex-c">
				<span class="sort-t">Sort by:</span>
				<select class="select select-filter" v-model="sortType" @change="getItemList()">
					<option class="select_option" value="0">Price (Newest First)</option>
					<option class="select_option" value="1">Rarity (Newest First)</option>
				</select>
			</div>
		</div><!--itemSort-->
		<div class="items flex-s" style="justify-content:space-evenly">
			<div class="item" v-for="(h, i) in items" :key="i" v-if="items.length > 0" >
				<div class="item-img flex-c-c">
					<img :src="`/assets/images/items/${h.image}`">
				</div>
				<div class="item-title">
					{{h.name}}
				</div>
				<div class="item-rarity flex-s">
					<div class="item-rarity_n">
						<p>Unit</p>
						{{h.count}}
					</div>
					<div class="item-rarity_n">
						<p>Excellent</p>
						50-60
					</div>
				</div>
				<div class="item-price flex-c-c">
					<i class="deposit-coin"></i> 
					<span>{{h.price}}</span>
					<b>Coins</b>
				</div>
				<a class="button item-button button-small" @click="confirmBuyItem(h)">Buy</a>
			</div><!--item-->
		</div><!--items-->
		<b-pagination
			v-if="totalCount > perPage"
			v-model = "currentPage"
			:total-rows="totalCount"
			:per-page="perPage"
			first-class ="number-prev"
			first-number
			last-number
			class="pagination flex-c-c">
			<template #prev-text><i class="icon-left"></i></template>
			<template #next-text><i class="icon-right"></i></template>
		</b-pagination>
		<div v-if ="alertShow" class="overlay">
			<div class="e-modal">
				<div class="modalBlock">
					<span class="modalBlock-crystal"></span>
					<div class="modalBlock-title">
						Confirmation
					</div>
					<p>Do you buy {{buy_item.name.toUpperCase()}} at {{buy_item.price}} coins?</p>
					<a class="button" @click="doBuyItem()">Yes</a>
					<a class="btn_danger button" @click="cancelBuyItem()">No</a>
				</div>
			</div>
		</div>



	</div><!--content-->
</template>
<script>
	export default {
		data() {
			return {
				items: [],
				categories: [],
				selectedCategory: 1,

				currentPage:1,
				totalCount:0,
				perPage: 12,

				buy_item: {},
				alertShow: false,
				sortType: 0,//0:date1:quantity
				searchName: '',
			}
		},
		watch: {
			currentPage: {
				immediate: true, 
				handler (val, oldVal) {
				if (val != oldVal){
					this.getItemList()
				}
				}
			}
		},
		created() {
			if (this.$store.state.account.name){
				this.getCategoryList()
			} else
				this.$router.push(`/`)
		},
		methods: {
			getCategoryList(){
				this.$api.request.getCategoryList('',(res => {
					if (res.status == 200) {
						this.categories = res.data
						this.getItemList()
					} else {
						this.$toast.error('DB error or No database.')

					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			},
			getItemList() {
				let data = {}
				data.perPage = this.perPage
				data.currentPage = this.currentPage
				data.category_id = this.selectedCategory
				data.sortType =  parseInt(this.sortType)
				data.searchName = this.searchName
				this.$api.request.getItemList(data, (res => {
					if (res.status == 200) {
						console.log(res)
						this.items = res.data.list
						this.totalCount = res.data.total
					} else {
						this.$toast.error('DB error.')
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			},
			selectCategory(id) {
				this.selectedCategory = id
				this.getItemList()
			},
			confirmBuyItem(item) {
				console.log(this.$store.state.account)
				if (!this.$store.state.account.name) {
					this.$toast.error(`Please login to the site first.`)
					return
				}
				if (this.$store.state.account.coin < item.price) {
					this.$toast.error(`You do not have enough coin(s) for "${item.name.toUpperCase()}" item.`)
					return
				}
				this.buy_item = item
				this.alertShow = true
			},
			doBuyItem() {
				let data = {}
				data.user = this.$store.state.account.id
				data.item = this.buy_item.id
				this.$api.request.doBuyItem(data, (res => {
					if (res.data.type == 0){
						this.$toast.show('Successfully purchased.')
						this.$store.commit('account/SET_ACCOUNT_COIN', this.buy_item.price)
					}
					else 
						this.$toast.error('Server went something wrong.')
					this.alertShow = false

				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})

			},
			cancelBuyItem() {
				this.alertShow = false
				this.buy_item = {}
			},
			// resetBuyItem() {
			// 	this.buy_item.name = ''
			// 	this.buy_item.price = 0
			// }

		}
	}
</script>
<style lang="scss">
.btn_danger {
	background: url('@/assets/images/button-red-logout.png') no-repeat;
}
.page-item {
	.page-link {
		width: 39px;
		height: 23px;
		background: url('@/assets/images/button-nav.png') no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Friz Quadrata TT';
		color: #fff;
		font-size: 12px;
		background-position: center;
		background-repeat: no-repeat;
		opacity: 0.7;
		transition: 0.3s;
		border: 0px;
	}
	
}
.active {
		filter: brightness(120%) drop-shadow(0px 0px 5px rgba(7, 71, 192, 0.5));
		opacity: 1;
	}
.page-item:first-child .page-link {


	margin-right: 15px;
}
.page-item:last-child .page-link {
	margin-left: 15px;

}
</style>
