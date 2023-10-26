<template>
    <div class="content">
         <div class="title-page" style="display: flex; justify-content: center; align-items: center;">
             <div>Game Logs</div>
         </div>
         <div class="">
             <ul class="cp-menu cp-menu-account">
                 <a @click="$router.push('/game-logs')" :class="$route.query.tab == undefined? 'active': ''" class="button">Deleted Items</a>
                 <a @click="$router.push('/game-logs?tab=item-exchange')" :class="$route.query.tab == 'item-exchange'? 'active': ''" class="button">Item Exchanges</a>
             </ul>
         </div>
         <div class="account">
             <div class="accountBlock flex">
                 <!-- <div class="accountBlock-menu" style="width: 30%;"> -->
                 <!-- <div class="accountBlock-menu">
                     <div class="accountBlock-title">
                         Menu
                     </div>
                     <ul class="cp-menu cp-menu-account">
                         <a @click="$router.push('/game-logs')" :class="$route.query.tab == undefined? 'active': ''" class="button">Deleted Items</a>
                         <a @click="$router.push('/game-logs?tab=item-exchange')" :class="$route.query.tab == 'item-exchange'? 'active': ''" class="button">Item Exchanges</a>
                     </ul>
                 </div> -->
                 <GameLogsItemDeletePage v-if = "$route.query.tab == undefined"/>
                 <ItemExchange v-else-if="$route.query.tab == 'item-exchange'"/>
                 <AccountCoinPurchaseVue v-else-if="$route.query.tab == 'coin-purchase'"/>
                 <AccountChangeFamilyNameVue v-else-if="$route.query.tab == 'change-family-name'"/>
                 <AccountChangePasswordVue v-else-if="$route.query.tab == 'change-password'"/>
             </div>
         </div>
     </div>
                     
 </template>
 <script>
     import GameLogsItemDeletePage from '../../views/gameLogsPage/GameLogsItemDeletePage.vue';
     import ItemExchange from '../../views/gameLogsPage/ItemExchange.vue'
     import AccountCoinPurchaseVue from '../../views/accountPage/AccountCoinPurchange.vue'
     import AccountChangeFamilyNameVue from '../../views/accountPage/AccountChangeFamilyName.vue'
     import AccountChangePasswordVue from '../../views/accountPage/AccountChangePassword.vue'
 
     export default {
         components: {GameLogsItemDeletePage, ItemExchange, AccountChangeFamilyNameVue, AccountCoinPurchaseVue, AccountChangePasswordVue},
         data() {
             return {
                 namePlayer: 'No Family Created',
             }
         },
         created(){
             if (this.$store.state.account.name){
                 this.getNamePlayer()
             } else
                 this.$router.push(`/`)
         },
         methods: {
             getNamePlayer() {
                 let data = {}
                 data.username = this.$store.state.account.name
                 data.netType = this.$store.state.account.netTyep
                 this.$api.request.getNamePlayer(data, (res => {
                     if (res.data.name) {
                         this.namePlayer = res.data.name
 
                     } else
                         this.$toast.error(`An Internal Error`)
                 }), err =>{
                     this.$toast.error('Server is disconnected.')
                     console.log(err)
                 })
             }
         }
      }
 </script>
 <style lang="scss">
     .active {
         opacity: 1;
         filter: brightness(140%) drop-shadow(0px 10px 5px rgba(0, 0, 0, 0.1));
     }
 </style>