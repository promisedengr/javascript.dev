<template>
    <div class="content">
        <div class="title-page">
            <span>Rotation</span>
        </div>
        <!-- <div>
            <img src="@/assets/images/55.png" class="m-2" v-for="(i) in 20" :key="i"/>
        </div> -->
        <h2>Global Rotations</h2>
        <div>
            <img v-for="(r, i) in global_rotations" :key="i" :src="`/rotations/global/${r.JOB_ID}.png`" class="m-2"/>
        </div>
        <h2>Sea Rotations</h2>
        <div>
            <img v-for="(r, i) in sea_rotations" :key="'A' +i" :src="`/rotations/sea/${r.JOB_ID}.png`" class="m-2"/>
        </div>
        <!-- <div class="deposit flex-s">
            <div class="depositBlock" v-for="(r, i) in rotations" :key="i">
                <div class="depositBlock-img flex-c-c">
                    <img :src="`/rotations/global/${r.JOB_ID}.png`" alt="">
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                global_rotations: [],
                sea_rotations: []
            }
        },
        created() {
			this.getRotations()
		},
		methods: {
			getRotations(){
				let data = {}
				this.$api.request.getRotations(data, (res => {
					if (res.status == 200) {
						this.global_rotations = res.data._rotations
						this.sea_rotations = res.data.rotations
                        console.log(res.data)
					} else {
						this.$toast.error('MSSQL Server error.')
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			}
		}
        
    }
</script>