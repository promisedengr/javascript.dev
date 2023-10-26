<template>
    <div class="accountBlock-ava">
        <div class="accountBlock-title">
            Item Purchases
        </div>
        <div class="accountBlock-ava_box">
            <b-table class="table" :items="purchases" :fields="fields" thead-class="purchase-table">
                <template #cell(index)="data" class="kaf">
                    <label class="tr-col__center" style = "color: #fff;">
                        <span>{{data.index + 1 + perPage * (currentPage - 1)}}</span>
                    </label>
                </template>

            </b-table>
            
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
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                purchases: [
                ],
                fields: [
                    { key: 'index', label: '#'},
                    { key: 'item_name', label: 'Name' },
                    { key: 'item_price', label: 'Price'},
                    { key: 'date', label: 'Date'},
                ],
                currentPage:1,
				totalCount:0,
				perPage: 5,
            }
        },
        created(){
            this.getAccountItemPurchases()
        },
        watch: {
			currentPage: {
				immediate: true, 
				handler (val, oldVal) {
				if (val != oldVal){
					this.getAccountItemPurchases()
				}
				}
			}
		},
        methods: {
            getAccountItemPurchases() {
                let data = {}
                data.perPage = this.perPage
				data.currentPage = this.currentPage
                data.user_id = this.$store.state.account.id
                this.$api.request.getAccountItemPurchases(data, (res => {
                    if (res.status == 200) {
						console.log(res)
						this.purchases = res.data.list
						this.totalCount = res.data.total
					} else {
						this.$toast.error('DB error.')
					}
						// if (res.data.user) {
						// 	this.$toast.show(`Successfully registered the username "${this.username}".`)
						// 	this.$store.dispatch('account/setAccount', res.data.user)
						// 	this.$store.commit('closeModal')
						// } else if (res.data.message) {
						// 	this.$toast.error(res.data.message)
                }), err =>{
                    this.$toast.error('Server is disconnected.')
                    console.log(err)
                })	// }

            }
        }

    }
</script>
<style lang="scss">
    .accountBlock-ava_box {
        padding: 0px;
    }
    table {
        margin-bottom: 0px;
    }
    .purchase-table {
//   display: flex;
//   justify-content: center;
        text-align: center;
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