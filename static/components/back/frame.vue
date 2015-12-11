<style>
.framemenu{
	.pa;
}

.frame{
	.pr;
	.bgc(#333);


	&:nth-child(5n+1){
		.bgc(#383838);
	}

	&:before, &:after{
		content:'';.pa;z-index:1;
	}


	.handel{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		.opacity(20);

	}

	&.keyframe, &.blankframe{
		.handel{
			.bgc(#5CD685);
		}
	}

	&.keyframe{
		&:before{
			top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000);
			.border-r(8px);
		}
	}

	&.animateframe{
		.handel{
			.bgc(#5CADD6);
		}
	}


	&.current{
		.handel{
			.opacity(100);
		}
	}

	&.focus{
		.handel{
			.opacity(100);
			.bgc(#f69);
		}
	}


}
</style>

<template>
<div class="frame" :class="{keyframe : framedata && framedata.type == 'keyframe', blankframe : framedata && (!framedata.type || framedata.type == 'blankframe'), focus : focus.item_id == item_id && focus.frame_id == frame_id , current : focus[item_id] == frame_id}" @click.stop="selectFrame">
	<div class="handel"></div>

</div>
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
			console.log(this.frame_id)

			if(!this.framedata){
				this.$dispatch('addFrame', this)
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

