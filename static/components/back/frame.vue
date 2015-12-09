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
<div class="frame" :class="{keyframe : framedata && framedata.style, focus : focus.item_id == item_id && focus.frame_id == frame_id}" @click.stop="selectFrame"></div>
<div v-if="" class="framemenu">menu</div>
</template>


<script>

return {
	props : ['focus', 'item_id', 'frame_id', 'trackdata', 'frame_step']
	, data : function(){
		return {
			framedata : this.trackdata[this.frame_id]
		}
	}
	, methods : {
		selectFrame : function(){

			if(!this.framedata){
				var style = {}

				for(var i = this.frame_id; i >= 0; i-= this.frame_step){
					var framedata = this.trackdata[i+'']
					if(framedata && framedata.style){

						for(var key in framedata.style){
							style[key] = framedata.style[key]
						}
						break;
					}
				}
				this.trackdata[this.frame_id] = {style:style}

				this.framedata = this.trackdata[this.frame_id]
			}

			this.$dispatch('setFocus', this.item_id, this.frame_id, this.framedata.style)
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

