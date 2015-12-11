<style>
.frame{
	.pr; .bgc(#333);

	&:nth-child(5n+1){ .bgc(#383838); }

	&:before, &:after{ content:'';.pa;z-index:1; }

	.handel{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		.opacity(20); 
	}

	&.focus{
		.handel{.bgc(#ccc);}
	}

	&.keyframe{
		.handel{ .bgc(#5CD685); }
		&:before{
			top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000); .border-r(8px);
		}
	}

	&.animateframe{
		.handel{.bgc(#5CADD6);}
	}

}
.track.focus{
	.frame{
		.handel{
			.opacity(100);
		}
	}
}
</style>

<template>
<div class="frame" :class="{focus:focusframe && focusframe.frame_id == frame_id, keyframe : framedata.type == 'keyframe', blankframe : framedata.type == 'blankframe'}" @click.stop="setFocusFrame">
	<div class="handel"></div>
</div>
</template>


<script>

return {
	props : ['focusframe', 'framedata', 'frame_id']
	, data : function(){
		return {
		}
	}
	, methods : {
		setFocusFrame : function(){
			this.$dispatch('setFocusFrame', this)
		}
	}
}
</script>

