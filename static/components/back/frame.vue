<style>
.frame{
	.w(12px);.h(24px);
	.left;
	.bgc(#333);
	border:1px solid #222;
	.ml(-1px);.mb(-1px);

	.focus{

	}
}
</style>

<template>
<div class="frame">
</div>
</template>


<script>

return {
	
	props : ['focusitem', 'framenumber', 'framedata']
	, data : function(){
		return {
		}
	}
	, ready : function(){
		console.log(this.framenumber, this.framedata)
	}

}
</script>

