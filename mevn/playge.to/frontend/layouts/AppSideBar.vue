<template>
    <aside v-if="$store.state.loading"></aside>
    <aside v-else class="sidebar">
        <div v-if="!$store.state.account.name"  v-click-outside="externalClick" class="userPanel" :class="$store.state.isSidebarToggled ? 'active': ''">
            <div class="userPanel-title">
                User Panel
            </div>
            <div class="userPanel-info">
                Please <a>log In</a> to use the entire website.
            </div>
            <div class="userPanel-enter">
                <div class="userPanel-button">
                    <a class="button open-modal" @click="clickSignIn()">Sign In</a> 
                </div>
                <span class="or">or</span>
                <div class="userPanel-button">
                    <a class="button open-modal" @click="clickSignUp()">Sign Up</a>
                </div>
                <a @click="clickDownload()" class="download">
                    <p>Download</p>
                    <span>File Size 2Gb</span>
                </a>
            </div>
        </div>
        <div v-else v-click-outside="externalClick" class="userPanel" :class="$store.state.isSidebarToggled ? 'active': ''">
            <div class="userPanel-title">
                User Panel
            </div>
            <div class="userPanel-name">
                Welcome, <span>{{$store.state.account.name}}</span>
            </div>
            <div class="coin flex-s-c">
                <div class="coin-block">
                    <i class="icon-coin coin-f"></i>
                    Coins
                    <span>{{$store.state.account.coin}}</span>
                </div>
                <div class="coin-block">
                    Server:
                    <span v-if="$store.state.account.netType == 0">GLOBAL</span>
                    <span v-else>SEA</span>

                    <i class="icon-coin coin-s"></i>
                </div>
            </div>
            <ul class="cp-menu">
                <li><a @click="goItemShop()" class="button">Itemshop</a></li>
                <li><a @click="goDonate" class="button">Donate</a></li>
                <li><a @click="goGameLogs" class="button">Game Logs</a></li>

                <li><a @click="goAccount" class="button">Account</a></li>
                
                <!-- <li><a @click="$router.push('/character')" class="button">Characters</a></li>
                <li><a class="button">Delete Account</a></li>
                <li><a class="button">My Tickets</a></li> -->
                <li><a @click="userLogout()" class="button">logout</a></li>
            </ul>
        </div>
        <AppStatisticsVue/>

        <div class="banner flex-c-c">
            <div class="bannerBlock">
                <a>
                    <img src="@/assets/images/prem-bg.jpg" alt="">
                </a>
            </div>
        </div><!--banner-->
        <div class="king">
            <!-- <div class="king-title">
                King Of Kings
            </div> -->
            <div class="king-block">
                <img class="king-block_img" src="@/assets/images/hero.png" alt="">
                <!-- <div class="king-block_info">
                    <div class="king-block_info-name">
                        Vex
                    </div>
                    <div class="king-block_info-guild flex-c-c">
                        <span class="color-yellow">Sura</span>
                        <span class="color-red">Shinsoo</span>
                    </div>
                </div>
                <div class="kills king-block_stat">
                    <p>Kills</p>
                    <span>100.000</span>
                </div>
                <div class="playtime king-block_stat">
                    <p>Playtime</p>
                    <span>3.5 Years</span>
                </div>
                <div class="wars king-block_stat">
                    <p>Wars</p>
                    <span>97.450</span>
                </div> -->
            </div>
            <!-- <div class="king-more">
                <a href="">All Hail To The King!</a>
            </div> -->
        </div><!--king-->
    </aside>
</template>
<script>
import AppStatisticsVue from './AppStatistics.vue'

    export default {
        components: {AppStatisticsVue},
        data() {
            return {
                loading : true
            }
        },
        mounted(){
            console.log('this.loading = false')
            console.log(localStorage)
        },
        methods: {
            externalClick (event) {
                if (this.$store.state.isSidebarToggled){
                 this.$store.commit("SET_SIDE_BAR", 1)
                }
            },
            goItemShop() {
                this.$store.commit("SET_SIDE_BAR", 1)
                this.$router.push('/item-shop')
            },
            goDonate() {
                this.$store.commit("SET_SIDE_BAR", 1)
                this.$router.push('/donate')
            },
            goGameLogs() {
                this.$store.commit("SET_SIDE_BAR", 1)
                this.$router.push('/game-logs')
            },
            goAccount() {
                this.$store.commit("SET_SIDE_BAR", 1)
                this.$router.push('/account')
            },
            clickSignIn() {
                this.$store.commit("SET_SIDE_BAR", 1)
                this.$store.dispatch('setModalType', 'sign-in')
            },
            clickSignUp() {
                this.$store.commit("SET_SIDE_BAR", 1)
                if (this.$store.state.status == 2) {
					this.$toast.error('The registration is disabled')
                    return
                }
                this.$store.dispatch('setModalType', 'sign-up')
            },
            clickDownload() {
                this.$store.commit("SET_SIDE_BAR", 1)
                this.$router.push('/download')
            },
            userLogout(){
                this.$store.commit("SET_SIDE_BAR", 1)
                this.$store.dispatch('account/resetState')
                this.$router.push('/')
            }
        }
        
    }
</script>