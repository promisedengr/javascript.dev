<template>
    <div class="mt-5" style="width: 100%;">
        <div class="accountBlock-title">
            Item Exchange History
        </div>
        <div v-if="purchases_b.length > 0" class="log-table-box">
            <b-table class="table" :items="shows_b" :fields="fields_b" thead-class="purchase-table">
                <template #cell(index)="data" class="kaf">
                    <label class="tr-col__center" style = "color: #fff;">
                        <span>{{data.index + 1 + perPage_b * (currentPage_b - 1)}}</span>
                    </label>
                </template>
                <template #cell(LOG_DATE)="data" class="kaf">
                    <label class="tr-col__center" style = "color: #fff;">
                        <span>{{formatDate(data.item.LOG_DATE)}}</span>
                    </label>
                </template>
            </b-table>
            <b-pagination
                v-model = "currentPage_b"
                :total-rows="totalCount_b"
                :per-page="perPage_b"
                first-class ="number-prev"
                first-number
                last-number
                class="pagination flex-c-c">
                <template #prev-text><i class="icon-left"></i></template>
                <template #next-text><i class="icon-right"></i></template>
            </b-pagination>
        </div>
        <div v-else style="display: flex; justify-content: center; align-items: center;">No History Yet</div>
    </div>
</template>
<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                purchases_b: [],
                shows_b: [],
                fields_b: [
                    { key: 'index', label: 'ID'},
                    { key: 'FROM_COMM_NAME', label: 'Sender' },
                    { key: 'TO_COMM_NAME', label: 'Receiver'},
                    { key: 'ITEM_NAME', label: 'Item Name'},
                    { key: 'ITEM_COUNT', label: 'Count'},
                    { key: 'LOG_DATE', label: 'Date'},
                ],
                currentPage_b:1,
				totalCount_b:0,
				perPage_b: 5,
            }
        },
        created(){
            this.getTradeHistory()
        },
        watch: {
            currentPage_b: {
				immediate: true, 
				handler (val, oldVal) {
                    if (val != oldVal){
                        this.shows_b = this.purchases_b.slice((this.currentPage_b - 1) * this.perPage_b , this.currentPage_b * this.perPage_b)
                    }
				}
			}
		},
        methods: {
            formatDate(date) {
                return moment(date).utc().format('YYYY-MM-DD')
            },
            getTradeHistory() {
                console.log('getTradeHistory')
                let data = {}
                data.perPage = this.perPage_b
				data.currentPage = this.currentPage_b
                this.$api.request.getTradeHistory(data, (res => {
                    if (res.status == 200) {
						console.log(res.data.exchange_list)
						this.purchases_b = res.data.exchange_list.sort((a, b) => moment(a.LOG_DATE)- moment(b.LOG_DATE))
                        this.shows_b = this.purchases_b.slice((data.currentPage - 1) * data.perPage , data.currentPage * data.perPage)
						this.totalCount_b = res.data.exchange_list.length
					} else {
						this.$toast.error('DB error.')
					}
                }), err =>{
                    this.$toast.error('Server is disconnected.')
                    console.log(err)
                })
            },
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