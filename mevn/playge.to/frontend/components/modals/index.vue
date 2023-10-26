<template>
  <div v-if="$store.state.isModal" class="overlay">
    <div class="e-modal">
			<SignUpModal v-if="$store.state.modalType =='sign-up'"/>
      <SignInModal v-if="$store.state.modalType =='sign-in'"/>
      <RecoverNowModal v-if="$store.state.modalType == 'recover-now'"/>
		</div>
  </div>
</template>
<script>
  import SignUpModal from './SignUpModal.vue'
  import SignInModal from './SignInModal.vue'
  import RecoverNowModal from './RecoverNowModal.vue';
  
  export default {
    name: "ModalContainer",
    props: { type: String},
    components: { SignUpModal, SignInModal, RecoverNowModal},
  };
</script>

<style lang="scss" scoped>
</style>