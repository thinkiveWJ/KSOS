<template>
	<div id="">
		<span class="glyphicon glyphicon-star" v-for="index in startArr" :key="index"></span>
	</div>
</template>

<script type="text/ecmascript-6">
	//显示星级模板
	export default {
		data () {
			return {
				startArr: []
			}
		},
		props: ['start'],
		created () {
			this.startArr.length = this.start
		},
		watch: {
			'start': function (newVal) {
				this.startArr = []
				for(var i = 0; i < newVal; i ++) {
					this.startArr.push(i)
				}
			} 
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
</style>