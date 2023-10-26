<template>
  <!-- <header> -->
    <div class="d-flex justify-end">
				<div class="btn-content d-flex" @click="connect">
          <template v-if="!$store.state.account.address">
            <img src="@/assets/images/eric/metamask.svg" style="width: 20px; height: 20px;">
            <span>Connect wallet</span>
          </template>
          <template v-else>
            <img src="@/assets/images/bal.svg" style="width: 20px; height: 20px;">
            <span>{{$store.state.account.address.slice(0,6)}}...{{$store.state.account.address.slice($store.state.account.address.length-5, $store.state.account.address.length)}}</span>
          </template>
				</div>
			</div>
  <!-- </header> -->
</template>
  
<script>
  // import AppHeaderRight from "./AppHeaderRight.vue";

  export default {
    name: "Header",
    components: {},
    data() {
      return {
        address: "",
      };
    },
		methods: {
			getAccount() {
        return new Promise((resolve) => {
          window.$web3.eth.getAccounts().then( async (res) => {
              if (!res.length) {
                let result = await window.ethereum.send('eth_requestAccounts');
                return result.result[0];
              }
              return resolve(res[0]);
          });
        });
      },
      connect() {
        // this.getAccount().then((address) => {
        //   this.address =address
        // })
        // this.$toast.show('Pinata API Key and Pinata API Secret are registered.')

        this.getAccount().then((address) => {
          console.log('address: ' + address)
          // address = '0x4D0AE7C96B4F84FA1cEFFFD9AdEdC6caf34491fB'
          this.$api.request.getUserData({_add: address}, (res => {
            console.log(res.data)
            if (res.data.address) {
              this.$store.dispatch('account/setAccount', res.data)
              this.address = this.$store.state.account.address
              this.pinataKey = this.$store.state.account.pinataKey
              this.pinataSecret = this.$store.state.account.pinataSecret
              if (this.pinataKey)
                this.registered = true
            }
          }), err =>{
            console.log(err)
            // this.$toast.error('Error while authenticating')
          })
        })
      },
		}
  };
</script>

<style lang="scss" scoped>
  .btn-content {
  border: 1px solid #e1e1e1;
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
  border-radius: 3px;
  height: 47px;
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 196px;
  margin-bottom: 40px;
  margin-top: 64px;
  cursor: pointer;
}

.btn-content span {
  color: var(--grey);
  margin-left: 7px;
}

    
</style>
  