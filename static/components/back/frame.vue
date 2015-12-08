<style>
</style>

<template>
<div class="frame"></div>
</template>


<script>

return {
	
	props : ['framenumber', 'framedata']
	, data : function(){
		return {
		}
	}
	, ready : function(){
		console.log(this.framenumber, this.framedata)
	}

}
</script>

