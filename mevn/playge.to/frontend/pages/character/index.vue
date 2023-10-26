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
								<span>AdminGranadoEspada</span>
							</div>
						</div>
						<div class="characterBlock">
							<div class="chBlockParam">
								<div class="chBlockParam-box">
									<div class="chBlockParam-img chBlockParam-img-attack"></div>
									<div class="chBlockParam-text">
										Attack
									</div>
									<div class="chBlockParam-progress">
										<span style="max-width: 81%;"></span>
									</div>
									<div class="chBlockParam-procent">
										81%
									</div>
								</div>
								<div class="chBlockParam-box">
									<div class="chBlockParam-img chBlockParam-img-dexterity"></div>
									<div class="chBlockParam-text">
										Dexterity
									</div>
									<div class="chBlockParam-progress">
										<span style="max-width: 60%;"></span>
									</div>
									<div class="chBlockParam-procent">
										60%
									</div>
								</div>
								<div class="chBlockParam-box">
									<div class="chBlockParam-img chBlockParam-img-hunt"></div>
									<div class="chBlockParam-text">
										Hunt
									</div>
									<div class="chBlockParam-progress">
										<span style="max-width: 56%;"></span>
									</div>
									<div class="chBlockParam-procent">
										56%
									</div>
								</div>
								<div class="chBlockParam-box">
									<div class="chBlockParam-img chBlockParam-img-steal-hunt"></div>
									<div class="chBlockParam-text">
										Steal Hunt
									</div>
									<div class="chBlockParam-progress">
										<span style="max-width: 26%;"></span>
									</div>
									<div class="chBlockParam-procent">
										26%
									</div>
								</div>
								<div class="chBlockParam-box">
									<div class="chBlockParam-img chBlockParam-img-armor"></div>
									<div class="chBlockParam-text">
										Armor
									</div>
									<div class="chBlockParam-progress">
										<span style="max-width: 56%;"></span>
									</div>
									<div class="chBlockParam-procent">
										56%
									</div>
								</div>
								<div class="chBlockParam-box">
									<div class="chBlockParam-img chBlockParam-img-master-level"></div>
									<div class="chBlockParam-text">
										Master Level
									</div>
									<div class="chBlockParam-progress">
										<span style="max-width: 70%;"></span>
									</div>
									<div class="chBlockParam-procent">
										70%
									</div>
								</div>
							</div><!--chBlockParam-->
							<div class="chBlockHero">
								<img src="@/assets/images/character.png" alt="">
								<div class="chBlockHero-name button">
									Name Hero
								</div>
							</div>
						</div><!--characterBlock-->
						<div class="ch-information">
							<div class="accountBlock-title">
								Information
							</div>
							<div class="table-information">
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Character
									</div>
									<div class="table-information-tr-td">
										Buster
									</div>
								</div>
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Class
									</div>
									<div class="table-information-tr-td">
										Empire Lord
									</div>
								</div>
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Normal Level
									</div>
									<div class="table-information-tr-td">
										112
									</div>
								</div>
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Master Level
									</div>
									<div class="table-information-tr-td">
										1050
									</div>
								</div>
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Resets
									</div>
									<div class="table-information-tr-td">
										26
									</div>
								</div>
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Last login
									</div>
									<div class="table-information-tr-td">
										2022-08222 17:34:00
									</div>
								</div>
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Country
									</div>
									<div class="table-information-tr-td">
										Ecuador
									</div>
								</div>
								<div class="table-information_tr">
									<div class="table-information-tr-td">
										Status
									</div>
									<div class="table-information-tr-td">
										<span class="color-green-y">[Online]</span>
									</div>
								</div>
							</div>
						</div>
					</div><!--account-->
				</div><!--content-->
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