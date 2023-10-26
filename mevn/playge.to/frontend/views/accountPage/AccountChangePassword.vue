<template>
    <div class="accountBlock-ava">
        <div class="accountBlock-title">
            Change Password
        </div>
        <div class="table-information">
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Your old password
                </div>
                <div class="table-information-tr-td">
                    <input type="password" v-model="oldPass">
                </div>
            </div>
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Your new password
                </div>
                <div class="table-information-tr-td">
                    <input type="password" v-model ="newPass">
                </div>
            </div>
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Confirm new password
                </div>
                <div class="table-information-tr-td">
                    <input type="password" v-model="confirmPass">
                </div>
            </div>
            <div class="table-information_confirm">
                <div class="table-information_confirm-button t-center">
                    <button @click="savePassword()">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                oldPass: '',
                newPass: '',
                confirmPass: ''
            }
        },
        methods: {
            savePassword () {
                console.log(this.oldPass)
                console.log(this.newPass)
                console.log(this.confirmPass)
                if (!this.oldPass || !this.newPass || !this.confirmPass){
                    this.$toast.error('Please Fill in the all fields.')
                    return
                }
                if (this.newPass != this.confirmPass) {
                    this.$toast.error(`The confirmation of the new password doesn't match`)
                    return
                }
                if (this.newPass.length > 20){
					this.$toast.error(`The password can't exceed the length of 20.`)
						return
				}
                let data = {}
                data.id = this.$store.state.account.id
                data.oldPass = this.oldPass
                data.newPass = this.newPass
                this.$api.request.savePassword(data, (res => {
                    console.log(res)
                    if (res.data.type == 2) {
                        this.$toast.error(`The wrong password.`)
                    } else if (res.data.type == 1) {
                        this.$toast.error(`Something went wrong.`)
                    } else {
                        this.$toast.show(`Your password has changed.`)
                        this.newPass = ''
                        this.oldPass = ''
                        this.confirmPass = ''
                        this.$store.dispatch('account/resetState')
                        this.$router.push('/')
                    }
                }), err =>{
                    this.$toast.error('Server is disconnected.')
                    console.log(err)
                })


            }
        }
    }
</script>