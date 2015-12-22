<style>
.frame{
	.pr; .bgc(#333);

	.keyframe{
		.pa;left:-1px;top:-1px;bottom:-1px;right:-1px;
		border:1px solid #222;

		&:before, &:after{ content:'';.pa;z-index:1; }
		&:before{
			top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000); .border-r(8px);
		}
	}

	&.normal{
		.bgc(#999);
	}
	&.animate{
		.bgc(#33B666);
	}

}
</style>

<template>
<div class="frame" :class="[framedata.name]" @click.stop="selectFrame" :style="{width:framedata.duration * timedata.framewidth + 'px'}">
	<div class="keyframe" :style="{width:timedata.framewidth + 'px'}"></div>
</div>
</template>


<script>

return {
	props : ['framedata', 'timedata', 'keybroad', 'index']
	, data : function(){
		return {
			startTime : 0
			, time : 0
		}
	}
	, methods : {
		selectFrame : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('setTrackByFrame', this)
		}
	}
	, created : function(){
		this.$dispatch('formatFrameData', this.framedata)
	}
	, ready : function(){
		this.startTime = Math.floor(($(this.$el).position().left - this.timedata.namewidth + this.timedata.scrollleft) / this.timedata.framewidth) 
	}
}
</script>

