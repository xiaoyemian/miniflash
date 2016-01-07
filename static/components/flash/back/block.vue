<style>
.frame{

	.pr; .bgc(#333);
	&:before, &:after{ content:'';.pa;.h(100%);.w(1px);.bgc(#222);}
	&:after{right:0px;}
	&:before{
		left:-1px;
	}

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
<div class="frame" :class="[framedata['iteration-count'] == 'infinite' ? 'infinite' : '', framedata.name, timedata.time == startTime + time ? 'focus' : '']">
	<keyframe v-ref:keyframe v-for="keyframedata in framedata.keyframes" :index="$index" :keyframedata="keyframedata" :timedata="timedata"></keyframe>
</div>
</template>


<script>

var keyframe = require('flash/back/keyframe.vue')

return {
  components : {
    keyframe : keyframe
	}
	, props : ['framedata', 'timedata', 'keybroad']
	, data : function(){
		return {
			startTime : 0
			, time : 0
			, keyframe : null
		}
	}
	, methods : {
	}
	, events : {
		setStartTime : function(){
			this.startTime = Math.floor(($(this.$el).position().left + this.timedata.scrollleft) / this.timedata.framewidth) 
		}
		, focusTrackByFrame : function(keyframe){
			this.time = keyframe.time + keyframe.startTime 
			this.$set('keyframe', keyframe)
			this.$dispatch('setTime', this.startTime + this.time)
			this.$dispatch('focusTrackByBlock', this)
		}
	}
	, created : function(){
		this.$dispatch('formatBlockData', this.framedata)
	}
	, ready : function(){
		this.$emit('setStartTime')
	}
}
</script>

