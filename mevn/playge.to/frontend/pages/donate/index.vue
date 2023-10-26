<template>
	<div class="content">
		<div class="title-page">
			<span>Deposit Plan</span>
		</div>
		<div class="deposit flex-s">
			<div v-if="donations.length > 0" class="depositBlock" :class="selectedPl == i ? 'active': ''" v-for="(p, i) in donations" :key="i" @click="setDepositItem(i)">
				<div class="depositBlock-img flex-c-c">
					<img :src="require(`@/assets/images/${p.img}`)" alt="">
				</div>
				<div class="depositBlock-coinPrice flex">
					<i class="deposit-coin"></i>
					<span class="depositBlock-coinPrice_n">{{p.coin}}</span>
					<span class="depositBlock-coinPrice_c">Coins</span>
				</div>
				<div class="deposit-price">
					${{p.price}}
				</div>
			</div>
		</div>
		<div class="payMethod">
			<div class="small-title">
				<span>Payment Method</span>
			</div>
			<div class="payMethod-flex flex-s">
				<div class="payMethod-block flex-c-c" v-for="(pm, i) in paymentMethods" :key="i" @click="setPaymentMethod(i)" :class="selectedPM == i ? 'active': ''" style="background-size: 100% 100%; width: 155px">
					<img :src="require('@/assets/images/' + pm.img)" style="width: 80%;">
				</div>
			</div>
		</div><!--payMethod-->
		<div class="confirm">
			<div class="small-title">
				<span>Confirm Order</span>
			</div>
			<div class="confirm-flex flex-c">
				<div class="confirmBlock">
					<p>Deposit Plan:</p>
					<span>{{paymentPlan}} <b>Coins</b></span>
				</div>
				<div class="confirmBlock">
					<p>Payments Method:</p>
					<span>{{paymentTitle}}</span>
				</div>
				<div class="confirmBlock">
					<p>Payments Total Sum:</p>
					<span>${{paymentTotal}}</span>
				</div>
				<div class="confirmPay">
					<a @click="payNow()" class="button">Pay Now</a>
				</div>
			</div>
		</div>
		<form v-if="donations.length > 0" style="display: none;" name="payssion_hosted_payment" action="https://payssion.com/checkout/41ddcc2ee2247424" method="post"> 
			<input type="hidden" name="api_sig" v-model="sig"> 
			<input type="hidden" name="order_id" value="123"> 
			<input type="hidden" name="payer_email" :value="$store.state.account.email">
			<input type="hidden" name="description" value="Andromida(SEA) Coins"> 
			<input type="hidden" name="amount" :value="donations[this.selectedPl].price"> 
			<input type="hidden" name="currency" value="USD"> 
			<input type="hidden" name="return_url" value="https://playge.to.com"> 
			<input type="submit" class="button" ref="alipayForm" value="click here to try this hosted page demo"> 
		</form>
		<!-- <b-modal v-model="modalShow">
			<div v-html="widget"></div>
		</b-modal> -->
		<!-- <div v-if ="widget" class="overlay">
			<div class="payment-widget">
				<header id="__BVID__563___BV_modal_header_" class="modal-header">
					<h5 id="__BVID__563___BV_modal_title_" class="modal-title"></h5>
					<button @click="closeWidget" type="button" aria-label="Close" class="close me-button">×</button>
				</header>
			</div>
		</div> -->
		<!-- <div v-html="widget" class="pt-5"></div>
		<object :data="widget">

		</object> -->
		<!-- <iframe sandbox="allow-same-origin allow-forms allow-scripts">{{widget}}</iframe> -->
		<!-- <iframe id="iframe" width="572px" scrolling="auto" height="335px" 
        frameborder="1" src="http://XXXX.com/iframe-page"
        style="border: 0px none #ffffff;" name="national-campaign" 
        marginheight="0px" marginwidth="0px">
</iframe> -->
	</div>
