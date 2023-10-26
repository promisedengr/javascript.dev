<template>
	<div class="app-container d-flex">
		<AppSideBar/>
		<div class="content pb-5">
			<AppHeader/>
			<nuxt/>
		</div>
	</div>
</template>
<script>
    import AppHeader from './AppHeader.vue';
	import AppSideBar from './AppSideBar.vue'
    import Modal from "@/components/modals/index.vue";
    export default {
        name: 'default',
        components: {AppHeader, AppSideBar, Modal},
		data() {
			return {
			};
		},
    }
</script>
<style lang="scss" scoped>

</style>