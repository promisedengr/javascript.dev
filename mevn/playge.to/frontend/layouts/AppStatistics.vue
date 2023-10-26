<template>
    <div>
        <div class="statistics flex-c-c">
            <div class="statisticsBlock">
                <div class="statisticsBlock-title">
                    Game Statistics (GLOBAL)
                </div>
                <div class="statisticsBlock-info">
                    Players Online <span>{{globalServer._players}}</span>
                </div>
                <div class="statisticsBlock-info">
                    Accounts <span>{{globalServer._accounts}}</span>
                </div>
                <div class="statisticsBlock-info">
                    Server Status <span v-if="globalServer._status">Online</span><span v-else>Offline</span>
                </div>
            </div>
        </div>

        <div class="statistics flex-c-c">
            <div class="statisticsBlock">
                <div class="statisticsBlock-title">
                    Game Statistics (SEA)
                </div>
                <div class="statisticsBlock-info">
                    Players Online <span>{{seaServer.players}}</span>
                </div>
                <div class="statisticsBlock-info">
                    Accounts <span>{{seaServer.accounts}}</span>
                </div>
                <div class="statisticsBlock-info">
                    Server Status <span v-if="seaServer.status">Online</span><span v-else>Offline</span>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
    export default {
        data() {
            return {
                globalServer: {
                    _players: 0,
                    _accounts: 0,
                    _status: false
                },
                
                seaServer: {
                    players: 0,
                    accounts: 0,
                    status: true
                },
                globalPlayers: 0,
                globalAccount: 0,
                globalStatus: false
            }
        },
        created() {
            this.getGameStatistics()
        },
        methods: {
            getGameStatistics() {
                let data = {}
                this.$api.request.getGameStatistics(data, (res => {
                    if (res.status == 200) {
						// console.log(res)
                        this.globalServer = res.data._server
                        this.seaServer = res.data.server
						// this.purchases = res.data.list
						// this.globalPlayers = res.data._players
                        // this.globalAccount = res.data._accounts
                        // this.globalStatus = res.data._status
					} else {
						this.$toast.error('DB error.')
					}
                    // if (res.data.user) {
                    //     this.$toast.show(`Successfully registered the username "${this.username}".`)
                    //     this.$store.dispatch('account/setAccount', res.data.user)
                    //     this.$store.commit('closeModal')
                    // } else if (res.data.message) {
                    //     this.$toast.error(res.data.message)
                    // }
                }), err =>{
                    this.$toast.error('Server is disconnected.')
                    console.log(err)
                })
            }
        }
    }
</script>