<style>
</style>

<template>
</template>

<script>
return {
  components : {
	}
	, props : ['timedata', 'itemdata']
	, data : function(){
		return {
		}
	}
	, watch : {
		'timedata.time' : function(time, oldTime){
			var framedata = this.itemdata.frames[time]
			if(framedata){
				this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
			}
		}
	}
}
</script>

