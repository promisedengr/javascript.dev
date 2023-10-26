<template>
  <header class="header" :class="scrollStyle ? 'header-fixed': ''">
			<div class="header-wrapper flex-s-c ">
				<div class="burger btn-drop" @click="setMobileTab" :class="$store.state.mobileTab? 'active': ''">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<nav class="nav" :class="$store.state.mobileTab? 'active': ''" >
					<ul class="menu flex-c">
						<li :class="$route.path == '/' ? 'active': ''"><a @click="goToHome()">Home</a></li>
						<li v-if="$store.state.account.name" :class="$route.path == '/donate' ? 'active': ''"><a @click="goToDonation()">Donate</a></li>
						<li :class="$route.path == '/download' ? 'active': ''"><a @click="goToDownload()">Downloads</a></li>
						<li :class="$route.path == '/rotation' ? 'active': ''"><a @click="goToRotation()">Rotation</a></li>
						<li v-if="$store.state.account.name" :class="$route.path == '/item-shop' ? 'active': ''"><a @click="goToItemShop()">Itemshop</a></li>
						<li :class="$route.path == '/news' ? 'active': ''"><a target="_blank" rel="noopener noreferrer" href="https://granado-espada.to/" @click="goToNews()">Community</a></li>
					</ul>
				</nav>
				<div class="r-block">
					<div class="langBlock">
						<div class="langBlock-active btn-drop" @click="dropDown = !dropDown">
							EN <img src="@/assets/images/icons/icon-en.jpg" alt="En">
						</div>
						<ul class="langBlock-drop" :class="dropDown ? 'active': ''">
							<li><a><img src="@/assets/images/icons/icon-german.jpg" alt="G"> German</a></li>
							<li><a><img src="@/assets/images/icons/icon-poland.jpg" alt="P"> Polish</a></li>
							<li><a><img src="@/assets/images/icons/icon-french.jpg" alt="F"> French</a></li>
							<li><a><img src="@/assets/images/icons/icon-spanish.jpg" alt="S"> Spanish</a></li>
						</ul>
					</div>
					<div class="cp btn-drop" style="z-index: 9999;" @click="setSideBar()"></div>
				</div>
			</div>
		</header>
</template>
  
<script>
  // import AppHeaderRight from "./AppHeaderRight.vue";

  export default {
    name: "Header",
    components: {},
    data() {
      return {
        scrollStyle: false,
        dropDown: false,
        mobileNav: false,
      };
    },
    mounted(){
			window.addEventListener('scroll', this.handleScroll);
        },
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
      
      goToHome() {
        this.$store.commit("SET_MOBILE_TAB", 1)
        this.$router.push('/')
      },
      goToDonation() {
        this.$store.commit("SET_MOBILE_TAB", 1)
        this.$router.push('/donate')
      },
      goToDownload() {
        this.$store.commit("SET_MOBILE_TAB", 1)
        this.$router.push('/download')
      },
      goToRotation() {
        this.$store.commit("SET_MOBILE_TAB", 1)
        this.$router.push('/rotation')
      },
      goToItemShop() {
        this.$store.commit("SET_MOBILE_TAB", 1)
        this.$router.push('/item-shop')
      },
      goToNews() {
        this.$store.commit("SET_MOBILE_TAB", 1)
      },
      setMobileTab() {
        console.log(this.$store.state.mobileTab)
        this.$store.commit("SET_MOBILE_TAB", 0)
      },
      setSideBar() {
        // var element = document.getElementsByClassName('userPanel')
        //         console.log(element[0].classList.contains('active'))

        //         if (!element[0].classList.contains('active')){
        //             // this.$store.commit("SET_SIDE_BAR", 0)
        //             element[0].classList.add('active');
        //         }
        this.$store.commit("SET_SIDE_BAR", 0)
      },
			handleScroll(event){
				if (window.scrollY >= 50)
					this.scrollStyle = true
				else
					this.scrollStyle = false
			}
		}
  };
</script>

<style lang="scss" scoped>
  // .header {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   background-color: #161f2c;
  //   display: flex;
  //   align-items: stretch;
  //   justify-content: space-between;
  //   height: 64px;
  //   padding-left: 24px;
  //   padding-right: 24px;
  //   z-index: 104;
  //   @media (max-width: 780px){
  //     padding-left: 12px;
  //     padding-right: 12px;
  //   }
  //   .header__left-block{
  //     display: flex;
  //     align-items: center;
  //     @media (max-width: 380px){
  //       display: none;
  //     }
  //     .logo {
  //       background-color: #202a39;
  //       border-radius: 10px;
  //       transform: skewY(-3deg) skewX(-17deg);
  //       padding: 36px 25px 16px 66px;
  //       margin: -30px 0 -20px -65px;
  //       @media (max-width: 576px) {
  //         transform: none;
  //         padding: 0 0 0 66px;
  //         margin: 0 0 0 -65px;
  //         background-color: transparent;
  //       }
  //       .logo__inner{
  //         transform: skewY(3deg) skewX(17deg);
  //         display: flex;
  //         align-items: center;
  //         @media (max-width: 576px) {
  //           transform: none;
  //         }
  //         .hamburger {
  //           margin-right: 6px;
  //           width: 32px;
  //           height: 32px;
  //           padding: 0;
  //           display: flex;
  //           align-items: center;
  //           justify-content: center;
  //           color: $fury-font-color;
  //           @media (max-width: 980px) {
  //             width: 0px;
  //             height: 0px;
  //             display: none;
  //           }
  //         }
  //         .logo__link {
  //           margin-right: 10px;
  //           padding: 0;
  //           border: none;
  //           background-color: transparent;
  //           display: block;
  //           .logo__picture {
  //             display: block;
  //             -webkit-user-select: none;
  //             -moz-user-select: none;
  //             -ms-user-select: none;
  //             user-select: none;
  //             padding: 0;
  //             margin: 0;
  //             .logo__img {
  //               border: none;
  //               padding: 0;
  //               background-color: transparent;
  //               display: block;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     .casino-sport-selector {
  //       margin-left: 32px;
  //       @media (max-width: 780px){
  //         visibility: hidden;
  //         display: none;
  //       }
  //     }
  //   }

  // }

 

    
</style>
  