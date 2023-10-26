<template>
    <div class="content">
					<div class="title-page">
						<span>Donate</span>
					</div>
					<div class="donate">
						<div class="donateRank-block flex">
							<div class="donateRank">
								<div class="donateRank-box active donatRank-box_one">
									<span>100$</span>
								</div>
								<div class="donateRank-box donatRank-box_two">
									<span>50$</span>
								</div>
								<div class="donateRank-box donatRank-box_three">
									<span>10$</span>
								</div>
							</div>
							<div class="donate-hero">
								<img src="@/assets/images/hero-donat.png" alt="">
							</div>
						</div>
						<div class="donate-buttons flex-c-c">
							<span class="button btn-active active">One-time giving</span>
							<span class="button btn-active">Monthly giving</span>
						</div>
					</div>
					<div class="payMethod">
						<div class="small-title">
							<span>Payment Method</span>
						</div>
						<div class="payMethod-flex flex-s">
							<div class="payMethod-block flex-c-c">
								<img src="@/assets/images/paypal.png" alt="">
							</div>
							<div class="payMethod-block flex-c-c">
								<img src="@/assets/images/alipay.png" alt="">
							</div>
							<div class="payMethod-block flex-c-c">
								<img src="@/assets/images/visa.png" alt="">
							</div>
							<div class="payMethod-block flex-c-c">
								<img src="@/assets/images/neteller.png" alt="">
							</div>
						</div>
					</div><!--payMethod-->
					<div class="confirm">
						<div class="small-title">
							<span>Confirm Order</span>
						</div>
						<div class="confirm-flex flex-c">
							<div class="confirmBlock confirmBlock-donat">
								<p>Payments Total Sum:</p>
								<span>$10.00</span>
							</div>
							<div class="confirmBlock confirmBlock-donat">
								<p>Payments Method:</p>
								<span>PayPal</span>
							</div>
							
							<div class="confirmPay">
								<a href="#" class="button">Pay Now</a>
							</div>
						</div>
					</div><!--confirm-->
				</div>
</template>
<script>
	export default {
		created(){
			if (this.$store.state.account.name){
				// this.getCategoryList()
			} else
				this.$router.push(`/`)
		}
	}
</script>