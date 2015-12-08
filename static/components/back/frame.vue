<style>
.framemenu{
	.pa;
}
.frame{
	.w(12px);.h(24px);
	.left;
	.pr;
	.bgc(#333);
	border:1px solid #222;
	.ml(-1px);.mt(-1px);.mb(-1px);

	&:nth-child(5n+1){
		.bgc(#3a3a3a);
	}
	
	&.keyframe{
		.bgc(#696);
		&:before{
			content:'';.pa;top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000);
			.border-r(8px);
		}
	}
}
</style>

<template>
<div class="frame" :class="framedata ? (framedata.type || 'keyframe') : ''" @click.stop="selectFrame($event)"></div>
<div v-if="" class="framemenu">menu</div>
</template>


<script>

return {
	props : ['frame_id', 'itemdata', 'framenumber', 'framedata']
	, data : function(){

		console.log(this.framenumber, this.framedata)
		
		return {
		}
	}
	, methods : {
		selectFrame : function($event){
			this.$dispatch('setItemFocus', this.itemdata.item_id)
			this.$dispatch('setFrameFocus', this.framenumber)
		}
	}
}
</script>

