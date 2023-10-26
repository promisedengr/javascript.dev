<template>
  <div class="content">

<div class="slider">
  <div class="swiper">
    <splide :options="options" style="max-width: 100%;">
      <splide-slide  v-for="(b, i) in banners" :key="i" >
        <div class="picture double" v-if = "b.img != null">
          <img :src="require('@/assets/images/'+  b.img)" style=""/>
        </div>
      </splide-slide>
    </splide>
  </div>
</div>

<div class="news">
  <div class="news-title flex-s-c">
    <span class="news-title_t">News</span>
    <!-- <div class="select" tabindex="1">
      <span class="select_value">All News</span>
      <ui class="select_dropdown">
        <li class="select_option">All News</li>
        <li class="select_option">Event</li>
        <li class="select_option">Important</li>
        <li class="select_option">Update</li>
      </ui>
    </div> -->
    <select class="select select_dropdown" v-model="searchType" @change="getNews()">
      <option class="select_option" value="0">All News</option>
      <option class="select_option" value="2">Event</option>
      <option class="select_option" value="1">Important</option>
      <option class="select_option" value="3">Update</option>
    </select>
  </div>
  <div class="newsBlock">
    <div class="news-block flex-s-c" v-for="(n, i) in news" :key="i">
      <div class="news-block_l">
        <a :href="n.link">{{n.title}}</a>
      </div>
      <div class="news-block_r">
        <span v-if="n.updated" class="color-green">[UPDATE]</span>
        <span v-else-if="n.type == 1" class="color-red">[IMPORTANT]</span>
        <span v-else-if="n.type == 2" class="color-blue">[Event]</span>
        <span>  01/02/2022</span>
      </div>
    </div>


  </div>
</div>

<!-- <div class="topHome flex-s">
  <div class="topHome-50">
    <div class="topHome-title flex-s-c">
      <span>TOP Players</span> <a href="" class="button button-small">View More</a>
    </div>
    <table class="top-table">
      <thead>
        <tr>
          <td>#</td>
          <td>Name</td>
          <td>Empire</td>
          <td>Race</td>
          <td>Level</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>2</td>
          <td><a href="">Very_Long_Nick_Name</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>3</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>4</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>5</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>6</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>7</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>8</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>9</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
        <tr>
          <td>10</td>
          <td><a href="">Vex</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><span class="warrior">Warrior</span></td>
          <td>250</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="topHome-50">
    <div class="topHome-title flex-s-c">
      <span>TOP Guilds</span> <a href="" class="button button-small">View More</a>
    </div>
    <table class="top-table">
      <thead>
        <tr>
          <td>#</td>
          <td>Name</td>
          <td>Empire</td>
          <td>Race</td>
          <td>Level</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>2</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>3</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>4</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>5</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>6</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>7</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>8</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>9</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
        <tr>
          <td>10</td>
          <td><a href="">Designers</a></td>
          <td><span class="clan">Shinsso</span></td>
          <td><a href="">Vex</a></td>
          <td>250</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="top-all-button">
  <a href="" class="button">View All Rankings</a>
</div> -->


</div>
</template>
<script>
  // import HomeLanding from "@/views/homePage/HomeLanding.vue";

  export default {
    name: "index",
    components: {},
    data() {
      return {
        banners : [
          {img: 'slider-img.jpg'},
          {img: 'slider-img-3.jpg'},
          {img: 'slider-img-2.jpg'},
        ],
        news: [],
        searchType: 0,

        options : {
              rewind : true,
              perPage: 1,
              // gap    : '1rem',
              autoplay: true,
              pagination: true,
              breakpoints: {
                  1080: {
                      perPage: 2
                  },
                  756: {
                      perPage: 1
                  }
              },
          },
      }
    },
    created() {
      this.getNews()
    },
    methods: {
      getNews() {
        let data = {}
        data.searchType = parseInt(this.searchType)
        this.$api.request.getNews(data, (res => {
          if (res.status == 200) {
            console.log(res.data)
            this.news = res.data.news
          } else {
						this.$toast.error('DB error.')
					}
						// if (res.data.user) {
						// 	this.$toast.show(`Successfully registered the username "${this.username}".`)
						// 	this.$store.dispatch('account/setAccount', res.data.user)
						// 	this.$store.commit('closeModal')
						// } else if (res.data.message) {
						// 	this.$toast.error(res.data.message)
						// }
        }), err =>{
          this.$toast.error('Server is disconnected.')
          console.log(err)
        })
      }
    }
  };
</script>
<style lang="css">


  /* .splide-list {
    backface-visibility: hidden;
    display: flex;
    height: 100%;
    margin: 0!important;
    padding: 0!important;
    transform-style: preserve-3d;
  }
  .splide__arrow{
    border-radius: 25%;
    background: #93acd3;
    
  }
  .splide__slide {
    margin-right: 16px;
  } */
</style>