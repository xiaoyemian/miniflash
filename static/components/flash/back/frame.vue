<style>
.frame{
	.left;.pr;
	.h(100%);
	z-index:3;

	&:before, &:after{ content:'';.pa;z-index:1; }
	&:after{
		top:50%;left:50%;.ml(-2px);.w(4px);.h(4px);.mt(-2px);.ml(-2px);.bgc(#000); .border-r(8px);
	}
}
</style>

<template>
<div class="frame" @click.stop="selectFrame" :style="{width:framedata.duration * timedata.framewidth + 'px'}"></div>
</template>


<script>

return {
	props : ['framedata', 'timedata']
	, data : function(){
		return {
			startTime : 0
			, time : 0
		}
	}
	, methods : {
		selectFrame : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('focusTrackByFrame', this)
		}
	}
	, events : {
		setStartTime : function(){
			this.startTime = Math.floor($(this.$el).position().left / this.timedata.framewidth) 
		}
	}
	, watch : {
		'framedata.duration' : function(){
			this.framedata.duration -= 0
			this.$nextTick(function(){
				this.$parent.$broadcast('setStartTime')	
				this.$parent.$parent.$broadcast('setStartTime')	
			})
		}
	}
	, ready : function(){
		this.$emit('setStartTime')
	}
	, created : function(){
		this.$dispatch('formatFrameData', this.framedata)
	}
}
</script>

