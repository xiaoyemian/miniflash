<style>
.block{
	display:-webkit-box;
	.pr; .bgc(#333);.h(100%);
	&:before, &:after{ content:'';.pa;.h(100%);.w(2px);}
	&:before{left:-1px;border-left:2px solid #222;}
	&:after{right:-1px;border-right:2px solid #222;}

	&.blank{
		.bgc(#333);
	}
	&.normal{
		.bgc(#999);
	}
	&.transition{
		.bgc(#33B666);
	}

	&.animation{
		.bgc(#0099FF);
	}

	&.infinite{
		
	}
}
</style>

<template>
<div class="block" :class="[blockdata['iteration-count'] == 'infinite' ? 'infinite' : '', blockdata.name, global.time == startTime + time ? 'focus' : '']">
	<frameitem v-ref:frame v-for="framedata in blockdata.frames" :index="$index" :framedata="framedata" :global="global"></frameitem>
</div>
</template>


<script>

var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['blockdata', 'global', 'index']
	, data : function(){
		return {
			startTime : 0
			, time : 0
			, frame : null
		}
	}
	, methods : {
		focusBlock : function(){
			this.setStartTime()
			this.time = this.frame.time + this.frame.startTime 

			this.$dispatch('setTime', this.startTime + this.time)
			this.$dispatch('setBlock', this)
		}
		, setStartTime : function(){
			this.startTime = Math.floor(($(this.$el).position().left) / this.global.framewidth) 
		}
		, setFrame : function(frame){
			this.$set('frame', frame)
			this.setStartTime()
			this.time = this.frame.time + this.frame.startTime 
		}
		, setName : function(name){
			this.$set('blockdata.name', name)
		}
	}
	, events : {
		setFrame : function(frame){
			this.setFrame(frame)
			this.$dispatch('setBlock', this)
		}
		, setStartTime : function(){
			this.setStartTime()
		}
	}
	, created : function(){
		this.$dispatch('formatBlockData', this.blockdata)
	}
	, ready : function(){
		this.$set('frame', this.$refs.frame[0])
		this.$emit('setStartTime')
	}
}
</script>

