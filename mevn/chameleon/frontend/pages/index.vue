<template>
  <div>
    <div class="content-wrapper">
      <h5>Open Data Library</h5>
      <div class="filter">
                <input class="search" type="search" v-model="name" placeholder="Search by dataset name or CID" @input="getMetadata()">
                <select v-model="date" class="order" @change="getMetadata()">
                    <option value="date">Ascending Date Order</option>
                    <option value="-date">Descending Date Order</option>

                </select>
            </div>
    </div>
    <div class="divBox" v-for="(m, i) in metadata" :key="i" @click="$router.push(`/${m._id}`)">
        <h2>{{m.data.name}}</h2>
        <p>{{m.data.overview}}</p>
        <p>Contributed by: {{m.writer}}</p>
        <p>Data CID: {{m.rootCid}}</p>
        <div class="buttonGroup">
            <a class="button">{{m.data.format}}</a>
            <a class="button ms-1" v-for="(f, i) in m.data.files" :key="'A' + i">{{f.tag}}</a>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        metadata: [],
        name: '',
        date: 'date'
      }
    },
    created() {
      this.getMetadata()
    },
    methods: {
      handleChange() {
        // if 
        // console.log('sdhfue')
      },
      handleOption() {
        // console.log(this.date)
      },
      getMetadata() {
        let data = {}
        data.name = this.name
        data.date = this.date
        this.$api.request.getMetadata(data, (res => {
          if (res.data.list){
            this.metadata = res.data.list
            console.log(this.metadata)
          } else
            this.$toast.error(`An Internal Error.`)
        }), err =>{
          this.$toast.error(`Server is disconnected.`)
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="css">

</style>
<style lang="scss" scoped>
  input {
    border: solid 1px #E1E1E1;
    border-radius: 3px;
    padding: 15px;
  }
  .filter {
    input {
      display: block;
      // margin-top: 10px;
      margin-right: 4px;
    }
  }
  .divBox {
    border: solid 1px #E1E1E1;
    margin-top: 15px;
    padding: 32px 24px;
    border-radius: 3px;
    h2 {
    font-size: 18px;
}
 p {
    margin-top: 24px;
    color: #919191;
    text-align: justify;
}
a {
  text-decoration: none;
    display: inline-block;
    width: 78px;
    height: 25px;
    background-color: #4A9EA1;
    color: white;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
    font-size: 14;
    margin-top: 29px;
}
  }
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 33px;
    .search {
      width: 391px;
      height: 41px;
      padding-right: 45px;
      background-image: url('@/assets/images/eric/search.svg');
      background-repeat: no-repeat;
      background-position: 95% 50%;
    }
    .order {
      width: 245px;
      height: 41px;
      background-color: white;
      border: 1px solid #E1E1E1;
      color: #919191;
      padding: 10px 15px;
    }
  }
// @font-face {
//     font-family: 'Roobert';
//     // src: url('rooberttrial-regular.otf');
// }

</style>