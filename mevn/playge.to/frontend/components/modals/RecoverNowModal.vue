<template>
    <div class="modalBlock">
		<span class="modalBlock-crystal"></span>
		<div class="modalBlock-title">
			Check out your information.
		</div>

        <div class="formGroup formGroup-user">
            <span>Username</span>
            <div class="formGroup-flex">
                <div class="formGroup-icon">
                    <i class="form-icon icon-user"></i>
                </div>
                <input type="text" v-model="username">
            </div>
        </div>
        <div class="formGroup formGroup-email">
            <span>Email</span>
            <div class="formGroup-flex">
                <div class="formGroup-icon">
                    <i class="form-icon icon-mail"></i>
                </div>
                <input type="text" v-model="email">
            </div>
        </div>
        <div class="formGroup formGroup-number">
            <span>Phone</span>
            <div class="formGroup-flex">
                <div class="formGroup-icon">
                    <i class="form-icon icon-number"></i>
                </div>
                <input type="tel" v-model="phoneNumber">
            </div>
        </div>
        <div class="formGroup formGroup-email">
            <span>Choose Server</span>
            <div class="formGroup-flex">
                <div class="formGroup-icon">
                    <i class="form-icon icon-question"></i>
                </div>
                <select v-model="netType">
                    <option v-if="$store.state.config.global == 0" value="0">Global</option>
                    <option v-if="$store.state.config.sea == 0" value="1">Sea</option>
                </select>
            </div>
        </div>
        <div class="formGroup-button">
            <button v-if="!recovered" class="button-big" @click="recoverNow()">Recover Now</button>
        </div>
        <div class="formGroup-text">
            <p><a @click="$store.dispatch('setModalType', 'sign-in')">Back to Sign In</a></p>
        </div>
		<a class="close-modal" @click="$store.commit('closeModal')"></a>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                email: '',
                phoneNumber: '',
                netType: 0,
                recovered: false,
            }
        },
        mounted() {
			if (this.$store.state.config.global == 1) {
				this.netType = 1
			} else if (this.$store.state.config.sea == 1)
				this.netType = 0
		},
        methods: {
            recoverNow() {
                if (!this.username){
					this.$toast.error('Please insert your username.')
						return
				}
				
				if (!this.email){
					this.$toast.error('Please insert your email.')
						return
				}
				if (!this.phoneNumber){
					this.$toast.error('Please insert your your phone number.')
						return
				}
                let data = {}
                data.username = this.username
                data.email = this.email
                data.phoneNumber = this.phoneNumber
                data.netType = this.netType
                this.recovered = true
                this.$api.request.recoverNow(data, (res => {
                    if (res.data.type == 0) {
                        this.$toast.show(`Success. Your new password is sent to your email- ${this.email}`)
                        this.$store.dispatch('setModalType', 'sign-in')
                    } else if (res.data.type == 1) {
                        this.recovered = false
                        this.$toast.error(`Something went wrong.`)
                    } else if (res.data.type == 2) {
                        this.recovered = false
                        this.$toast.error(`The user with your info doesn't exist.`)
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
    }
</script>