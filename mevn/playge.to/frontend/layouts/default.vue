<template>
	<div>
		<div v-if="$store.state.status == 1" class="overlay">
				<div class="e-modal">
					<div class="modalBlock">
						<span class="modalBlock-crystal"></span>
						<div class="modalBlock-title">
							announcement
						</div>
						<p style="display: flex; justify-content: center; align-item: center;">The site is under maintenance.</p>
					</div>
				</div>
			</div>
		<div v-else-if="$store.state.status > -1" class="wrapper">
			<AppHeader v-click-outside="externalClick"/>
			<div class="topBlock">
				<div class="highlight">
					<div class="highlight-3"></div>
					<div class="highlight-4"></div>
				</div>
				<div class="circle circle1"></div>
				<div class="circle circle2"></div>
				<div class="logo">
					<a><img src="@/assets/images/logo.png" alt="Logo"></a>
				</div>
			</div>
			<main class="main flex-s">
				<div class="main-content">
					<div class="upper">
						<div class="upperBlock flex-c-c">
							<a target="_blank" href="https://agedatabase.com/" class="upper-block flex-c">
								<div class="upper-block_img">
									<img src="@/assets/images/icons/icon-book.png" alt="">
								</div>
								<div class="upper-block_info">
									<p>Presentation</p>
									<span>See the content of our game</span>
								</div>
							</a>
							<a target="_blank" href="https://discord.gg/s8urSzWGRG" class="upper-block flex-c">
								<div class="upper-block_img">
									<img src="@/assets/images/icons/icon-discord.png" alt="">
								</div>
								<div class="upper-block_info">
									<p>Discord</p>
									<span>Join our community</span>
								</div>
							</a>
							<a @click="pushToDonate()" class="upper-block flex-c">
								<div class="upper-block_img">
									<img src="@/assets/images/icons/icon-vote.png" alt="">
								</div>
								<div class="upper-block_info">
									<p>Donate</p>
									<span>Vote for us and eam rewards</span>
								</div>
							</a>
						</div>
					</div>
					<Nuxt/>
				</div>
				<AppSideBar/>
			</main>
			
			<Modal v-show="$store.state.isModal"/>
			<footer class="footer">
				<div class="footer-container flex">
					<div class="footer-info">
						<a><img src="@/assets/images/logo-footer.png" alt=""></a>
						<div class="copyright">
							Copyright @ 2022 playge.to All rights reserved.<br>
							All other trademarks are the property of their respective owners.
						</div>
					</div>
					<div class="footerMenu">
						<span>Resorces</span>
						<ul>
							<li><a @click="$router.push('/news/terms')">Terms & Conditions</a></li>
							<li><a @click="$router.push('/news/privacy')">Privacy</a></li>
							<li><a @click="$router.push('/news/legal')">Legal</a></li>
							<li><a @click="$router.push('/news/cookie')">Cookie Preferences</a></li>
						</ul>
					</div>
					<div class="footerMenu">
						<span>Support</span>
						<ul>
							<li><a @click="$router.push('/contact-us')">Contact Us</a></li>
						</ul>
					</div>
					<div class="footerMenu footerMenu-soc">
						<span>Follow Us</span>
						<ul>
							<li><a ><i class="icon-soc fb"></i> Facebook</a></li>
							<li><a @click="$router.push('/download')"><i class="icon-soc md"></i> Downloads</a></li>
							<li><a target="_blank" href="https://ge.sytes.net"><i class="icon-soc ep"></i> ge.style</a></li>
							<li><a target="_blank" href="https://discord.gg/s8urSzWGRG"><i class="icon-soc ds"></i> Discord</a></li>
						</ul>
					</div>
				</div>
			</footer>
		</div>
		
		

	</div>
</template>
<script>
    import AppHeader from './AppHeader.vue';
	import AppSideBar from './AppSideBar.vue'

    import Modal from "@/components/modals/index.vue";

    export default {
        name: 'default',
        components: {AppHeader, AppSideBar, Modal},
		data() {
			return {
				status: 0 // 0: normal, 1: under maintenance, 2: registration disabled
			};
		},
		async created() {
			await this.checkServerStatus()
		},
		mounted() {
			if (this.$store.state.status == 1)
				return

			if (window.sessionStorage.getItem("token")) {
				this.getUserData()
			} else {
				this.$store.commit('setLoading')
			}
		},
		methods: {
			externalClick (event) {
        
				if (this.$store.state.mobileTab){
					this.$store.commit("SET_MOBILE_TAB", 1)
				}
				// if (this.$store.state.isSidebarToggled){
				// 	this.$store.commit("SET_SIDE_BAR", 1)
				// }
				//                var element = document.getElementsByClassName('userPanel')
                // console.log(element[0].classList.contains('active'))

                // if (element[0].classList.contains('active')){
                //     // this.$store.commit("SET_SIDE_BAR", 0)
                //     element[0].classList.remove('active');
                // }

				// setTimeout(() => {
				// }, "500")
			},
			checkServerStatus() {
				let data = {}
				this.$api.request.checkServerStatus(data, (res => {
					if (res.data.config) {
						console.log(res)
						if (res.data.config.maintenance == 1) {
							this.$store.commit('SET_STATUS', 1)
						} else if (res.data.config.registration == 1) {
							this.$store.commit('SET_STATUS', 2)
						} else {
							this.$store.commit('SET_STATUS', 0)
						}
						this.$store.commit('SET_CONFIG', res.data.config)
					} else {
						localStorage.clear()
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					localStorage.clear()
					console.log(err)
				})
			},
			pushToDonate() {
				if (this.$store.state.account.name){
					this.$router.push('/donate')
				} else
					this.$toast.error('Please login first.')
			},
			getUserData() {
				console.log('localStorage')
				let data = {}
				this.$api.request.getUserData(data, (res => {
					if (res.data.user) {
						this.$store.dispatch('account/setAccount', res.data.user)
						this.$store.commit('setLoading')
						this.$store.commit('closeModal')
					} else {
						localStorage.clear()
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					localStorage.clear()
					console.log(err)
				})
			}
		}
    }
</script>
<style lang="scss" scoped>

</style>