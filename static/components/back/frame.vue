<style>
.frame{
	.w(12px);.h(24px);
	.left;
	.pr;
	.bgc(#333);
	border:1px solid #222;
	.ml(-1px);.mb(-1px);

	&:nth-child(5n+1){
		.bgc(#3a3a3a);
	}
	
}
.keyframe{
	&:before{
		content:'';.pa;top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000);
		.border-r(8px);
	}
}
</style>

<template>
<div class="frame" :class="framedata ? (framedata.type || 'keyframe') : ''" @click.stop.prevent="setFocus"></div>
</template>


<script>

return {
	props : ['itemdata', 'focusitem', 'framenumber', 'framedata']
	, data : function(){
		return {
		}
	}
	, methods : {
		setFocus : function(){
			this.$dispatch('setFocus', this.item)
		}
	}
	, ready : function(){
	}

}
</script>

