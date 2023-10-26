<template>
    <!-- <aside class="side-bar"> -->
      <div class="side-bar">
        <div class="side-bar-header d-flex flex-column mx-auto w-290">
          <img src="@/assets/images/logo.svg" alt="" />
          <span class="logo">Chameleon</span>
        </div>
        <ul class="list-wrapper">
          <li class="d-flex justify-center mb-1" @click="$router.push('/')" :class="$route.path === '/'? 'active' : ''">
            <div class="d-flex w-290 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#313131" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
              </svg>
              <a class="ms-2">Open Data Library</a>
            </div>
          </li>
          <li class="d-flex justify-center mb-1" @click="pushToContribution()" :class="$route.path == '/contribution'? 'active' : ''">
            <div class="d-flex w-290 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="#313131" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"/>
                </svg>
              <a class="ms-2">Data Contribution</a>
            </div>
          </li>
          <li class="d-flex justify-center mb-1" @click="pushToSponsor()" :class="$route.path == '/sponsor'? 'active' : ''">
            <div class="d-flex w-290 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#313131" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"/>
              </svg>
              <a class="ms-2">Chameleon Sponsor</a>
            </div>
          </li>
          <li class="d-flex justify-center mb-1" @click="pushToManager()" :class="$route.path == '/manager'? 'active' : ''">
            <div class="d-flex w-290 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#313131" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44h-.001Z"/>
              </svg>
              <a class="ms-2">Data Manager</a>
            </div>
          </li>
          <li class="d-flex justify-center mb-1" @click="pushToConfiguration()" :class="$route.path == '/configuration'? 'active' : ''">
            <div class="d-flex w-290 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#313131" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"/>
              </svg>
              <a class="ms-2">IPFS Configuration</a>
            </div>
          </li>
        </ul>
      </div>
    <!-- </aside> -->
</template>
<script>
  export default {
    methods: {
      pushToContribution() {
        if (this.$store.state.account.address)
          this.$router.push('/contribution')
        else
         this.$toast.error('Please connect your wallet first')
      },
      pushToSponsor() {
        if (this.$store.state.account.address)
          this.$router.push('/sponsor')
        else
         this.$toast.error('Please connect your wallet first')
      },
      pushToManager() {
        if (this.$store.state.account.address)
          this.$router.push('/manager')
        else
         this.$toast.error('Please connect your wallet first')
      },
      pushToConfiguration() {
        if (this.$store.state.account.address)
          this.$router.push('/configuration')
        else
         this.$toast.error('Please connect your wallet first')
      },

      
      
    }
  }
</script>
<style lang="scss" scoped>
ul.list-wrapper {
  text-decoration: none;
  margin: 0px auto;
  padding: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

ul li {
  list-style: none;
  cursor: pointer;
  height: 54px;
  padding: 0px;
  // width: 296px;
  width: 100%;
  margin: 0px auto;
  border-radius: 3px;
  &:hover {
    // color: var(--white);
    // background: var(--primary);
    background-color: #4A9EA1;
    stroke: #fff;
    color: #fff
  }
}

ul li a {
  text-decoration: none;
  color: var(--dark);
}


ul li img {
  padding-right: 10px;
}
.active {
    // color: var(--white);
    // background: var(--primary);
    background-color: #4A9EA1;
    path {
      stroke: white;

    }
    a {
      color: var(--white);
    }
}
</style>