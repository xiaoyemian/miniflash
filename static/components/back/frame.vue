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

	&.focus{
		.bgc(#f69);
	}
}
</style>

<template>
<div class="frame" :class="{keyframe : framedata.style, focus : focus.item_id == item_id && focus.frame_id == frame_id}" @click.stop="selectFrame"></div>
<div v-if="" class="framemenu">menu</div>
</template>


<script>

return {
	props : ['focus', 'item_id', 'frame_id', 'framedata']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectFrame : function(){
			this.$dispatch('setFocus', this.item_id, this.frame_id)

			var framedata = this.framedata

			if(framedata.style){
//				this.$set('framedata.style.height', 100)	

			}else{
				this.$set('framedata.style', {})

			}

			this.$dispatch('doUpdateItem', framedata.style)
		}
	}
	, events : {
		updateItem : function(style){
		}
	}
}
</script>

