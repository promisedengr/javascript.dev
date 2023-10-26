<template>
    <div class="accountBlock-ava">
        <div class="accountBlock-title">
            Coin Purchases
        </div>
        <div v-if="purchases.length > 0" class="accountBlock-ava_box">
            <b-table class="table" :items="purchases" :fields="fields" thead-class="purchase-table">
                <template #cell(index)="data" class="kaf">
                    <label class="tr-col__center" style = "color: #fff;">
                        <span>{{data.index + 1 + perPage * (currentPage - 1)}}</span>
                    </label>
                </template>
                <template #cell(date)="data">
                    <label class="tr-col__center" style = "color: #fff;">
                        {{formatDate(data.item.date)}}
                    </label>
                </template>
                <template #cell(type)="data">
                    <label  class="tr-col__center" style = "color: #fff;">
                        <span v-if="data.item.type == 2">Withdraw</span>
                        <span v-else>Deposit</span>
                    </label>
                </template>
            </b-table>
            <b-pagination
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
        <div v-else style="display: flex; justify-content: center; align-items: center;">No purchase</div>
    </div>
</template>
<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                purchases: [
                ],
                fields: [
                    { key: 'index', label: '#'},
                    { key: 'date', label: 'Date'},
                    { key: 'coin', label: 'Amount'},
                    { key: 'ref', label: 'Transaction ID'},
                    { key: 'type', label: 'Type'},
                ],
                currentPage:1,
				totalCount:0,
				perPage: 5,
            }
        },
        created(){
            // this.getAccountCoinPurchases()
        },
        watch: {
			currentPage: {
				immediate: true, 
				handler (val, oldVal) {
                    if (val != oldVal){
                        this.getAccountCoinPurchases()
                    }
				}
			}
		},
        methods: {
            formatDate(v) {
                console.log(v)
                return moment(v).utc().format('YYYY-MM-DD')
            },
            getAccountCoinPurchases() {
                console.log('hello')
                let data = {}
                data.perPage = this.perPage
				data.currentPage = this.currentPage
                this.$api.request.getAccountCoinPurchases(data, (res => {
                    if (res.status == 200) {
                        if (res.data.transactions)
                            this.purchases = res.data.transactions
                        else
                            console.log(res)
						// this.purchases = res.data.list
						// this.totalCount = res.data.total
					} else {
						this.$toast.error('DB error.')
					}
                }), err =>{
                    this.$toast.error('Server is disconnected.')
                    console.log(err)
                })	// }

            }
        }

    }
</script>
<style lang="scss">
    .demo-center {
        position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin-top: -9px;
    }
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