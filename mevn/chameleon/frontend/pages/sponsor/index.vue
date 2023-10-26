<template>
    <div>
        <div class="content-wrapper" >
            <h5>Chameleon Sponsor</h5>
            <p class="grey">Here is a list of chameleon sponsor-enabled data you contributed to the open data library. Click on each of the data to view the list of generous sponsors. Chameleon sponsor is powered by Polygon.</p>
            
        </div>
        <div @click="$router.push(`/sponsor/${s._id}`)" class="divBox" v-for="(s, i) in sponsors" :key="i" v-if="sponsors.length > 0">
            <div class="editBox">
                <h2>{{s.data.name}}</h2>
                <span style="display: flex; justify-content:center; align-item: center;">
                    <img src="@/assets/images/eric/love.svg" style="cursor: pointer; width: 20px; height: 20px;">
                    <span>{{s.sponsors.length}}</span>
                </span>
            </div>
            <p>{{s.data.overview}}</p>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        sponsors: [],
      }
    },
    created() {
      if (this.$store.state.account.address)
        this.getSponsorMetadata()
      else
        this.$router.push('/')
    },
    methods: {
     
      getSponsorMetadata() {
        let data = {}
        data.address = this.$store.state.account.address
        this.$api.request.getSponsorMetadata(data, (res => {
          if (res.data.list){
            this.sponsors = res.data.list
            // console.log(this.metadata)
          } else
            this.$toast.error(`An Internal Error.`)
        }), err =>{
          this.$toast.error(`Server is disconnected.`)
          console.log(err)
        })
      }
    }
  }
    // export default {
    //     data() {
    //         return {
    //             sponsors: ['A']
    //         }
    //     },
        


    // }
</script>
<style lang="scss" scoped>
    .grey {
        color: #919191;
        // margin-top: 5px;
        margin-bottom: 45px
    }
    p {
    text-align: justify;
    }
    .divBox {
        border: solid 1px #E1E1E1;
        margin-top: 15px;
        padding: 32px 24px;
        border-radius: 3px;
        .editBox {
            display: flex;
            justify-content: space-between;
        }
        h2 {
        font-size: 18px;
        }
        p{
            margin-top: 24px;
            color: #919191;
            text-align: justify;
        }
    }
</style>