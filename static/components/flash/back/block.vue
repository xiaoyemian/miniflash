<style>
.block{
	.pr; .bgc(#333);.h(100%);
	&:before, &:after{ content:'';.pa;.h(100%);.w(1px);.bgc(#222);}
	&:before{left:-1px;}
	&:after{right:0px;}

	&.normal{
		.bgc(#999);
	}
	&.transition{
		.bgc(#33B666);
	}

	&.infinite{
		&:after{ content:'无限循环';.pa;.w(100%);.c;.fc(#222);left:0px;}

		&+.next{
			.opacity(10);
		}
	}
}
</style>

<template>
<div class="block" :class="[blockdata['iteration-count'] == 'infinite' ? 'infinite' : '', blockdata.name, timedata.time == startTime + time ? 'focus' : '']">
	<frameitem v-ref:frame v-for="framedata in blockdata.frames" :index="$index" :framedata="framedata" :timedata="timedata"></frameitem>
</div>
</template>


<script>

var frame = require('flash/back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['blockdata', 'timedata', 'index']
	, data : function(){
		return {
			startTime : 0
			, time : 0
			, frame : null
		}
	}
	, methods : {
	}
	, events : {
		setStartTime : function(){
			this.startTime = Math.floor(($(this.$el).position().left + this.timedata.scrollleft) / this.timedata.framewidth) 
		}
		, focusTrackByFrame : function(frame){
			this.time = frame.time + frame.startTime 
			this.$set('frame', frame)
			this.$dispatch('setTime', this.startTime + this.time)
			this.$dispatch('focusTrackByBlock', this)
		}
	}
	, created : function(){
		this.$dispatch('formatBlockData', this.blockdata)
	}
	, ready : function(){
		this.$emit('setStartTime')
	}
}
</script>

