<style>
.track{
	.opacity(60);
	&.focus{.opacity(100);}
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus_track == itemdata.item_id}">
	<frameitem v-ref:frame v-for="framedata in itemdata.frames" :framedata="framedata" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata"></frameitem>
</div>

</template>

<script>
var frame = require('flash/back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'itemdata', 'keybroad', 'formatdata', 'focus_track']
	, data : function(){
		return {
			frame : null
		}
	}
	, methods : {
		selectTrack : function(event){
			var time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.setTrackByTime(time)
		}
		, setTrackByTime : function(time){

			this.$dispatch('setTime', time)	
			this.$dispatch('selectTrack', this.itemdata.item_id)

			var frames = this.$refs.frame
			var frame = null
			for(var i in frames){
				if(frames[i].time + frames[i].startTime >= time){
					frame = frames[i]
					break;
				}
			}

			if(!this.keybroad.command)
				return;

			if(!frame)
				this.addFrame(time)	

		}
		, addFrame : function(time){
			var frames = this.itemdata.frames
			var startTime = 0
			var frame
			for(var i in frames){
				frame = frames[i]
				startTime += frame.duration
			}
			
			frame.duration += time - startTime	
			this.itemdata.frames.push({duration:1, name:'normal'})
		}
	}
	, events : {
		setTrackByFrame : function(frame){
			this.setTrackByTime(frame.time + frame.startTime)
		}
		, loadItemByTime : function(time){
			var frames = this.$refs.frame
			for(var i in frames){
				var frame = frames[i]
				if(time >= frame.startTime && time < frame.startTime + frame.framedata.duration){
					this.$dispatch('loadItemByFrame', this.itemdata.item_id, frame.framedata)
					break;
				}
			}
		}
	}
	, ready : function(){
	}
}
</script>