</template>
<script>
	import axios from 'axios'
	import md5 from 'md5'

	export default {
		head() {
			return {
				script: [
					{
						src: "https://widget.unitpay.ru/unitpay.js",
						body: true,
						async: true,
						defer: true
					}
				],
			}
		},
		data() {
			return {
				donations: [],
				selectedPl: 0,
				paymentMethods: [
					{img: 'paypal.png', title: "PayPal", type: 1},
					{img: 'alipay.png', title: "Payssion", type: 2},
					{img: 'visa.png', title: "VISA", type: 3},
					{img: 'unitpay.png', title: "UnitPay", type: 4},
					{img: 'paymentwall.png', title: "PaymentWall", type: 5},

				],
				selectedPM: 0,
				paymentTitle: '',
				paymentPlan: 0,
				paymentTotal: 0,
				// FOR WIDGET
				widget: '',
				modalShow: false,
				sig: ''
			}
		},
		created(){
			this.getDonationList()
		},
		methods: {
			getDonationList() {
				let data = {}
				this.$api.request.getDonationList(data, (res => {
					if (res.status == 200) {
						console.log(res.data)
						this.donations = res.data.donations
						this.paymentTitle = this.paymentMethods[this.selectedPM].title
						this.paymentPlan = this.donations[this.selectedPl].coin
						this.paymentTotal = this.donations[this.selectedPl].price
						// this.downloads = res.data.downloads
					} else {
						this.$toast.error('DB error.')
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})

			},
			setPaymentMethod(idx) {
				this.selectedPM = idx
				this.paymentTitle = this.paymentMethods[this.selectedPM].title

			},
			setDepositItem(idx) {
				this.selectedPl = idx
				this.paymentPlan = this.donations[this.selectedPl].coin
				this.paymentTotal = this.donations[this.selectedPl].price
			},
			closeWidget() {
				this.widget = ''
			},
			async payNow(e) {
				if (this.selectedPM == 1) {
					console.log('alipay')
					// let data ={}
					// data.api_sig = '27a0309a01ed380e2c7fb9c6d383ff0a'
					// data.order_id = '123'
					// data.payer_email = 'payer@example.com'
					// data.description = 'Charge for test'
					// data.amount = 1
					// data.currency = 'USD'
					// data.return_url = 'http://sandbox.payssion.com/demo/afterpayment'
					var api_key = '41ddcc2ee2247424'
					var amount = this.donations[this.selectedPl].price.toString()
					var currency = 'USD'
					var order_id = '123'
					var secret_key = '426f395a1045e21b137589e682c25deb'
					var str = api_key + amount + currency + order_id + secret_key
					var signature = md5(str)
					console.log(signature)
					this.$refs.alipayForm.click()
				} else if (this.selectedPM == 4) {
					console.log('paymentwall')
					console.log(this.$store.state.config)
					if (this.$store.state.config.paymentwall == 0 || this.$store.state.account.paymentwall == 1) {
						let data = {}
						this.$api.request.getPaymentwallWidget(data, (res => {
							if (res.data.uri) {
								window.open(res.data.uri, 'Dynamic Popup', "height=950,width=800,status=yes,toolbar=no,menubar=no,location=no,titlebar=no")
							} else {
								this.$toast.error('Server error.')
							}
						}), err =>{
							this.$toast.error('Server is disconnected.')
							console.log(err)
						})
					} else {
						this.$toast.error('This option is disabled.')
						return
					}
					
				}
				return
				var payment = new UnitPay();
				payment.createWidget({
					publicKey: "236991-47030",
					sum: 1,
					account: "demo",
					domainName: "unitpay.ru",
					signature: "81d991a9811be811df0fe853268670242dc02fe61058d4269ddd1138f23c8dc7",
					desc: "Payment description",
					locale: "ru",
					// cashItems: [{"name":"Shaurma", "count": 1, "price":sum, "type":"commodity"}],
					// cashItems: [{"name":"Shaurma", "count": 1, "price":15, "type":"commodity"}],
					// customerEmail: 'younglady19931114@gmail.com'
				});
					payment.success(function (params) {
					console.log('Успешный платеж');
				});
					payment.error(function (message, params) {
					console.log(message);
				});
				return false;
			}
		}
	}
</script>
<style lang="scss">
	.payment-widget {
		opacity: 1;
		pointer-events: inherit;
		transition: 0.35s ease-in-out;
		max-height: 100vh;
		overflow-y: auto;
		// padding: 30px;
		// width: 100%;
		max-width: 820px;
		background-color: #fff;
		.me-button {
			width: 0px;
			margin-right: 15px;
			font-size: larger;
			color: #000!important;
		}
	}
</style>