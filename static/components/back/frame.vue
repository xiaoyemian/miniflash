<style>
.framemenu{
	.pa;
}
.frame{
	.w(12px);
	.h(24px);
	border-left:1px solid #222;
	.pr;
	.bgc(#333);

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

	&.focus{
		.bgc(#f69);
	}
}
</style>

<template>
<div class="frame" :class="{keyframe : framedata && framedata.style, focus : focus.item_id == item_id && focus.frame_id == frame_id}" @click.stop="selectFrame"></div>
<div v-if="" class="framemenu">menu</div>
</template>


<script>

return {
	props : ['focus', 'item_id', 'frame_id', 'framedata', 'frame_step', 'index']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectFrame : function(){
		//	console.log(this.index)

			if(!this.framedata){
				this.$dispatch('addFrame', this.frame_id)
			}

			this.$dispatch('setFocus', this.item_id, this.frame_id)
		}
	}
	, events : {
		selectFrame : function(item_id, frame_id){
			if(item_id == this.item_id && frame_id == this.frame_id)
				this.selectFrame()
		}
	}
}
</script>

