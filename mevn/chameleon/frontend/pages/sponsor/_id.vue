<template>
    <div>
        <div class="content-wrapper">
            <div @click="$router.push(`/sponsor`)" style="cursor: pointer;">
                <img src="@/assets/images/eric/arrow_back.svg"/>
                Back
            </div>
            <div class="top mt-4">
                <h1>{{metadata.data.name}}</h1>
                <p style="width: 725px;">{{metadata.data.overview}}</p>
                <p style="border: 1px solid #e1e1e1; width: 725px;" class="p-2 my-2">Receiver's Address on Polygon: {{metadata.receiver}}</p>

                <p class="mt-4">Number of sponsors: <span style="color: #000; font-weight:600">{{metadata.sponsors.length}}</span></p>
                <!-- <p style="border: 1px solid #e1e1e1; width: 725px;" class="p-2 my-2">Receiver's Address on Polygon: {{metadata.receiver}}</p> -->
                <div class="px-3 mt-1" style="border: 1px solid #e1e1e1; width: 725px; display: flex; align-items: center; justify-content: space-between;" v-for="(s, i) in metadata.sponsors" :key="i">
                    <!-- <font-awesome-icon icon="fa-regular fa-heart" /> -->
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <img src="@/assets/images/eric/love_grey.svg"/>
                        <p class="ms-2">{{s.sender}}</p>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <p style="color: #8247E5;" class="me-1">{{s.amount}}</p>
                        <img src="@/assets/images/eric/matic.svg"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                idx: this.$route.params['id'],
                metadata: {
                    data: {
                    },
                    sponsors: []
                }
            }
        },
        created() {
            this.getMetadataById()
        },
        methods: {
            getMetadataById() {
                let data ={}
                data._id = this.idx
                this.$api.request.getMetadataById(data, (res => {
                    if (res.data.metadata){
                        this.metadata = res.data.metadata
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
<style lang="scss" scoped>
.top {
        h1 {
            font-size: 25px;
        }
        p {
            margin-top: 11px;
            color: #919191;
            text-align: justify;
        }
    }
</style>