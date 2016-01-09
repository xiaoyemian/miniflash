<style>
.frame{
	.pr;
	z-index:3;
	.h(100%);

	&:after{
		content:'';.pa;z-index:1;
		top:50%;left:7px;.ml(-2px);.w(4px);.h(4px);.mt(-2px);.ml(-2px);.bgc(#000); .border-r(8px);
	}
}
</style>

<template>
<div class="frame" @click.stop="selectFrame" :style="{width:framedata.duration * global.framewidth + 'px'}"></div>
</template>


<script>

return {
	props : ['framedata', 'global', 'index']
	, data : function(){
		return {
			startTime : 0
			, time : 0
		}
	}
	, methods : {
		selectFrame : function(event){
			this.time = Math.floor(event.offsetX / this.global.framewidth)
			this.$dispatch('setFrame', this)
		}
	}
	, events : {
		setStartTime : function(){
			this.startTime = Math.floor($(this.$el).position().left / this.global.framewidth) 
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

