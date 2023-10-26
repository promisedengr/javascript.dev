<template>
<div class="content">
		<div class="page-title">
			<span>Downloads</span>
		</div>
		<div class="downloads flex-s">
			<div class="download-block download-l">
				<div class="download-block_flex flex-c-c">
					<div class="download-block_flex-c" v-if="downloads.length > 0">
						<div class="gameClient-title">
							Game Client: <span>{{downloads[0].size}}GB</span>
						</div>
						<div class="gameClient-download flex-c-c">
							<a v-for="(d, i) in downloads" :key="i" :href="d.link">
								<img :src="`/assets/images/download/${d.picture}`">
								<span>{{d.name}}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="download-block download-r">
				<div class="download-block_flex flex-c-c">
					<div class="download-block_flex-c">
						<div class="link-title">
							Download Links
						</div>
						<div class="link-text">
							The links are updated to the most recent dates.<br>
							We try to use the most convenient download providers for our users, however if you encounter any problems with any of the links, please: 
						</div>
						<div class="link-button">
							<a href="#" class="button button-small-red">Report Problem</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-title">
			<span>Requirements</span>
		</div>
		<div class="table-scroll">
			<table class="table">
				<thead>
					<tr>
						<td>Requirements</td>
						<td>Minimum</td>
						<td>Recommended</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>O.S.</td>
						<td>Windows 7</td>
						<td>Windows 10</td>
					</tr>
					<tr>
						<td>Processor</td>
						<td>2nd Generation Intel Processors<br> (Intel Core i3/i5/i7-2xxx)</td>
						<td>7th Generation Intel Processors<br> (Intel Core i3/i5/i7-7xxx)</td>
					</tr>
					<tr>
						<td>RAM</td>
						<td>1GB</td>
						<td>2GB</td>
					</tr>
					<tr>
						<td>VRAM</td>
						<td>512MB</td>
						<td>1GB</td>
					</tr>
					<tr>
						<td>DirectX</td>
						<td>V 9.0c</td>
						<td>V 10</td>
					</tr>
					<tr>
						<td>Hard Drive</td>
						<td>6GB</td>
						<td>6GB</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="page-title">
			<span>Drivers</span>
		</div>
		<div class="drivers flex-s-c">
			<img src="@/assets/images/nvidia.jpg" alt="">
			<img src="@/assets/images/directx.jpg" alt="">
			<img src="@/assets/images/intel.jpg" alt="">
		</div>
	</div><!--content-->
</template>
<script>
	export default {
		data() {
			return {
				downloads: []
			}
		},
		created() {
			this.getDownloads()
		},
		methods: {
			getDownloads() {
				let data = {}
				this.$api.request.getDownloads(data, (res => {
					if (res.status == 200) {
						console.log(res.data)
						this.downloads = res.data.downloads
					} else {
						this.$toast.error('DB error.')
					}
				}), err =>{
					this.$toast.error('Server is disconnected.')
					console.log(err)
				})
			}
		}
	}
</script>