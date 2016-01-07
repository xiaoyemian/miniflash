<style>
.keyframe{
	.left;.pr;
	.h(100%);
	z-index:3;

	&:before, &:after{ content:'';.pa;z-index:1; }
	&:before{
		left:-1px;.h(100%);.w(1px);.bgc(#222);
	}
	&:after{
		top:50%;left:6px;.w(4px);.h(4px);.mt(-2px);.ml(-2px);.bgc(#000); .border-r(8px);
	}
}
</style>

<template>
<div class="keyframe" @click.stop="selectKeyFrame" :style="{width:timedata.framewidth + 'px', 'margin-right':(keyframedata.duration-1) * timedata.framewidth + 'px'}"></div>
</template>


<script>

return {
	props : ['keyframedata', 'timedata', 'keybroad', 'index']
	, data : function(){
		return {
			startTime : 0
			, time : 0
		}
	}
	, methods : {
		selectKeyFrame : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('focusTrackByFrame', this)

			this.$dispatch('setTime', this.time + this.startTime)	
		}
	}
	, events : {
	}
	, created : function(){
	}
}
</script>

