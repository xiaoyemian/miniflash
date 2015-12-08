<style>
.frame{
	.w(12px);.h(24px);
	.left;
	.bgc(#333);
	border:1px solid #222;
	.ml(-1px);.mb(-1px);

	&:nth-child(5n+1){
		.bgc(#3a3a3a);
	}

	.focus{

	}
}
</style>

<template>
<div class="frame" @click.stop.prevent="setFocus"></div>
</template>


<script>

return {
	
	props : ['focusitem', 'framenumber', 'framedata']
	, data : function(){
		return {
		}
	}
	, methods : {
		setFocus : function(){
			console.log(this)
			//this.$dispatch('setFocus', this)
		}
	}
	, ready : function(){
		console.log(this.framenumber, this.framedata)
	}

}
</script>

