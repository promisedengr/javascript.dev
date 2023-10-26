<template>
	<div class="modalBlock">
		<span class="modalBlock-crystal"></span>
		<div class="modalBlock-title">
			Sign Up
		</div>
		<!-- <form> -->
			<div class="formGroup formGroup-user">
				<span>Username</span>
				<div class="formGroup-flex">
					<div class="formGroup-icon">
						<i class="form-icon icon-user"></i>
					</div>
					<input type="text" v-model="username">
				</div>
			</div>
			<div class="formGroup formGroup-password">
				<span>Password</span>
				<div class="formGroup-flex">
					<div class="formGroup-icon">
						<i class="form-icon icon-password"></i>
					</div>
					<input type="password" v-model="password">
				</div>
			</div>
			<!-- <div class="formGroup formGroup-password formGroup-agree">
				<p>(Min. 10 Characters)</p>
				<span>Password</span>
				<div class="formGroup-flex">
					<div class="formGroup-icon">
						<i class="form-icon icon-password"></i>
					</div>
					<input type="password" v-model="password">
				</div>
			</div> -->
			<div class="formGroup formGroup-email">
				<span>Email</span>
				<div class="formGroup-flex">
					<div class="formGroup-icon">
						<i class="form-icon icon-mail"></i>
					</div>
					<input type="text" v-model="email" :readonly="emailCodeSended">
				</div>
				<button v-if="!emailCodeSended" @click="sendEmailCode()" class="button-small">SEND CODE</button>
				<div class="field-code">
					<input type="text" v-model="emailCode">
				</div>
			</div>
			<div class="formGroup formGroup-number">
				<span>Phone</span>
				<div class="formGroup-flex">
					<div class="formGroup-icon">
						<i class="form-icon icon-number"></i>
					</div>
					<input type="tel" v-model="phoneNumber" :readonly="smsCodeSended">
				</div>
				<button v-if="!smsCodeSended" @click="sendSmsCode()" class="button-small" >SEND CODE</button>
				<div class="field-code">
					<input type="text" v-model="smsCode">
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
				<button class="button-big" @click="userSignUp()">Sign Up</button>
			</div>
			<div class="formGroup-text">
				Already registered? <a @click="$store.dispatch('setModalType', 'sign-in')">Sign In Now</a>
			</div>
		<!-- </form> -->
		<a class="close-modal" @click="$store.commit('closeModal')"></a>
	</div>
</template>
<script>
    export default {
        name: 'SignUpModal',
		data(){
			return {
				username: '',
				password: '',
				email: '',
				phoneNumber: '',
				netType: 0,
				emailCode: '',
				smsCode: '',
				emailCodeSended: false,
				smsCodeSended: false
			}
		},
		mounted() {
			if (this.$store.state.config.global == 1) {
				this.netType = 1
			} else if (this.$store.state.config.sea == 1)
				this.netType = 0
		},
		methods: {
			userSignUp(){
				// this.$toast.error('Please insert your verification code of phone number.')
				if (!this.username){
					this.$toast.error('Please insert your username.')
						return
				}
				if (this.username.length < 4) {
					this.$toast.error(`Minimum length of the name is 4.`)
					return
				}
				if (this.username.length > 20) {
					this.$toast.error(`The new name exceeds to the maximum length.`)
					this.username = ''
					return
				}
				const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
				if (specialChars.test(this.username)) {
					this.$toast.error(`The username can't contain the special letters`)
					this.username = ''
					return
				}
				if (this.username.length > 10) {
					this.$toast.error(`The username can't exceed the length of 10.`)
					this.username = ''
					return
				}
				if (!this.password){
					this.$toast.error('Please insert your password.')
						return
				}
				if (this.password.length > 20){
					this.$toast.error(`The password can't exceed the length of 20.`)
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
				if (!this.emailCode){
					this.$toast.error('Please insert your verification code of email.')
					return
				}
				if (!this.smsCode){
					this.$toast.error('Please insert your verification code of phone number.')
					return
				}

				// if (this.username && this.password && this.phoneNumber && this.email) {

					let data = {}
					data.username = this.username
					data.password = this.password
					data.email = this.email
					data.emailCode = this.emailCode
					data.phoneNumber = this.phoneNumber
					data.smsCode = this.smsCode
					data.netType = this.netType
					this.$api.request.userSignUp(data, (res => {
						if (res.data.user) {
							this.$toast.show(`Successfully registered the username "${this.username}".`)
							this.$store.dispatch('account/setAccount', res.data.user)
							this.$store.commit('closeModal')
						} else if (res.data.message) {
							this.$toast.error(res.data.message)
						}
					}), err =>{
						this.$toast.error('Server is disconnected.')
						console.log(err)
					})
				// }
			},
			sendEmailCode() {
				
				if (!this.email){
					this.$toast.error(`Please type your email.`)
					return
				}
				this.emailCodeSended = true
				let data = {}
				data.email = this.email
				this.$api.request.sendEmailCode(data, (res => {
					if (res.data.type == 0){
						this.$toast.show(`The verification code is sent to your email.`)
						setTimeout(()=> {
							this.emailCodeSended = false
						}, "300000")
					} else if (res.data.type == 2){
						this.$toast.error('An Invalid Email.')
						this.emailCodeSended = false
					} else if (res.data.type == 3){
						this.$toast.error('The Email already exists.')
						this.emailCodeSended = false
					} else {
						this.$toast.error(`Something went wrong while sending your code.`)
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			},
			sendSmsCode() {
				if (!this.phoneNumber){
					this.$toast.error(`Please type your phone number.`)
					return
				}
				
				this.phoneNumber = this.phoneNumber.replace(/\D/g, '');
				if (this.phoneNumber.length < 9) {
						this.$toast.error(`Invalid Phone Number`)
						this.phoneNumber = '';
						return
				}

				// var phoneno = /^\d{10}$/;
				// if(!this.phoneNumber.match(phoneno)) {
				// }

				this.smsCodeSended = true

				let data = {}
				data.phoneNumber = this.phoneNumber
				this.$api.request.sendSmsCode(data, (res => {
					console.log(res)
					if (res.data.type == 0){
						this.$toast.show(`The verification code is sent to your phone number.`)
						setTimeout(()=> {
							this.smsCodeSended = false
						}, "300000")
					} else if (res.data.type == 2){
						this.$toast.error('Invalid Phone number.')
						this.smsCodeSended = false
					} else if (res.data.type == 3){
						this.$toast.error('The phone number already exists.')
						this.smsCodeSended = false
					} else 
						this.$toast.error(`Something went wrong while verifying your code.`)
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})

			}
		}
	
	}
</script>
<style lang="scss" scoped>
	.formGroup-text {
		a {
			color: #91a8f8;
			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>