<template>
    <div>
        <div class="content-wrapper" >
            <h5>Data Manager</h5>
            
        </div>
        <p class="grey">Here is a list of the data you contributed to Chameleon. You can edit the info and details of the data here, however, Chameleon will regenerate the metadata file of the edited data and upload to the IPFS network again. If you want to remove your data in the Open Data Library, you can also choose to delist it here. </p>
            <div class="divBox" v-for="(m, i) in metadata" :key="i" v-if="metadata.length > 0">
                <div class="editBox">
                    <h2>{{m.data.name}}</h2>
                    <span>
                        <img @click="$router.push(`/manager/${m._id}`)" src="@/assets/images/eric/edit.svg" style="cursor: pointer;">
                        <img @click="deleteMetadataById(m._id)" src="@/assets/images/eric/delete.svg" style="cursor: pointer;">
                    </span>
                </div>
                <p>{{m.data.overview}}</p>
            </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                metadata: []
            }
        },
        created() {
            this.getAccountMetadata()
        },
        methods: {
            getAccountMetadata() {
                if (this.$store.state.account.address) {
                    let data = {}
                    data.address = this.$store.state.account.address
                    this.$api.request.getAccountMetadata(data, (res => {
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
            },
            deleteMetadataById(id) {
                let data ={}
                data._id = id
                this.$api.request.deleteMetadataById(data, (res => {
                        if (res.data.type){
                            this.$toast.show(`Successfully deleted from Database.`)
                            this.getAccountMetadata()
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